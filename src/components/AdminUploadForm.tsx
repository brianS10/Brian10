"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { crearPerfumeClient, subirImagenPerfumeClient } from "@/lib/supabase/mutations";

export default function AdminUploadForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [destacado, setDestacado] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreview(url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) { setError("El nombre es obligatorio."); return; }
    if (!file) { setError("Selecciona una imagen."); return; }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const { url, error: uploadError } = await subirImagenPerfumeClient(file);
    if (uploadError || !url) {
      setError(uploadError ?? "Error al subir la imagen.");
      setLoading(false);
      return;
    }

    const { error: createError } = await crearPerfumeClient({
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || undefined,
      imagen_url: url,
      disponible: true,
      destacado,
    });

    if (createError) {
      setError(createError);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setNombre("");
    setDescripcion("");
    setDestacado(false);
    setFile(null);
    setPreview(null);
    setLoading(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-verde-oscuro/10 shadow-sm p-6 space-y-5"
    >
      <h2 className="font-heading text-2xl text-verde-oscuro mb-1">
        Agregar perfume
      </h2>
      <p className="text-sm text-gray-500 font-body -mt-3">
        Completa los datos y sube la imagen del perfume.
      </p>

      {/* Nombre */}
      <div className="space-y-1.5">
        <Label htmlFor="nombre" className="font-body font-medium text-gray-700">
          Nombre del perfume *
        </Label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Dior Sauvage"
          className="font-body"
          required
        />
      </div>

      {/* Descripción */}
      <div className="space-y-1.5">
        <Label htmlFor="descripcion" className="font-body font-medium text-gray-700">
          Descripción <span className="text-gray-400">(opcional)</span>
        </Label>
        <Textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Notas de fragancia, descripción, tamaño..."
          className="font-body resize-none"
          rows={3}
        />
      </div>

      {/* Imagen */}
      <div className="space-y-1.5">
        <Label htmlFor="imagen" className="font-body font-medium text-gray-700">
          Imagen *
        </Label>
        <div className="flex items-start gap-4">
          <div
            className={`
              flex-1 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
              transition-colors duration-200
              ${preview ? "border-verde-medio/40 bg-verde-medio/5" : "border-gray-200 hover:border-verde-medio/40 hover:bg-verde-medio/5"}
            `}
            onClick={() => document.getElementById("imagen")?.click()}
          >
            <input
              id="imagen"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {preview ? (
              <p className="text-sm text-verde-medio font-body font-medium">
                ✓ {file?.name}
              </p>
            ) : (
              <>
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400 font-body">
                  Haz clic para seleccionar una imagen
                </p>
              </>
            )}
          </div>
          {preview && (
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
              <Image src={preview} alt="Preview" width={80} height={80} className="object-contain w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* Destacado toggle */}
      <div className="flex items-center gap-3">
        <Switch
          id="destacado"
          checked={destacado}
          onCheckedChange={setDestacado}
        />
        <Label htmlFor="destacado" className="font-body font-medium text-gray-700 cursor-pointer">
          Marcar como destacado
          <span className="ml-1 text-dorado text-xs">✦</span>
        </Label>
      </div>

      {/* Feedback */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-body p-3">
          ⚠ {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-verde-medio/10 border border-verde-medio/30 text-verde-oscuro text-sm font-body p-3">
          ✓ Perfume agregado exitosamente.
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-verde-oscuro hover:bg-verde-oscuro/90 text-crema font-body font-medium py-2.5"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Subiendo...
          </span>
        ) : "Agregar perfume"}
      </Button>
    </form>
  );
}
