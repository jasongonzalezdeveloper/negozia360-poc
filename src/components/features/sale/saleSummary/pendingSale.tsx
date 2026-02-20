import { Sale } from "@/lib/types/common";
import React from "react";

type PendingSaleProps = {
  key: string;
  sale: Sale;
  handleSaleClick: (id: string) => void;
};
export default function PendingSale({
  key,
  sale,
  handleSaleClick,
}: PendingSaleProps) {
  return (
    <div
      key={key}
      className="bg-white hover:bg-[var(--colorBackgroundHeader)]  rounded-lg shadow-lg px-6 py-6 flex flex-col justify-center items-center gap-2 cursor-pointer w-[220px] h-[120px] transition-all duration-200 hover:scale-105"
      onClick={() => handleSaleClick(sale.id)}
    >
      <span className="font-bold text-xl text-[var(--colorPrimaryOrange)] mb-2">
        {sale.client}
      </span>
      <div className="flex items-center gap-4 w-full justify-center">
        <span className="font-bold text-xl text-[var(--colorPrimaryGreen)]">
          ${sale.total.toFixed(2)}
        </span>
        <span className="text-base text-gray-700">
          {sale.quantity} productos
        </span>
      </div>
    </div>
  );
}
