"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ max }: { max: number }) {
  const [quantity, setQuantity] = useState("1");

  const current = Number(quantity) || 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits === "") return setQuantity("");
    setQuantity(String(Math.min(Number(digits), max)));
  }

  function handleBlur() {
    if (!current) setQuantity("1");
  }

  return (
    <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => setQuantity(String(Math.max(current - 1, 1)))}
        disabled={current <= 1}
        className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={16} />
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Quantity"
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-16 text-center outline-none font-medium"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQuantity(String(Math.min(current + 1, max)))}
        disabled={current >= max}
        className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
