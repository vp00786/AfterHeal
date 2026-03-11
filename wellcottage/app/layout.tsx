import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Well Cottage | Handcrafted Wood Home Essentials",
  description:
    "Discover beautifully handcrafted wooden home organizers, kitchen essentials, and decor. Sustainable, ethical, and heirloom-quality craftsmanship from rural India.",
  keywords: "handcrafted wood, wooden organizers, home decor, sustainable, kitchen essentials",
  openGraph: {
    title: "The Well Cottage | Handcrafted Wood Home Essentials",
    description: "Sustainable handcrafted wooden home essentials from rural India",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#f5f1ea] text-[#2c2415] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
