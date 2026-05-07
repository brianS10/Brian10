import { createClient } from "./client";
import { createClient as createServerSupabaseClient } from "./server";
import type { Perfume, PerfumeInsert, PerfumeUpdate } from "@/types/perfume";

// ─── Public queries (server-side) ──────────────────────────────────

export async function obtenerPerfumesPublicos(): Promise<Perfume[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("perfumes")
    .select("*")
    .eq("disponible", true)
    .order("destacado", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching public perfumes:", error.message);
    return [];
  }

  return data as Perfume[];
}

// ─── Admin queries (server-side) ───────────────────────────────────

export async function obtenerTodosPerfumes(): Promise<Perfume[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("perfumes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all perfumes:", error.message);
    return [];
  }

  return data as Perfume[];
}

// ─── Client-side mutations ─────────────────────────────────────────

export async function crearPerfume(
  perfumeData: PerfumeInsert
): Promise<{ data: Perfume | null; error: string | null }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("perfumes")
    .insert(perfumeData)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Perfume, error: null };
}

export async function actualizarPerfume(
  id: string,
  updates: PerfumeUpdate
): Promise<{ data: Perfume | null; error: string | null }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("perfumes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data as Perfume, error: null };
}

export async function eliminarPerfume(
  id: string
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.from("perfumes").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}

export async function subirImagenPerfume(
  file: File
): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `perfumes/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("perfumes-imagenes")
    .upload(filePath, file);

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("perfumes-imagenes").getPublicUrl(filePath);

  return { url: publicUrl, error: null };
}
