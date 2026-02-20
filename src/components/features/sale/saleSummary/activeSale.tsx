"use client";
import React from "react";
import { useAppSelector } from "@/lib/store/hooks";

type ActiveSaleProps = {
  setShowSummary: (show: boolean) => void;
};
export default function ActiveSale({ setShowSummary }: ActiveSaleProps) {
  const activeSale = useAppSelector((state) => state.sale.activeSale);

  return (
    <div
      className="fixed bottom-[1px] left-5 z-[998] cursor-pointer select-none"
      onClick={() => setShowSummary(true)}
    >
      <div
        className={`bg-white hover:bg-[var(--colorBackgroundHeader)] border-4 border-[var(--colorPrimaryGreen)] ring-2 ring-blue-300 rounded-lg shadow-lg px-6 py-6 flex flex-col justify-center items-center gap-2 w-[220px] h-[120px] transition-all duration-200 mb-2`}
      >
        <span className="font-bold text-xl text-[var(--colorPrimaryOrange)] mb-2">
          {activeSale?.client}
        </span>
        <div className="flex items-center gap-4 w-full justify-center">
          <span className="font-bold text-xl text-[var(--colorPrimaryGreen)]">
            ${activeSale?.total.toFixed(2)}
          </span>
          <span className="text-base text-gray-700">
            {activeSale?.quantity} productos
          </span>
        </div>
      </div>
    </div>
  );
}
