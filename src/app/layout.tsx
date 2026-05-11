import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MoonBitcoin — Lunar Cycle & Bitcoin Analytics",
    template: "%s | MoonBitcoin"
  },
  description: "Advanced data experiment investigating the correlations between the Bitcoin market and lunar phases. 100% data-driven backtesting and volatility analysis.",
  keywords: ["Bitcoin", "Crypto", "Lunar Cycle", "Moon Phases", "Market Analysis", "Data Science", "Bitcoin Volatility", "Crypto Trading Strategy"],
  authors: [{ name: "Roger Garcia" }],
  creator: "Roger Garcia",
  metadataBase: new URL("https://moonbitcoin.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MoonBitcoin — Lunar Cycle & Bitcoin Analytics",
    description: "Investigating potential correlations between Bitcoin market behavior and lunar cycles. Advanced data-driven analytics.",
    type: "website",
    url: "https://moonbitcoin.app",
    siteName: "MoonBitcoin",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MoonBitcoin Analytics Dashboard",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoonBitcoin — Lunar Cycle & Bitcoin Analytics",
    description: "Bitcoin meets the Lunar Cycle. A data-driven exploratory experiment.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-pure-black text-white min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
