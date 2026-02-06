import type { Metadata } from "next";
import { Sora, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alireza Portfolio",
    template: "%s · Alireza Portfolio",
  },
  description:
    "A multilingual portfolio showcasing projects, experience, honors, education, and biography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${vazirmatn.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
