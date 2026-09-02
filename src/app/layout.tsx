import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nxance AI",
  description: "Nxance AI — Intelligent solutions for modern teams",
  icons: {
    icon: [{ url: "/nxance-favicon.png", type: "image/png" }],
    apple: [{ url: "/nxance-favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans">
        {children}
      </body>
    </html>
  );
}
