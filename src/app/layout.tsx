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
    default: "Vinawanda Khodijah - Fullstack Engineer",
    template: "%s | Vinawanda Khodijah",
  },
  icons: {
    icon: "/lily.png",
    shortcut: "/lily.png",
    apple: "/lily.png",
  },
  description:
    "Fullstack Engineer in Indonesia, building web and mobile applications with React, Next.js, Node.js, NestJS, PHP, Flutter, and modern databases.",
  keywords: [
    "Vinawanda Khodijah",
    "fullstack engineer",
    "next.js developer",
    "react developer",
    "node.js developer",
    "nestjs developer",
    "flutter developer",
    "typescript",
    "php",
    "indonesia",
    "web developer",
    "software engineer",
    "mobile developer",
  ],
  authors: [{ name: "Vinawanda Khodijah" }],
  creator: "Vinawanda Khodijah",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Vinawanda Khodijah - Fullstack Engineer",
    description:
      "Portfolio of Vinawanda Khodijah, a Fullstack Engineer experienced in web, mobile, APIs, databases, and security testing.",
    siteName: "Vinawanda Khodijah Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinawanda Khodijah - Fullstack Engineer",
    description:
      "Fullstack Engineer building scalable web and mobile applications.",
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
  themeColor: "#18364A",
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
      <body className="min-h-full bg-[#06131d] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
