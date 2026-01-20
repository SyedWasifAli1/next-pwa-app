"use client";

export const dynamic = "force-static";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getData } from "./utils/storage";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    companies: 0,
    invoices: 0
  });

  const [recentInvoices, setRecentInvoices] = useState([]);

  useEffect(() => {
    // ✅ Offline-safe (no API, no server)
    const products = getData("products") || [];
    const categories = getData("categories") || [];
    const companies = getData("companies") || [];
    const invoices = getData("invoices") || [];

    setStats({
      products: products.length,
      categories: categories.length,
      companies: companies.length,
      invoices: invoices.length
    });

    const sortedInvoices = [...invoices]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    setRecentInvoices(sortedInvoices);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Products" value={stats.products} icon="📦" link="/products" />
        <StatCard title="Categories" value={stats.categories} icon="🏷️" link="/categories" />
        <StatCard title="Companies" value={stats.companies} icon="🏢" link="/company" />
        <StatCard title="Invoices" value={stats.invoices} icon="📋" link="/invoices" />
      </div>

      {/* rest same */}
    </div>
  );
}

function StatCard({ title, value, icon, link }) {
  return (
    <Link href={link} prefetch={false}>
      <div className="rounded-xl p-6 shadow cursor-pointer">
        <p className="text-sm">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        <div className="text-4xl opacity-20">{icon}</div>
      </div>
    </Link>
  );
}
