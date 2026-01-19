"use client";

import { useEffect, useState } from "react";
import { useIndexedDB } from "../utils/useIndexedDB";

export default function Products() {
  const { loadProducts, saveProduct, removeProduct, loadCategories, loading, error } = useIndexedDB();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    price: "",
    size: "",
    categoryId: ""
  });

  const [editId, setEditId] = useState(null);

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      const loadedProducts = await loadProducts();
      const loadedCategories = await loadCategories();
      setProducts(loadedProducts);
      setCategories(loadedCategories);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) return alert("Fill required fields");

    try {
      const productData = {
        ...form,
        price: Number(form.price)
      };

      if (editId) {
        // Update existing product
        productData.id = editId;
        await saveProduct(productData);
        setProducts(products.map(p => (p.id === editId ? { ...p, ...productData } : p)));
        setEditId(null);
      } else {
        // Add new product
        await saveProduct(productData);
        // Reload products to get the new ID assigned by IndexedDB
        const updatedProducts = await loadProducts();
        setProducts(updatedProducts);
      }

      setForm({ name: "", code: "", price: "", size: "", categoryId: "" });
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Error saving product: " + err.message);
    }
  };

  const editProduct = (p) => {
    setForm(p);
    setEditId(p.id);
  };

  const deleteProduct = async (id) => {
    if (confirm("Delete product?")) {
      try {
        await removeProduct(id);
        // Reload products after deletion
        const updatedProducts = await loadProducts();
        setProducts(updatedProducts);
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Error deleting product: " + err.message);
      }
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 dark:bg-black"
        />

        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Code"
          className="border p-2 dark:bg-black"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 dark:bg-black"
        />

        <input
          name="size"
          value={form.size}
          onChange={handleChange}
          placeholder="Size"
          className="border p-2 dark:bg-black"
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="border p-2 dark:bg-black"
        >
          <option value="">Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {editId ? "Update Product" : "Add Product"}
      </button>

      {/* PRODUCT LIST */}
      <div className="mt-8 space-y-3">
        {products.length === 0 && (
          <p className="text-gray-500">No products added</p>
        )}

        {products.map(p => (
          <div
            key={p.id}
            className="grid grid-cols-2 md:grid-cols-6 gap-2 items-center border p-3 rounded"
          >
            <div>{p.name}</div>
            <div>{p.code}</div>
            <div>Rs {p.price}</div>
            <div>{p.size}</div>
            <div>
              {categories.find(c => c.id == p.categoryId)?.name || "-"}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editProduct(p)}
                className="border px-3 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(p.id)}
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
