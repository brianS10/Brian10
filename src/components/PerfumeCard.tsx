"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Perfume } from "@/types/perfume";
import WhatsAppButton from "./WhatsAppButton";
import { Badge } from "@/components/ui/badge";

interface PerfumeCardProps {
  perfume: Perfume;
  index: number;
}

export default function PerfumeCard({ perfume, index }: PerfumeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
    >
      <div
        id={`perfume-card-${perfume.id}`}
        className="
          bg-white rounded-xl overflow-hidden
          border border-verde-oscuro/8
          shadow-sm hover:shadow-xl hover:shadow-verde-oscuro/8
          transition-all duration-500 ease-out
          hover:-translate-y-1
          flex flex-col h-full
        "
      >
        {/* Image container — 65-70% of card */}
        <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          <Image
            src={perfume.imagen_url}
            alt={perfume.nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="
              object-contain p-4
              transition-transform duration-700 ease-out
              group-hover:scale-105
            "
          />

          {/* Destacado badge */}
          {perfume.destacado && (
            <div className="absolute top-3 left-3">
              <Badge
                className="
                  bg-dorado/90 hover:bg-dorado text-white
                  text-[10px] uppercase tracking-wider font-body font-medium
                  px-2.5 py-1 border-0 shadow-md
                "
              >
                ✦ Destacado
              </Badge>
            </div>
          )}

          {/* Subtle gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Name */}
          <h3 className="font-heading text-base md:text-lg text-verde-oscuro leading-tight mb-1">
            {perfume.nombre}
          </h3>

          {/* Description */}
          {perfume.descripcion && (
            <p className="text-xs text-gray-500 font-body mb-3 line-clamp-2">
              {perfume.descripcion}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* WhatsApp button */}
          <div className="mt-3">
            <WhatsAppButton
              nombrePerfume={perfume.nombre}
              className="w-full"
              compact
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
