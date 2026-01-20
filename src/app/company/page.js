"use client";

export const dynamic = "force-static";

import { useState, useEffect } from "react";
import { getData, setData } from "../utils/storage";

export default function Company() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setCompanies(getData("companies"));
  }, []);

  // Save companies
  useEffect(() => {
    setData("companies", companies);
  }, [companies]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name) return alert("Company name is required");

    if (editId) {
      setCompanies(
        companies.map(c =>
          c.id === editId ? { ...c, ...form } : c
        )
      );
      setEditId(null);
    } else {
      setCompanies([
        ...companies,
        {
          id: Date.now(),
          ...form
        }
      ]);
    }

    setForm({ name: "", phone: "", address: "" });
  };

  const editCompany = (c) => {
    setForm(c);
    setEditId(c.id);
  };

  const deleteCompany = (id) => {
    if (confirm("Delete company?")) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Company Name *"
          className="border p-2 dark:bg-black"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 dark:bg-black"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 dark:bg-black"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {editId ? "Update Company" : "Add Company"}
      </button>

      {/* COMPANY LIST */}
      <div className="mt-8 space-y-3">
        {companies.length === 0 && (
          <p className="text-gray-500">No companies added</p>
        )}

        {companies.map(c => (
          <div
            key={c.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center border p-3 rounded"
          >
            <div className="md:col-span-2">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{c.address}</div>
            </div>
            <div>{c.phone}</div>

            <div className="flex gap-2">
              <button
                onClick={() => editCompany(c)}
                className="border px-3 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCompany(c.id)}
                className="border px-3 py-1 text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}