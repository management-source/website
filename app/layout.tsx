import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dons Premier Estate Agents | The Knights of Real Estate",
  description:
    "Victoria's premier real estate agency specializing in strategic residential sales, auctions, and property management across Melbourne South-East (Berwick, Clyde, Cranbourne, Officer, Pakenham).",
  keywords: [
    "Dons Premier Estate Agents",
    "Real Estate Melbourne South East",
    "Lushan Dons",
    "Jessica Gale",
    "Berwick Real Estate",
    "Cranbourne Real Estate",
    "Clyde North Real Estate",
    "Real estate auctioneer Melbourne",
    "Property management Victoria",
  ],
  metadataBase: new URL("https://donspremier.com.au"),
  openGraph: {
    title: "Dons Premier Estate Agents | The Knights of Real Estate",
    description:
      "Strategic sales, licensed auctioneering, and responsive property management with a 1-business-day communication guarantee.",
    url: "https://donspremier.com.au",
    siteName: "Dons Premier Estate Agents",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-neutral-900 flex flex-col min-h-screen selection:bg-gold-500 selection:text-black">
        <TopBanner />
        <Navbar />
        <main className="flex-grow bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
