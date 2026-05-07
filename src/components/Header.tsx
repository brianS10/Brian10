export default function Header() {
  return (
    <header className="bg-verde-oscuro relative overflow-hidden">
      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 py-12 md:py-16 text-center px-4">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-dorado/60" />
          <div className="w-1.5 h-1.5 rotate-45 bg-dorado/80" />
          <div className="h-px w-12 bg-dorado/60" />
        </div>

        {/* Business name */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-crema tracking-wide">
          Perfumes
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-crema/70 text-sm md:text-base tracking-[0.25em] uppercase font-body">
          Fragancias que dejan huella
        </p>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px w-16 bg-dorado/40" />
          <svg
            className="w-4 h-4 text-dorado/60"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <div className="h-px w-16 bg-dorado/40" />
        </div>
      </div>
    </header>
  );
}
