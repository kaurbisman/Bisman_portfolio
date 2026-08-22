import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://your-project.supabase.co" &&
    supabaseUrl !== "https://your-project-id.supabase.co"
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Upload an image file or blob to Supabase Storage ('portfolio-media' bucket)
 * and return its permanent public URL.
 */
export async function uploadImageToSupabase(
  fileOrBlob: File | Blob,
  folder = "uploads"
): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const ext = fileOrBlob.type?.split("/")[1] || "jpg";
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("portfolio-media")
      .upload(filename, fileOrBlob, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.warn("Supabase Storage Upload Notice (Bucket might need creation, falling back to data URL):", error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("portfolio-media")
      .getPublicUrl(data.path);

    return publicUrlData?.publicUrl || null;
  } catch (e) {
    console.warn("Supabase Storage Exception:", e);
    return null;
  }
}
