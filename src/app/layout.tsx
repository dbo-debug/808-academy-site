// src/app/layout.tsx
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export const metadata = {
  title: "The 808 Academy — Produce, Mix & Release",
  description:
    "Professional music production training online: production, remixing, mixing, mastering — taught by working engineers.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LTLX90D5DC"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LTLX90D5DC', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className="bg-[#0B0C10] text-white font-inter antialiased">
        <Header />
        {children}
        <Footer />

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
