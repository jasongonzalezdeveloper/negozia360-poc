"use client";
import React, { useState } from "react";
import Image from "next/image";
import defaultProductImage from "@/assets/images/default.jpg";
import productsMock from "@/mocks/productMocks";
import SaleModal from "./saleModal";
import { Product } from "@/lib/types/common";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import SaleListItem from "./saleListItem";
import { addProductToSale } from "@/lib/store/slices/saleSlice";

export default function SaleList() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const favorites = productsMock.filter((p) => p.favorite);

  const dispatch = useAppDispatch();
  const activeSale = useAppSelector((state) => state.sale.activeSale);

  const clickAddProductToSale = (product: Product) => {
    if (!activeSale) {
      dispatch(addProductToSale({ saleId: "", product }));
    } else {
      dispatch(addProductToSale({ saleId: activeSale.id, product }));
    }
  };

  const getSubcategories = (fatherId: string) =>
    productsMock.filter(
      (p) => p.idFather === fatherId && (!p.price || p.price === 0)
    );
  const getProducts = (fatherId: string) =>
    productsMock.filter(
      (p) => p.idFather === fatherId && p.price && p.price > 0
    );

  let itemsToShow: Product[] = [];

  if (search.trim()) {
    const searchLower = search.toLowerCase();
    itemsToShow = productsMock.filter((product) => {
      const isProduct = product.price && product.price > 0;
      if (!isProduct) return false;

      return product.name.toLowerCase().includes(searchLower);
    });
  } else {
    if (!selectedCategory && !selectedSubcategory) {
      itemsToShow = productsMock.filter((p) => !p.idFather);
    } else if (selectedCategory && !selectedSubcategory) {
      itemsToShow = [
        ...getSubcategories(selectedCategory),
        ...getProducts(selectedCategory),
      ];
    } else if (selectedSubcategory) {
      itemsToShow = [
        ...getSubcategories(selectedSubcategory),
        ...getProducts(selectedSubcategory),
      ];
    }
  }

  return (
    <div className="w-full min-h-screen p-6 overflow-hidden flex flex-col bg-[var(--colorBackgroundBody)]">
      <h2 className="text-xl font-bold mb-4">
        Lista de productos para la venta
      </h2>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Favoritos</h3>
        <div className="overflow-x-auto max-w-full">
          <div className="flex gap-4 min-w-[400px]">
            {favorites.map((product) => {
              const father = productsMock.find(
                (p) => p.id === product.idFather
              );
              const fatherName = father?.name || "";
              return (
                <div
                  key={product.id}
                  className="rounded-lg shadow flex flex-col min-w-[180px] h-60 transition-all duration-200 p-0 cursor-pointer hover:scale-95"
                  onClick={() => {
                    setModalProduct(product);
                    setModalOpen(true);
                  }}
                >
                  <div className="rounded-t-lg w-full text-center font-bold text-base py-5 text-[var(--colorTextAlt)] bg-[var(--colorBackgroundProductItem)] relative">
                    <span className="absolute top-2 right-2 bg-[var(--colorPrimaryOrange)] text-[var(--colorTextAlt)] text-xs font-bold px-3 py-1 rounded shadow-lg z-10">
                      Oferta
                    </span>
                    <span className="block w-full truncate px-2 mt-4">
                      {fatherName}
                    </span>
                  </div>
                  <div
                    className="flex-[7] w-full h-0 relative"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <Image
                      src={defaultProductImage}
                      alt={product.name}
                      width={180}
                      height={180}
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
                      <div className="text-green-600 font-bold">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <h3 className="font-semibold mb-2">Todos los productos</h3>
        <div className="mb-4">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            {(selectedCategory || selectedSubcategory) && (
              <div className="flex gap-2 flex-wrap items-center text-sm flex-grow min-w-0">
                <button
                  className="px-3 py-1 rounded  text-gray-800 font-semibold cursor-pointer hover:underline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                  }}
                >
                  Home
                </button>
                {selectedCategory && <span className="mx-2">/</span>}
                {selectedCategory && (
                  <button
                    className="px-3 py-1 rounded text-gray-800 font-semibold cursor-pointer hover:underline"
                    onClick={() => {
                      setSelectedSubcategory(null);
                    }}
                  >
                    {productsMock.find((p) => p.id === selectedCategory)?.name}
                  </button>
                )}
                {selectedSubcategory && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="font-semibold text-gray-700">
                      {
                        productsMock.find((p) => p.id === selectedSubcategory)
                          ?.name
                      }
                    </span>
                  </>
                )}
              </div>
            )}
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre..."
              className="px-3 py-2 border rounded w-64 flex-shrink-0 ml-auto bg-white"
            />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {itemsToShow.map((product) => {
            const isCategory = !product.idFather;
            const isSubcategory =
              product.idFather && (!product.price || product.price === 0);
            const isProduct =
              product.idFather && product.price && product.price > 0;
            let fatherName = "";
            if (isProduct) {
              const father = productsMock.find(
                (p) => p.id === product.idFather
              );
              fatherName = father?.name || "";
            }
            return (
              <SaleListItem
                key={product.id}
                product={product}
                isCategory={isCategory}
                isSubcategory={!!isSubcategory}
                fatherName={fatherName}
                setSelectedCategory={setSelectedCategory}
                setSelectedSubcategory={setSelectedSubcategory}
                setModalProduct={setModalProduct}
                setModalOpen={setModalOpen}
              />
            );
          })}
        </div>
      </div>
      <SaleModal
        product={modalProduct as Product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        addProductToSale={clickAddProductToSale}
      />
    </div>
  );
}
