"use client";

import { useEffect, useState } from "react";

export default function ThermalReceipt({ invoice }) {
  const [showReceipt, setShowReceipt] = useState(false);

  if (!invoice) return null;

  return (
    <div className="print-section bg-white p-2 text-xs font-mono border border-gray-300 max-w-[3in] mx-auto">
      {/* Store Info */}
      <div className="text-center font-bold text-sm mb-2">
        {invoice.storeName || "STORE NAME"}
      </div>

      <div className="border-b pb-2 mb-2">
        <div className="text-center text-xs">
          {invoice.storeAddress || "123 Store Address"}
        </div>
        <div className="text-center text-xs">
          Phone: {invoice.storePhone || "(123) 456-7890"}
        </div>
        <div className="text-center text-xs">
          {invoice.storeEmail || "email@store.com"}
        </div>
      </div>

      {/* Invoice Info */}
      <div className="mb-2">
        <div className="text-center font-semibold">INVOICE</div>
        <div className="flex justify-between my-1">
          <span>Inv #: {invoice.id}</span>
          <span>{new Date(invoice.date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Time:</span>
          <span>{new Date(invoice.date).toLocaleTimeString()}</span>
        </div>
        {invoice.customer && (
          <div className="mt-1">
            <div>Customer: {invoice.customer}</div>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="border-t border-b py-2 my-2">
        {invoice.items?.map((item, index) => (
          <div key={index} className="flex justify-between text-[0.6rem]">
            <div className="w-2/3 truncate">{item.name.substring(0, 15)}</div>
            <div className="w-1/3 text-right">
              {item.quantity} x ${item.price?.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t pt-2">
        <div className="flex justify-between text-[0.6rem]">
          <span>Subtotal:</span>
          <span>${invoice.subtotal?.toFixed(2)}</span>
        </div>
        {invoice.discount > 0 && (
          <div className="flex justify-between text-[0.6rem]">
            <span>Discount:</span>
            <span>-${invoice.discount?.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-[0.6rem]">
          <span>Tax:</span>
          <span>${invoice.tax?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-sm mt-1">
          <span>Total:</span>
          <span>${invoice.total?.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-4 text-[0.6rem] border-t pt-2">
        {invoice.receiptHeader || "Thank you for your business!"}
        <br />
        {invoice.receiptFooter || "Come again soon!"}
      </div>
    </div>
  );
}
