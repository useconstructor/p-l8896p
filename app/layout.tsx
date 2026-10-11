import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"),
  ),
  title: "Umbral Arquitectura · Espacios que marcan el umbral",
  description:
    "Estudio ficticio de arquitectura residencial. Proyectos conceptuales, materialidad y formas de habitar. Una demostración editorial.",
  openGraph: {
    title: "Umbral Arquitectura · Estudio ficticio",
    description:
      "Una exploración conceptual de la arquitectura residencial. Sitio de demostración.",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/media/hero.jpg",
        width: 1600,
        height: 1067,
        alt: "Referencia arquitectónica para un estudio ficticio",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
