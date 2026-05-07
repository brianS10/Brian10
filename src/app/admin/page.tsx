import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { obtenerTodosPerfumes } from "@/lib/supabase/perfumes";
import AdminUploadForm from "@/components/AdminUploadForm";
import AdminPerfumeTable from "@/components/AdminPerfumeTable";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const metadata = {
  title: "Panel Admin | Perfumes Brian",
  robots: "noindex, nofollow",
};

export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-verde-oscuro/10 p-6 text-center">
          <h1 className="font-heading text-xl text-verde-oscuro">
            Configuración requerida
          </h1>
          <p className="text-sm text-gray-500 font-body mt-2">
            Faltan las variables de Supabase. Configura
            <span className="font-medium"> NEXT_PUBLIC_SUPABASE_URL</span> y
            <span className="font-medium"> NEXT_PUBLIC_SUPABASE_ANON_KEY</span>.
          </p>
        </div>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const perfumes = await obtenerTodosPerfumes();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-verde-oscuro shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl md:text-2xl text-crema">
              Panel Admin
            </h1>
            <p className="text-crema/60 text-xs font-body mt-0.5">
              {user.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-crema/70 hover:text-crema text-xs font-body flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver catálogo
            </a>
            <AdminLogoutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total perfumes",
              value: perfumes.length,
              color: "text-verde-oscuro",
            },
            {
              label: "Disponibles",
              value: perfumes.filter((p) => p.disponible).length,
              color: "text-verde-medio",
            },
            {
              label: "Destacados",
              value: perfumes.filter((p) => p.destacado).length,
              color: "text-dorado",
            },
            {
              label: "Ocultos",
              value: perfumes.filter((p) => !p.disponible).length,
              color: "text-gray-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-verde-oscuro/10 shadow-sm p-4 text-center"
            >
              <p className={`font-heading text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload form - takes 1/3 */}
          <div className="lg:col-span-1">
            <AdminUploadForm />
          </div>

          {/* Perfume table - takes 2/3 */}
          <div className="lg:col-span-2">
            <AdminPerfumeTable perfumes={perfumes} />
          </div>
        </div>
      </main>
    </div>
  );
}
