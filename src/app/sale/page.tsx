"use client";

// import { useTranslations } from "next-intl";
import SaleList from "@/components/features/sale/saleList/saleList";

export default function Sale() {
  // const t = useTranslations();
  return (
    <div className="p-8 h-full bg-[var(--colorBackgroundBody)]">
      <SaleList />
    </div>
  );
}
