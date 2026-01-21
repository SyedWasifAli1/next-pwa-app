"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const path = usePathname();

  const item = (href, label) => (
    <Link
      href={href}
      prefetch={false}
      className={`flex-1 text-center py-2 ${
        path === href
          ? "font-bold border-t-2 border-black dark:border-white"
          : "text-gray-500"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex bg-white dark:bg-black border-t md:hidden">
      {item("/", "Home")}
      {item("/products", "Products")}
      {item("/pos", "POS")}
      {item("/invoices", "Invoices")}
      {item("/youtube", "YouTube")}
    </nav>
  );
}
