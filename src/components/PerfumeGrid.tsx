"use client";

import type { Perfume } from "@/types/perfume";
import PerfumeCard from "./PerfumeCard";
import { motion } from "framer-motion";

interface PerfumeGridProps {
  perfumes: Perfume[];
}

export default function PerfumeGrid({ perfumes }: PerfumeGridProps) {
  if (perfumes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 px-4"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-verde-oscuro/5 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-verde-oscuro/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="font-heading text-xl text-verde-oscuro/60 mb-2">
          Próximamente
        </h3>
        <p className="text-gray-400 font-body text-sm max-w-md mx-auto">
          Estamos preparando nuestra colección. Pronto podrás descubrir
          fragancias exclusivas.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {perfumes.map((perfume, index) => (
        <PerfumeCard key={perfume.id} perfume={perfume} index={index} />
      ))}
    </div>
  );
}
