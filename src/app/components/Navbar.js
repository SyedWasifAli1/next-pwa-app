"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="hidden md:flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-black">
      <h1 className="font-bold text-lg">POS SYSTEM</h1>

      <nav className="flex gap-6 text-sm">
        <Link href="/">Dashboard</Link>
        <Link href="/pos">POS</Link>
        <Link href="/products">Products</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/invoices">Invoices</Link>
        <Link href="/settings">Settings</Link>
      </nav>

      <ThemeToggle />
    </header>
  );
}
