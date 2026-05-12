// Helpers used by all public lead-capture forms to talk to Lovable Cloud.
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const emailSchema = z.string().trim().email("Invalid email").max(255);
export const nameSchema = z.string().trim().min(1, "Required").max(120);
export const phoneSchema = z.string().trim().min(7, "Invalid phone").max(25);
export const longTextSchema = z.string().trim().max(2000).optional().or(z.literal(""));

const ALLOWED_RESUME_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB

export function validateResumeFile(file: File): string | null {
  if (!ALLOWED_RESUME_TYPES.includes(file.type) && !/\.(pdf|docx?|DOCX?|PDF)$/.test(file.name)) {
    return "Only PDF, DOC, or DOCX files are allowed";
  }
  if (file.size > MAX_RESUME_BYTES) return "File too large (max 5 MB)";
  return null;
}

export async function uploadResume(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "pdf";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("resumes").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("resumes").getPublicUrl(path);
  return data.publicUrl;
}
