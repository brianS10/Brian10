"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Perfume } from "@/types/perfume";
import { actualizarPerfumeClient, eliminarPerfumeClient } from "@/lib/supabase/mutations";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdminPerfumeTableProps {
  perfumes: Perfume[];
}

export default function AdminPerfumeTable({ perfumes }: AdminPerfumeTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleToggle(
    id: string,
    field: "disponible" | "destacado",
    value: boolean
  ) {
    setLoadingId(id);
    await actualizarPerfumeClient(id, { [field]: value });
    router.refresh();
    setLoadingId(null);
  }

  async function handleDelete(id: string) {
    setLoadingId(id);
    await eliminarPerfumeClient(id);
    router.refresh();
    setLoadingId(null);
  }

  if (perfumes.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-verde-oscuro/10 shadow-sm p-10 text-center">
        <p className="text-gray-400 font-body">No hay perfumes aún. ¡Agrega el primero!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-verde-oscuro/10 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-heading text-2xl text-verde-oscuro">
          Perfumes ({perfumes.length})
        </h2>
      </div>

      {/* Mobile card view */}
      <div className="divide-y divide-gray-50 md:hidden">
        {perfumes.map((p) => (
          <div key={p.id} className="p-4 flex items-start gap-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
              <Image
                src={p.imagen_url}
                alt={p.nombre}
                width={56}
                height={56}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-sm text-verde-oscuro font-medium truncate">{p.nombre}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5">
                  <Switch
                    id={`disp-mob-${p.id}`}
                    checked={p.disponible}
                    disabled={loadingId === p.id}
                    onCheckedChange={(v) => handleToggle(p.id, "disponible", v)}
                    className="scale-75"
                  />
                  <span className="text-xs text-gray-500 font-body">Visible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Switch
                    id={`dest-mob-${p.id}`}
                    checked={p.destacado}
                    disabled={loadingId === p.id}
                    onCheckedChange={(v) => handleToggle(p.id, "destacado", v)}
                    className="scale-75"
                  />
                  <span className="text-xs text-gray-500 font-body">✦ Dest.</span>
                </div>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger
                className="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-colors"
                disabled={loadingId === p.id}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-heading">¿Eliminar perfume?</AlertDialogTitle>
                  <AlertDialogDescription className="font-body">
                    Se eliminará <strong>{p.nombre}</strong> permanentemente. Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="font-body">Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700 font-body"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs font-body font-semibold text-gray-500 uppercase tracking-wider">Imagen</th>
              <th className="text-left px-6 py-3 text-xs font-body font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="text-left px-6 py-3 text-xs font-body font-semibold text-gray-500 uppercase tracking-wider">Disponible</th>
              <th className="text-left px-6 py-3 text-xs font-body font-semibold text-gray-500 uppercase tracking-wider">Destacado</th>
              <th className="text-left px-6 py-3 text-xs font-body font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="text-right px-6 py-3 text-xs font-body font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {perfumes.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50/50 transition-colors duration-150"
              >
                {/* Thumbnail */}
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                    <Image
                      src={p.imagen_url}
                      alt={p.nombre}
                      width={48}
                      height={48}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </td>

                {/* Nombre */}
                <td className="px-6 py-4">
                  <p className="font-heading text-sm text-verde-oscuro font-medium">{p.nombre}</p>
                  {p.descripcion && (
                    <p className="text-xs text-gray-400 font-body mt-0.5 max-w-xs truncate">{p.descripcion}</p>
                  )}
                </td>

                {/* Disponible */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`disponible-${p.id}`}
                      checked={p.disponible}
                      disabled={loadingId === p.id}
                      onCheckedChange={(v) => handleToggle(p.id, "disponible", v)}
                    />
                    <span className={`text-xs font-body ${p.disponible ? "text-verde-medio" : "text-gray-400"}`}>
                      {p.disponible ? "Sí" : "No"}
                    </span>
                  </div>
                </td>

                {/* Destacado */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`destacado-${p.id}`}
                      checked={p.destacado}
                      disabled={loadingId === p.id}
                      onCheckedChange={(v) => handleToggle(p.id, "destacado", v)}
                    />
                    <span className={`text-xs font-body ${p.destacado ? "text-dorado" : "text-gray-400"}`}>
                      {p.destacado ? "✦ Sí" : "No"}
                    </span>
                  </div>
                </td>

                {/* Fecha */}
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-400 font-body">
                    {new Date(p.created_at).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 text-right">
                  <AlertDialog>
                    <AlertDialogTrigger
                      id={`delete-btn-${p.id}`}
                      disabled={loadingId === p.id}
                      className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 font-body text-xs px-2 py-1.5 rounded transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-heading">¿Eliminar perfume?</AlertDialogTitle>
                        <AlertDialogDescription className="font-body">
                          Se eliminará <strong>{p.nombre}</strong> permanentemente. Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="font-body">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 font-body"
                          onClick={() => handleDelete(p.id)}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
