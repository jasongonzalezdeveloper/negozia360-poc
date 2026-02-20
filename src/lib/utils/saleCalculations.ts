import { Product } from "@/lib/types/common";

/**
 * Calcula el subtotal de un carrito de productos
 * @param cart Array de productos en el carrito
 * @returns Subtotal sin IVA
 */
export const calculateSubtotal = (cart: Product[]): number => {
    return cart.reduce((acc, product) => {
        const price = product.price || 0;
        const quantity = product.quantity || 0;
        return acc + (price * quantity);
    }, 0);
};

/**
 * Calcula el total de IVA de un carrito de productos
 * @param cart Array de productos en el carrito
 * @returns Total de IVA
 */
export const calculateIVA = (cart: Product[]): number => {
    return cart.reduce((acc, product) => {
        const price = product.price || 0;
        const quantity = product.quantity || 0;
        const iva = product.iva || 0;
        return acc + ((price * quantity * iva) / 100);
    }, 0);
};

/**
 * Calcula el total final (subtotal + IVA) de un carrito
 * @param cart Array de productos en el carrito
 * @returns Total final
 */
export const calculateTotal = (cart: Product[]): number => {
    return calculateSubtotal(cart) + calculateIVA(cart);
};

/**
 * Calcula el total de un producto individual (precio * cantidad)
 * @param product Producto individual
 * @returns Total del producto
 */
export const calculateProductTotal = (product: Product): number => {
    const price = product.price || 0;
    const quantity = product.quantity || 0;
    return price * quantity;
};

/**
 * Formatea un número como moneda
 * @param amount Cantidad a formatear
 * @returns String formateado como moneda
 */
export const formatCurrency = (amount: number): string => {
    return amount.toFixed(2);
};

/**
 * Calcula la cantidad total de productos en el carrito
 * @param cart Array de productos en el carrito
 * @returns Cantidad total de productos
 */
export const calculateTotalQuantity = (cart: Product[]): number => {
    return cart.reduce((acc, product) => {
        return acc + (product.quantity || 0);
    }, 0);
};