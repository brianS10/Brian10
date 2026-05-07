import { createClient } from "./client";
import type { PerfumeInsert, PerfumeUpdate, Perfume } from "@/types/perfume";

// Client-side only mutations (used in 'use client' components)
// These only use the browser Supabase client — no next/headers

export async function crearPerfumeClient(
  perfumeData: PerfumeInsert
): Promise<{ data: Perfume | null; error: string | null }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("perfumes")
    .insert(perfumeData)
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as Perfume, error: null };
}

export async function actualizarPerfumeClient(
  id: string,
  updates: PerfumeUpdate
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("perfumes")
    .update(updates)
    .eq("id", id);

  if (error) return { error: error.message };
  return { error: null };
}

export async function eliminarPerfumeClient(
  id: string
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.from("perfumes").delete().eq("id", id);

  if (error) return { error: error.message };
  return { error: null };
}

export async function subirImagenPerfumeClient(
  file: File
): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `perfumes/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("perfumes-imagenes")
    .upload(filePath, file);

  if (uploadError) return { url: null, error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("perfumes-imagenes").getPublicUrl(filePath);

  return { url: publicUrl, error: null };
}
