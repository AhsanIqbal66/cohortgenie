import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import RootLayoutWrapper from "./RootLayoutWrapper";
import { Toaster } from "react-hot-toast";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cohort Genie",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <RootLayoutWrapper>
          <Toaster />
          {children}
        </RootLayoutWrapper>
      </body>
    </html>
  );
}
