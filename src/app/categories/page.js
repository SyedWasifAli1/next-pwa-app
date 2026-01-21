"use client";

// export const dynamic = "force-static";

import { useState, useEffect } from "react";
import { useIndexedDB } from "../utils/useIndexedDB";

export default function Categories() {
  const { loadCategories, saveCategory, removeCategory, loading, error } = useIndexedDB();
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const loadedCats = await loadCategories();
      setCats(loadedCats);
    };

    fetchData();
  }, []);

  const addCategory = async () => {
    if (!name.trim()) return;

    try {
      await saveCategory({ name });
      // Reload categories to get the new ID assigned by IndexedDB
      const updatedCats = await loadCategories();
      setCats(updatedCats);
      setName("");
    } catch (err) {
      console.error("Error saving category:", err);
      alert("Error saving category: " + err.message);
    }
  };

  const deleteCategory = async (id) => {
    if (confirm("Delete category?")) {
      try {
        await removeCategory(id);
        // Reload categories after deletion
        const updatedCats = await loadCategories();
        setCats(updatedCats);
      } catch (err) {
        console.error("Error deleting category:", err);
        alert("Error deleting category: " + err.message);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Categories</h1>

      <div className="flex mb-4">
        <input
          className="border p-2 mr-2 flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
        />
        <button
          onClick={addCategory}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <ul className="mt-4 space-y-2">
        {cats.map(c => (
          <li key={c.id} className="flex justify-between items-center border p-2 rounded">
            <span>{c.name}</span>
            <button
              onClick={() => deleteCategory(c.id)}
              className="text-red-600 hover:text-red-800 px-2 py-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {cats.length === 0 && <p className="text-gray-500 mt-4">No categories added</p>}
    </div>
  );
}
