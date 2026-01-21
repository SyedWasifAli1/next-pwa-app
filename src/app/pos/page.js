"use client";

// export const dynamic = "force-static";

import { useState, useEffect } from "react";
import { useIndexedDB } from "../utils/useIndexedDB";
import CartItem from "../components/CartItem";
import ThermalReceipt from "../components/ThermalReceipt";
import { generatePDF, sharePDF } from "../utils/pdf-utils";

export default function PosPage() {
  const { loadProducts, loadCategories, loadCompanies, saveInvoice, loading, error } = useIndexedDB();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const loadedProducts = await loadProducts();
      const loadedCategories = await loadCategories();
      const loadedCompanies = await loadCompanies();
      setProducts(loadedProducts);
      setCategories(loadedCategories);
      setCompanies(loadedCompanies);
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" ||
      categories.find(cat => cat.id === product.categoryId)?.name?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartItem = (updatedItem) => {
    setCart(cart.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAmount = (subtotal * tax) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + taxAmount - discountAmount;

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      const invoice = {
        customer: selectedCustomer || "Walk-in Customer",
        date: new Date().toISOString(),
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal,
        tax: taxAmount,
        discount: discountAmount,
        total,
        status: "paid"
      };

      await saveInvoice(invoice);
      setCurrentInvoice(invoice);
      setShowReceipt(true);

      // Clear cart after successful checkout
      setCart([]);
      setDiscount(0);
      setTax(0);
    } catch (err) {
      console.error("Error saving invoice:", err);
      alert("Error processing transaction: " + err.message);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Point of Sale</h1>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Products */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name.toLowerCase()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Customer</label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
              >
                <option value="">Walk-in Customer</option>
                {companies.map(company => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => addToCart(product)}
                  >
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-green-600 dark:text-green-400">${product.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getCategoryName(product.categoryId)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Cart */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-fit">
            <h2 className="text-xl font-bold mb-4">Cart ({cart.length})</h2>

            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">Cart is empty</p>
              ) : (
                cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdate={updateCartItem}
                    onDelete={removeFromCart}
                  />
                ))
              )}
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Tax (%):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={tax}
                  onChange={(e) => setTax(Number(e.target.value))}
                  className="w-20 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-right bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>

              <div className="flex justify-between items-center">
                <span>Discount (%):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-20 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-right bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>

              <div className="border-t pt-2 font-bold">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || loading}
              className={`w-full mt-4 py-2 px-4 rounded font-medium ${
                cart.length === 0 || loading
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Receipt</h2>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div id="receipt-content">
                <ThermalReceipt invoice={currentInvoice} />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={async () => {
                    await generatePDF('receipt-content', `invoice-${currentInvoice.id}.pdf`);
                    setShowReceipt(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Download PDF
                </button>
                <button
                  onClick={async () => {
                    await sharePDF('receipt-content', `invoice-${currentInvoice.id}.pdf`);
                    setShowReceipt(false);
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Share
                </button>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
