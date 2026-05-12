import { createFileRoute } from "@tanstack/react-router";

type MatchResult = {
  score: number;
  strengths: string[];
  gaps: string[];
  recommendation: string;
  priority: "High" | "Medium" | "Low";
};

const SYSTEM_PROMPT = `You are an expert technical recruiter at OAKsphere, a premium Indian recruitment agency. Analyze the candidate resume against the job description and respond ONLY with strict JSON matching this TypeScript type:
{
  "score": number,            // 0-100 match score
  "strengths": string[],      // 3-6 concise candidate strengths relevant to the JD
  "gaps": string[],           // 2-5 honest gaps or missing requirements
  "recommendation": string,   // 1-3 sentence recruiter recommendation
  "priority": "High" | "Medium" | "Low"  // interview priority
}
No markdown, no commentary, no code fences. JSON only.`;

async function callGemini(resume: string, jd: string): Promise<MatchResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

  const userPrompt = `JOB DESCRIPTION:\n${jd}\n\nCANDIDATE RESUME:\n${resume}`;

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    encodeURIComponent(apiKey);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!text) throw new Error("Empty response from Gemini");

  let parsed: MatchResult;
  try {
    parsed = JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("Gemini did not return JSON");
    parsed = JSON.parse(m[0]);
  }

  // Normalize
  const score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0)));
  const priority = (["High", "Medium", "Low"] as const).includes(parsed.priority)
    ? parsed.priority
    : score >= 75
      ? "High"
      : score >= 50
        ? "Medium"
        : "Low";

  return {
    score,
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 8) : [],
    gaps: Array.isArray(parsed.gaps) ? parsed.gaps.slice(0, 8) : [],
    recommendation: String(parsed.recommendation || "").slice(0, 1200),
    priority,
  };
}

export const Route = createFileRoute("/api/match-resume")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { resume?: string; jobDescription?: string };
          const resume = (body.resume || "").toString().trim();
          const jd = (body.jobDescription || "").toString().trim();

          if (resume.length < 50 || jd.length < 30) {
            return Response.json(
              { error: "Resume (min 50 chars) and Job Description (min 30 chars) are required." },
              { status: 400 },
            );
          }
          if (resume.length > 25000 || jd.length > 15000) {
            return Response.json({ error: "Input too long." }, { status: 413 });
          }

          const result = await callGemini(resume, jd);
          return Response.json(result);
        } catch (err) {
          console.error("match-resume error:", err);
          return Response.json(
            { error: "Analysis failed. Please try again later." },
            { status: 500 },
          );
        }
      },
    },
  },
});
