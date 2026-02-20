import React, { useState } from "react";
import Image from "next/image";
import { Sale } from "@/lib/types/common";
import defaultProductImage from "@/assets/images/default.jpg";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromSale,
} from "@/lib/store/slices/saleSlice";
import {
  calculateSubtotal,
  calculateIVA,
  calculateTotal,
  calculateProductTotal,
  formatCurrency,
} from "@/lib/utils/saleCalculations";

type SummaryFormProps = {
  activeSale: Sale | null;
  setClientName: (name: string) => void;
  setShowSummary: (show: boolean) => void;
};
export default function SummaryForm({
  activeSale,
  setClientName,
  setShowSummary,
}: SummaryFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [promoCode, setPromoCode] = useState("");
  const [editClient, setEditClient] = useState(false);

  const handleIncreaseQuantity = (productId: string) => {
    if (activeSale) {
      dispatch(increaseProductQuantity({ saleId: activeSale.id, productId }));
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    if (activeSale) {
      dispatch(decreaseProductQuantity({ saleId: activeSale.id, productId }));
    }
  };

  const handleRemoveProduct = (productId: string) => {
    if (activeSale) {
      dispatch(removeProductFromSale({ saleId: activeSale.id, productId }));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[450px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-6 flex flex-col z-[999] transition-all duration-300 ease-in-out text-gray-900 opacity-100 translate-y-0 min-h-[550px] max-h-[750px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Resumen</h2>
        <button
          className="px-4 py-2 text-base rounded bg-gray-700 text-white hover:bg-gray-900 font-bold"
          onClick={() => setShowSummary(false)}
        >
          Cerrar
        </button>
      </div>
      <div className="mb-2 flex items-center gap-2 text-[var(--colorPrimaryOrange)]">
        {editClient ? (
          <input
            type="text"
            className="font-bold text-lg  border-b border-[var(--colorPrimaryOrange)] outline-none px-2 py-1 bg-white"
            value={activeSale?.client || ""}
            onChange={(e) => setClientName(e.target.value)}
            onBlur={() => {
              setEditClient(false);
            }}
            autoFocus
          />
        ) : (
          <span
            className="font-bold text-lg cursor-pointer"
            title="Editar nombre"
            onClick={() => setEditClient(true)}
          >
            {activeSale?.client || ""}
          </span>
        )}
      </div>
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="promo" className="text-gray-700 font-semibold">
          Código promocional:
        </label>
        <input
          id="promo"
          type="text"
          className="border-b border-gray-400 outline-none px-2 py-1 bg-white"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Ingresa tu código"
        />
      </div>
      <div className="mb-4 flex-1 flex flex-col">
        <ul className="divide-y divide-gray-200 overflow-y-auto max-h-[260px]">
          {activeSale?.cart.map((p) => (
            <li key={p.id} className="flex items-center py-3 gap-3">
              <Image
                src={defaultProductImage}
                alt={p.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-lg object-cover bg-gray-100"
              />
              <div className="flex-1">
                <div className="font-semibold text-base text-gray-800">
                  {p.name}
                </div>
                <div className="text-[var(--colorPrimaryGreen)] font-bold">
                  ${p.price}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-lg font-bold transition-colors"
                  onClick={() => handleDecreaseQuantity(p.id)}
                  disabled={(p.quantity || 1) <= 1}
                >
                  -
                </button>
                <span className="font-semibold text-lg w-8 text-center">
                  {p.quantity}
                </span>
                <button
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-lg font-bold transition-colors"
                  onClick={() => handleIncreaseQuantity(p.id)}
                >
                  +
                </button>
              </div>
              <div className="text-lg font-bold w-14 text-right">
                ${formatCurrency(calculateProductTotal(p))}
              </div>
              <button
                className="ml-2 text-red-500 hover:text-red-700 text-3xl px-2 transition-colors"
                onClick={() => handleRemoveProduct(p.id)}
                title="Eliminar producto"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className=" rounded-xl p-4 mb-4 text-[var(--colorText)] flex flex-col gap-2">
        <div className="flex justify-between items-center mb-1">
          <span className="">Subtotal</span>
          <span className="font-bold text-lg">
            $
            {activeSale?.cart
              ? formatCurrency(calculateSubtotal(activeSale.cart))
              : "0.00"}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="">Descuento</span>
          <span className="font-bold text-lg">$0.00</span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="">IVA</span>
          <span className="font-bold text-lg">
            $
            {activeSale?.cart
              ? formatCurrency(calculateIVA(activeSale.cart))
              : "0.00"}
          </span>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-bold text-xl">Total</span>
          <span className="font-bold text-2xl text-[var(--colorPrimaryGreen)]">
            $
            {activeSale?.cart
              ? formatCurrency(calculateTotal(activeSale.cart))
              : "0.00"}
          </span>
        </div>
      </div>
      <button
        className="w-full py-4 bg-gradient-to-r bg-[var(--colorBackgroundSuccess)] hover:bg-[var(--colorBackgroundSuccessHover)] text-[var(--colorText)] text-xl font-bold rounded-xl shadow-lg transition-transform transform cursor-pointer"
        onClick={() => {
          router.push("/sale/checkout");
        }}
      >
        Facturar
      </button>
    </div>
  );
}
