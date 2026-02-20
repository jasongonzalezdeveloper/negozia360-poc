"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Sale } from "@/lib/types/common";
import ActiveSale from "./activeSale";
import PendingSale from "./pendingSale";
import SummaryForm from "./summaryForm";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  addSale,
  setActiveSale,
  setNameActiveSale,
} from "@/lib/store/slices/saleSlice";

export default function SaleSummary() {
  const dispatch = useAppDispatch();
  const summaryRef = useRef<HTMLDivElement>(null);

  const [showSales, setShowSales] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const activeSale = useAppSelector((state) => state.sale.activeSale);
  const pendingSales = useAppSelector((state) => state.sale.sales);

  const handlePendingSale = (id: string) => {
    setShowSales(false);
    setShowSummary(true);
    dispatch(setActiveSale(id));
  };

  const handleToggleSales = () => {
    setShowSales((prev) => !prev);
  };

  const setClientName = (name: string) => {
    if (activeSale) {
      dispatch(setNameActiveSale({ name }));
    }
  };

  const newActiveSale = () => {
    dispatch(addSale());
    setShowSales(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        summaryRef.current &&
        !summaryRef.current.contains(event.target as Node)
      ) {
        setShowSummary(false);
      }
    };

    if (showSummary) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSummary]);

  return (
    <div className="relative flex items-end">
      {activeSale && <ActiveSale setShowSummary={setShowSummary} />}
      <div className="fixed bottom-4 right-4 flex flex-col items-end">
        <button
          className="mb-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-bold shadow  transition cursor-pointer select-none"
          onClick={() => {
            newActiveSale();
          }}
        >
          + Nueva venta
        </button>
        {pendingSales.length > 0 &&
          pendingSales.some((sale) => sale.id !== activeSale?.id) && (
            <div
              className="flex flex-row items-end gap-2 rounded-lg shadow-lg px-4 py-3 min-w-[180px] max-w-[320px] cursor-pointer select-none transition pointer-events-auto bg-white hover:bg-[var(--colorBackgroundHeader)]"
              onClick={handleToggleSales}
              aria-label={showSales ? "Ocultar sales" : "Mostrar sales"}
            >
              <span className="font-bold text-base text-[var(--colorPrimaryOrange)]">
                Ventas pendientes
              </span>
              <span className="ml-2 px-3 py-1 bg-gray-200 rounded-lg text-gray-700 font-bold">
                {showSales ? "→" : "←"}
              </span>
            </div>
          )}

        {showSales && (
          <div className="flex flex-row-reverse items-end gap-4 mt-2">
            {pendingSales
              .filter((sale) => sale.id !== activeSale?.id)
              .map((sale) => {
                return (
                  <PendingSale
                    key={sale.id}
                    sale={sale}
                    handleSaleClick={handlePendingSale}
                  />
                );
              })}
          </div>
        )}
      </div>
      {activeSale && showSummary && (
        <div ref={summaryRef}>
          <SummaryForm
            activeSale={activeSale ?? null}
            setClientName={setClientName}
            setShowSummary={setShowSummary}
          />
        </div>
      )}
    </div>
  );
}
