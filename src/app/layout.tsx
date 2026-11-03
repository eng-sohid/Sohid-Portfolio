import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";

import { site } from "../data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  display: "swap",
  preload: false,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sohid-portfolio-mu.vercel.app";

const title = "Sohid Mondol — Full Stack Developer";

const description =
  "Explore the portfolio of Sohid Mondol, a Computer Science & Technology student and Full Stack Developer building modern web experiences with React, Next.js, TypeScript and Node.js.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: "%s | Sohid Mondol",
  },

  description,

  applicationName: "Sohid Mondol Portfolio",

  keywords: [
    "Sohid Mondol",
    "MD Sohid Mondol",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "Web Developer Portfolio",
    "Computer Science Student",
  ],

  authors: [
    {
      name: site.name,
      url: site.github,
    },
  ],

  creator: site.name,
  publisher: site.name,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title,
    description,
    url: siteUrl,
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",

  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: "#070907",
    },
    {
      media: "(prefers-color-scheme: light)",
      color: "#f5f7f0",
    },
  ],
};

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
  jobTitle: "Full Stack Web Developer",
  description,
  sameAs: [site.github, site.linkedin].filter(Boolean),
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
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
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
