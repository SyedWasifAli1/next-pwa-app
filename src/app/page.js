"use client";

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
    const products = getData("products");
    const categories = getData("categories");
    const companies = getData("companies");
    const invoices = getData("invoices") || [];

    setStats({
      products: products.length,
      categories: categories.length,
      companies: companies.length,
      invoices: invoices.length
    });

    // Get last 5 invoices
    const sortedInvoices = [...invoices].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    setRecentInvoices(sortedInvoices);
  }, []);

  const StatCard = ({ title, value, icon, link }) => (
    <Link href={link}>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          </div>
          <div className="text-4xl opacity-20">{icon}</div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Products" value={stats.products} icon="📦" link="/products" />
        <StatCard title="Categories" value={stats.categories} icon="🏷️" link="/categories" />
        <StatCard title="Companies" value={stats.companies} icon="🏢" link="/company" />
        <StatCard title="Invoices" value={stats.invoices} icon="📋" link="/invoices" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Invoices</h2>

        {recentInvoices.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No invoices found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentInvoices.map((invoice, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#{invoice.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{invoice.customer || 'Walk-in'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${invoice.total?.toFixed(2) || '0.00'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}