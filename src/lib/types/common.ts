export type Sale = {
    id: string;
    client: string;
    total: number;
    quantity: number;
    cart: Product[];
};

export interface Product {
    id: string;
    name: string;
    image?: string;
    quantity?: number;
    favorite?: boolean;
    idFather?: string;
    notes?: string;
    price?: number;
    iva?: number;
}
