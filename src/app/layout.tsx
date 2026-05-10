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
  title: "MoonBitcoin — Lunar Cycle & Bitcoin Analytics",
  description: "Investigating potential correlations between Bitcoin market behavior and lunar cycles. A data-driven exploratory analysis.",
  openGraph: {
    title: "MoonBitcoin — Lunar Cycle & Bitcoin Analytics",
    description: "Investigating potential correlations between Bitcoin market behavior and lunar cycles.",
    type: "website",
    url: "https://moonbitcoin.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MoonBitcoin Analytics",
      },
    ],
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
