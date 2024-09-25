import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kiosk } from '@/types/kiosk';
import { ExtraInfo } from '@/types/apiResponse';
import { Product } from '@/types/Product';

// Cart Product with units for local storage
export interface CartProduct extends Product {
    units: number;
}

interface ProductState {
    products: Product[];
    showEditModal: boolean;
    selectedProduct: Product | null;
    extraInfo: ExtraInfo;
    page: number;
    limit: number;
    search: string | null;
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    showEditModal: false,
    extraInfo: {
        count: 0,
        pageNumber: 0,
        pageSize: 0,
        from: 0,
        to: 0,
    },
    page: 1,
    limit: 10,
    search: null,
};

// Helper functions to manage cart in local storage
const updateCartProductsInStorage = (cartProducts: CartProduct[]) => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};

export const getCartFromLocalStorage = (): CartProduct[] => {
    const storedCart = localStorage.getItem('cartProducts');
    return storedCart ? JSON.parse(storedCart) : [];
};

export const totalCartProductsInStorage = () => {
    return getCartFromLocalStorage().length
}
const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },

        // Add product to the cart with units management in local storage
        // addToCart(state, action: PayloadAction<Product>) {

        //     const cartProducts = getCartFromLocalStorage();

        //     const productWithUnits: CartProduct = { ...action.payload, units: 1 };
        //     cartProducts.push(productWithUnits);
        //     updateCartProductsInStorage(cartProducts);
        //     state.products = state.products.filter(p => p.id != action.payload.id)
        // },
        addToCart(state, action: PayloadAction<Product>) {
            const cartProducts = getCartFromLocalStorage();
            const productIndex = cartProducts.findIndex(cartProduct => cartProduct.id === action.payload.id);

            if (productIndex !== -1) {
                // If the product already exists in local storage, increment the units
                cartProducts[productIndex].units += 1;
            } else {
                // If the product does not exist, add it with units set to 1
                const productWithUnits: CartProduct = { ...action.payload, units: 1 };
                cartProducts.push(productWithUnits);
            }

            updateCartProductsInStorage(cartProducts);

            // Optionally, remove the product from state if needed
            // state.products = state.products.filter(p => p.id !== action.payload.id);
        },



        removeFromCart(state, action: PayloadAction<Product>) {
            let cartProducts = getCartFromLocalStorage();
            const productIndex = cartProducts.findIndex(p => p.id === action.payload.id);

            if (productIndex !== -1) {
                if (cartProducts[productIndex].units > 1) {
                    // If units > 1, decrement units
                    cartProducts[productIndex].units -= 1;
                } else {
                    // If units == 1, remove the product
                    cartProducts = cartProducts.filter(p => p.id !== action.payload.id);
                }
            }

            updateCartProductsInStorage(cartProducts);
        },

        // Clear the cart and remove products from local storage
        clearCart(state) {
            updateCartProductsInStorage([]);
        },

        // Set additional information (pagination, etc.)
        setExtraInfo(state, action: PayloadAction<ExtraInfo>) {
            state.extraInfo = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setSelectedProduct(state, action: PayloadAction<Product>) {
            state.selectedProduct = action.payload;
        },
        toggleEditModal(state) {
            state.showEditModal = !state.showEditModal;
        },
    },
});

export const {
    setProducts,
    addToCart,
    removeFromCart,
    clearCart,
    setExtraInfo,
    setPage,
    setLimit,
    setSearch,
    toggleEditModal,
    setSelectedProduct,
} = productSlice.actions;

export default productSlice;
