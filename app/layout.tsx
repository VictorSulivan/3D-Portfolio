import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mathéo Guillemin | Portfolio",
  description:
    "Portfolio professionnel de Mathéo Guillemin — développement, DevOps et projets.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  const lang = jar.get("portfolio-lang")?.value === "en" ? "en" : "fr";

  return (
    <html lang={lang}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
