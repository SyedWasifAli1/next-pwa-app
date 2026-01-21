// export const dynamic = "force-static";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import { OnlineIndicator } from "./components/OnlineIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Offline POS & Invoice System",
  description: "A progressive web app for offline point of sale and invoicing",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">

        <OnlineIndicator />

        <Navbar />

        <main className="min-h-screen px-2 md:px-6 pb-24">
          {children}
        </main>

        <BottomNav />

      </body>
    </html>
  );
}
