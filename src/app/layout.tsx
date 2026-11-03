import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";

import { site } from "../data/site";
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

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = "Sohid Mondol | Full-Stack Developer";

const description =
  "Sohid Mondol is a Computer Science student and Full-Stack Web Developer passionate about building modern digital experiences using React, Next.js, TypeScript and Node.js.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: "%s | Sohid Mondol",
  },

  description,

  keywords: [
    "Sohid Mondol",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "JavaScript",
    "Web Developer Portfolio",
  ],

  authors: [
    {
      name: site.name,
      url: site.github,
    },
  ],

  creator: site.name,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Sohid Mondol Portfolio",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: "#080908",
    },
    {
      media: "(prefers-color-scheme: light)",
      color: "#f5f7f0",
    },
  ],
};

/* Prevent theme flash before React hydration */

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem("theme");

    var isLight = theme
      ? theme === "light"
      : window.matchMedia("(prefers-color-scheme: light)").matches;

    document.documentElement.classList.toggle("light", isLight);
  } catch (error) {
    console.warn("Theme initialization failed");
  }
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: siteUrl,
  email: site.email,
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${notoBengali.variable}
        h-full
        antialiased
      `}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body className="grain flex min-h-full flex-col bg-bg text-fg selection:bg-accent selection:text-black">
        {/* Accessibility: Skip navigation */}

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-fill focus:px-5 focus:py-3 focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>

        {/* Main Application */}

        {children}

        {/* Structured Data */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* No JavaScript fallback */}

        <noscript>
          <style>
            {`
              .reveal,
              .reveal-left,
              .reveal-right,
              .reveal-scale {
                opacity: 1 !important;
                transform: none !important;
              }
            `}
          </style>
        </noscript>
      </body>
    </html>
  );
}
