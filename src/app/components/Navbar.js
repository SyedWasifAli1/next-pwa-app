"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="hidden md:flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-black">
      <h1 className="font-bold text-lg">POS SYSTEM</h1>

      <nav className="flex gap-6 text-sm">
        <Link href="/" prefetch={false}>Dashboard</Link>
        <Link href="/pos" prefetch={false}>POS</Link>
        <Link href="/products" prefetch={false}>Products</Link>
        <Link href="/categories" prefetch={false}>Categories</Link>
        <Link href="/invoices" prefetch={false}>Invoices</Link>
        <Link href="/settings" prefetch={false}>Settings</Link>
        <Link href="/youtube" prefetch={false}>YouTube</Link>
      </nav>

      <ThemeToggle />
    </header>
  );
}
