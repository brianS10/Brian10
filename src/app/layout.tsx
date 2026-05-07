import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perfumes | Fragancias Exclusivas",
  description:
    "Descubre nuestra colección exclusiva de perfumes. Fragancias premium para cada ocasión. Consulta disponibilidad y precios por WhatsApp.",
  keywords: ["perfumes", "fragancias", "perfumes exclusivos", "perfumes México"],
  openGraph: {
    title: "Perfumes | Fragancias Exclusivas",
    description:
      "Descubre nuestra colección exclusiva de perfumes. Fragancias premium para cada ocasión.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased font-body bg-crema">
        {children}
      </body>
    </html>
  );
}
