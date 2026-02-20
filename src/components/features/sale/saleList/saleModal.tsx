import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/lib/types/common";
import defaultProductImage from "@/assets/images/default.jpg";

interface SaleModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  addProductToSale: (product: Product) => void;
}

export default function SaleModal({
  product,
  isOpen,
  onClose,
  addProductToSale,
}: SaleModalProps) {
  const [quantity, setQuantity] = useState(product?.quantity || 1);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={handleBackgroundClick}
    >
      <div className="bg-[var(--colorBackgroundNavbar)] rounded-2xl shadow-2xl flex flex-col w-full max-w-md mx-auto p-6 md:p-8 relative gap-6">
        <button
          className="absolute top-4 right-4 text-[var(--colorTextAlt)] hover:text-gray-400 text-4xl font-bold z-10"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="text-[var(--colorTextAlt)] text-center font-bold text-2xl md:text-3xl mb-2">
          {product.name}
        </div>
        <div className="flex justify-center">
          <Image
            src={product.image || defaultProductImage}
            alt={product.name}
            width={224}
            height={224}
            className="object-cover w-40 h-40 md:w-56 md:h-56 rounded-xl"
          />
        </div>
        <div className="text-center text-green-600 font-bold text-2xl md:text-3xl mb-2">
          ${product.price}
        </div>
        <div className="flex items-center justify-center gap-6 mb-2 text-[var(--colorTextAlt)] ">
          <button
            className="px-6 py-4 bg-[var(--colorPrimaryOrange)] hover:bg-[var(--colorPrimaryOrangeHover)] rounded-xl text-3xl font-bold"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span className="font-semibold text-2xl w-16 text-center">
            {quantity}
          </span>
          <button
            className="px-6 py-4 bg-[var(--colorPrimaryOrange)] hover:bg-[var(--colorPrimaryOrangeHover)] rounded-xl text-3xl font-bold"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <button
          className="w-full py-4 mt-2 bg-[var(--colorBackgroundSuccess)] hover:bg-[var(--colorBackgroundSuccessHover)] text-[var(--colorText)] text-xl font-bold rounded-xl shadow-lg cursor-pointer transition-colors"
          onClick={() => {
            addProductToSale({ ...product, quantity });
            onClose();
          }}
        >
          Agregar
        </button>
        {product.notes && (
          <div className="w-full mt-6 px-2 text-[var(--colorTextAlt)] text-base text-center">
            <span className="font-semibold">Notas: </span>
            {product.notes}
          </div>
        )}
      </div>
    </div>
  );
}
