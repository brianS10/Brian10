import { obtenerPerfumesPublicos } from "@/lib/supabase/perfumes";
import Header from "@/components/Header";
import PerfumeGrid from "@/components/PerfumeGrid";

export const revalidate = 60; // ISR every 60 seconds

export default async function CatalogoPage() {
  const perfumes = await obtenerPerfumesPublicos();

  return (
    <main className="min-h-screen bg-crema">
      <Header />

      {/* Main catalog section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl md:text-3xl text-verde-oscuro">
            Nuestra Colección
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-10 bg-dorado/40" />
            <p className="text-sm text-gray-500 font-body tracking-wide">
              Consulta el precio vía WhatsApp
            </p>
            <div className="h-px w-10 bg-dorado/40" />
          </div>
        </div>

        <PerfumeGrid perfumes={perfumes} />
      </section>

      {/* Footer */}
      <footer className="border-t border-verde-oscuro/10 mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-heading text-verde-oscuro/60 text-sm">
            Perfumes
          </p>
          <p className="font-body text-xs text-gray-400 mt-1">
            Fragancias que dejan huella · Contacto por WhatsApp
          </p>
        </div>
      </footer>
    </main>
  );
}
