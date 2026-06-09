import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alex Chen — Fullstack Engineer",
    template: "%s | Alex Chen",
  },
  description:
    "Senior Fullstack Engineer specializing in AI-native products, scalable web applications, and beautiful developer experiences. Previously at Vercel, Linear, and Stripe.",
  keywords: [
    "fullstack engineer",
    "next.js developer",
    "react developer",
    "AI engineer",
    "typescript",
    "web developer",
    "software engineer",
    "LangChain",
    "RAG",
  ],
  authors: [{ name: "Alex Chen", url: "https://alexchen.dev" }],
  creator: "Alex Chen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexchen.dev",
    title: "Alex Chen — Fullstack Engineer",
    description:
      "Senior Fullstack Engineer specializing in AI-native products and scalable web applications.",
    siteName: "Alex Chen Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen — Fullstack Engineer",
    description:
      "Senior Fullstack Engineer specializing in AI-native products and scalable web applications.",
    creator: "@alexchen_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#030712] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
