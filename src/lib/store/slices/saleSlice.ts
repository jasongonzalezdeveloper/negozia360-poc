import { Product, Sale } from "@/lib/types/common";
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { calculateTotal, calculateTotalQuantity } from "@/lib/utils/saleCalculations";

interface SaleState {
    sales: Sale[];
    activeSale: Sale | null;
}

const initialState: SaleState = {
    sales: [],
    activeSale: null
};

// Helper function to update sale totals
const updateSaleTotals = (sale: Sale) => {
    sale.total = calculateTotal(sale.cart);
    sale.quantity = calculateTotalQuantity(sale.cart);
};

const saleSlice = createSlice({
    name: "sale",
    initialState,
    reducers: {
        addSale: (state) => {
            const newSale = {
                id: crypto.randomUUID(),
                client: "Cliente nuevo " + (state.sales.length + 1),
                total: 0,
                quantity: 0,
                cart: [],
            };
            state.sales.push(newSale);
            state.activeSale = newSale;
        },
        removeSale: (state, action: PayloadAction<string>) => {
            state.sales = state.sales.filter(sale => sale.id !== action.payload);
        },
        updateSale: (state, action: PayloadAction<Sale>) => {
            const index = state.sales.findIndex(sale => sale.id === action.payload.id);
            if (index !== -1) {
                state.sales[index] = action.payload;
            }
        },
        setNameActiveSale: (state, action: PayloadAction<{ name: string | null }>) => {
            if (state.activeSale) {
                state.activeSale.client = action.payload.name ?? "";
                state.sales = state.sales.map(sale => sale.id === state.activeSale?.id ? state.activeSale : sale);
            }
        },
        setActiveSale: (state, action: PayloadAction<string>) => {
            const sale = state.sales.find(sale => sale.id === action.payload);
            if (sale) {
                state.activeSale = sale;
            }
        },
        addProductToSale: (state, action: PayloadAction<{ saleId: string; product: Product }>) => {
            const { saleId, product } = action.payload;
            const sale = state.sales.find(s => s.id === saleId);
            if (sale) {
                const existingProduct = sale.cart.find(p => p.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity = (existingProduct.quantity || 1) + (product.quantity || 1);
                } else {
                    sale.cart.push({ ...product, quantity: product.quantity || 1 });
                }
                updateSaleTotals(sale);
                state.activeSale = { ...sale };
            } else {
                const newSale = {
                    id: crypto.randomUUID(),
                    client: "Cliente nuevo " + (state.sales.length + 1),
                    total: 0,
                    quantity: 0,
                    cart: [{ ...product, quantity: product.quantity || 1 }],
                };
                updateSaleTotals(newSale);
                state.sales.push(newSale);
                state.activeSale = newSale;
            }
        },
        increaseProductQuantity: (state, action: PayloadAction<{ saleId: string; productId: string }>) => {
            const { saleId, productId } = action.payload;
            const sale = state.sales.find(s => s.id === saleId);
            if (sale) {
                const product = sale.cart.find(p => p.id === productId);
                if (product) {
                    product.quantity = (product.quantity || 1) + 1;
                    updateSaleTotals(sale);
                    state.activeSale = { ...sale };
                }
            }
        },
        decreaseProductQuantity: (state, action: PayloadAction<{ saleId: string; productId: string }>) => {
            const { saleId, productId } = action.payload;
            const sale = state.sales.find(s => s.id === saleId);
            if (sale) {
                const product = sale.cart.find(p => p.id === productId);
                if (product && (product.quantity || 1) > 1) {
                    product.quantity = (product.quantity || 1) - 1;
                    updateSaleTotals(sale);
                    state.activeSale = { ...sale };
                }
            }
        },
        removeProductFromSale: (state, action: PayloadAction<{ saleId: string; productId: string }>) => {
            const { saleId, productId } = action.payload;
            const sale = state.sales.find(s => s.id === saleId);
            if (sale) {
                const productIndex = sale.cart.findIndex(p => p.id === productId);
                if (productIndex !== -1) {
                    sale.cart.splice(productIndex, 1);
                    updateSaleTotals(sale);
                    state.activeSale = { ...sale };
                }
            }
        }
    },
});

export const {
    addSale,
    removeSale,
    updateSale,
    addProductToSale,
    setNameActiveSale,
    setActiveSale,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromSale
} = saleSlice.actions;
export default saleSlice.reducer;