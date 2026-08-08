import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PersonaProvider } from "@/components/PersonaContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://hariomsharma.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hariom Sharma — Full Stack Web Developer (MERN)",
    template: "%s — Hariom Sharma",
  },
  description:
    "Full Stack MERN Developer building scalable, production-ready web applications with modern frontend experiences, robust backend systems and cloud deployment.",
  keywords: [
    "Hariom Sharma",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Next.js",
    "Web Developer India",
  ],
  authors: [{ name: "Hariom Sharma" }],
  creator: "Hariom Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Hariom Sharma — Full Stack Web Developer (MERN)",
    description:
      "Building digital experiences that work. Full Stack Web Developer specializing in MERN, modern frontend architecture, scalable APIs and production-ready applications.",
    siteName: "Hariom Sharma",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hariom Sharma — Full Stack Web Developer (MERN)",
    description:
      "Full Stack Web Developer specializing in MERN, modern frontend architecture and scalable APIs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <div className="ambient-bg" aria-hidden />
        <div className="grain" aria-hidden />
        <PersonaProvider>{children}</PersonaProvider>
      </body>
    </html>
  );
}
