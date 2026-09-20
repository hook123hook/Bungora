import type { Metadata } from "next";
import "./globals.css";
import { SitePreferencesProvider } from "@/components/site-preferences";
import { THEME_BOOTSTRAP } from "@/lib/preferences";

export const metadata: Metadata = {
  title: "Bungora",
  description: "Türkiye genelinde bungalovları keşfet, fotoğraf galerilerini incele ve rezervasyon talebi oluştur. Ödeme Monero (XMR) ile anonim yapılır; gizlilik önceliklidir.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" dir="ltr" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} /></head>
      <body className="antialiased"><SitePreferencesProvider>{children}</SitePreferencesProvider></body>
    </html>
  );
}
