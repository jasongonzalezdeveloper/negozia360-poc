import { Product } from "@/lib/types/common";
import React from "react";
import Image from "next/image";
import defaultProductImage from "@/assets/images/default.jpg";

type SaleListItemProps = {
  product: Product;
  isCategory: boolean;
  isSubcategory: boolean;
  fatherName?: string;
  setSelectedCategory: (id: string) => void;
  setSelectedSubcategory: (id: string | null) => void;
  setModalProduct: (product: Product) => void;
  setModalOpen: (isOpen: boolean) => void;
};
export default function SaleListItem({
  product,
  isCategory,
  isSubcategory,
  fatherName,
  setSelectedCategory,
  setSelectedSubcategory,
  setModalProduct,
  setModalOpen,
}: SaleListItemProps) {
  return (
    <div
      className="rounded-lg shadow flex flex-col h-60 transition-all duration-200 p-0 cursor-pointer hover:scale-95"
      onClick={() => {
        if (isCategory) {
          setSelectedCategory(product.id);
          setSelectedSubcategory(null);
        } else if (isSubcategory) {
          setSelectedSubcategory(product.id);
        } else {
          setModalProduct(product);
          setModalOpen(true);
        }
      }}
    >
      {isCategory || isSubcategory ? (
        <>
          <div className="flex-[3] w-full flex flex-col justify-center items-center py-2 bg-[var(--colorBackgroundProductItem)]">
            <div className="font-semibold text-center text-[var(--colorTextAlt)] ">
              {product.name}
            </div>
          </div>
          <div className="flex-[7] w-full h-0" style={{ aspectRatio: "1/1" }}>
            <Image
              src={defaultProductImage}
              alt={product.name}
              width={224}
              height={224}
              className="object-cover w-full h-full rounded-b-lg"
            />
          </div>
        </>
      ) : (
        // Product
        <>
          <div className="rounded-t-lg w-full text-center font-bold text-base py-5 text-[var(--colorTextAlt)] bg-[var(--colorBackgroundProductItem)] relative">
            <span className="block w-full truncate px-2">{fatherName}</span>
            <span className="absolute top-2 right-2 bg-[var(--colorPrimaryOrange)] text-[var(--colorTextAlt)] text-xs font-bold px-3 py-1 rounded shadow-lg">
              Oferta
            </span>
          </div>
          <div
            className="flex-[7] w-full h-0 relative"
            style={{ aspectRatio: "1/1" }}
          >
            <Image
              src={defaultProductImage}
              alt={product.name}
              width={224}
              height={224}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-[3] w-full flex flex-col justify-center px-3 py-4 bg-[var(--colorBackgroundProductItemTextCard)] text-[var(--colorText)]">
            <div className="w-full flex flex-col justify-center py-2 relative">
              <div
                className="font-semibold w-full truncate"
                title={product.name}
              >
                {product.name}
              </div>
              <div className="text-green-600 font-bold">${product.price}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
