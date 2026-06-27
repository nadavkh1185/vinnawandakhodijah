import type { Metadata, Viewport } from "next";
import "./globals.css";

const BASE_URL = "https://vinawandakhodijah.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
  authors: [{ name: "Vinawanda Khodijah", url: BASE_URL }],
  creator: "Vinawanda Khodijah",

  // canonical URL
  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Vinawanda Khodijah - Fullstack Engineer",
    description:
      "Portfolio of Vinawanda Khodijah, a Fullstack Engineer experienced in web, mobile, APIs, databases, and security testing.",
    siteName: "Vinawanda Khodijah Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vinawanda Khodijah - Fullstack Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vinawanda Khodijah - Fullstack Engineer",
    description:
      "Fullstack Engineer building scalable web and mobile applications.",
    images: ["/og-image.jpg"],
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
  themeColor: "#07142b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vinawanda Khodijah",
  jobTitle: "Fullstack Engineer",
  url: BASE_URL,
  sameAs: [
    "https://linkedin.com/in/vinawanda-khodijah-3ba741351",
    "https://github.com/nadavkh1185",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "Flutter",
    "TypeScript",
    "PHP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full overflow-x-hidden bg-[#07142b] text-[#fff7df]">
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
