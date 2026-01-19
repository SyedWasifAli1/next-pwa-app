"use client";

import { useState } from "react";

export default function CartItem({ item, onUpdate, onDelete, onPriceChange }) {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [price, setPrice] = useState(item.price || item.defaultPrice || 0);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;

    setQuantity(newQuantity);
    onUpdate({ ...item, quantity: newQuantity, price });
  };

  const handlePriceChange = (newPrice) => {
    const numericPrice = parseFloat(newPrice) || 0;
    setPrice(numericPrice);
    onUpdate({ ...item, price: numericPrice, quantity });
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  const rowTotal = (price || 0) * quantity;

  return (
    <div className="grid grid-cols-12 gap-2 items-center p-2 border-b">
      <div className="col-span-4 text-sm">
        <div className="font-medium truncate">{item.name}</div>
        <div className="text-xs text-gray-500">Code: {item.code || 'N/A'}</div>
      </div>

      <div className="col-span-2">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="w-full border p-1 text-sm rounded"
        />
      </div>

      <div className="col-span-3">
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="w-full border p-1 text-sm rounded"
        />
      </div>

      <div className="col-span-2 text-right font-semibold">
        ${(rowTotal).toFixed(2)}
      </div>

      <div className="col-span-1 flex justify-end">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}