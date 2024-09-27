import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kiosk } from '@/types/kiosk';
import { ExtraInfo } from '@/types/apiResponse';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';
import { ProductsExtraInfo } from '@/types/Product';


export interface CartProduct extends Product {
    units: number;
}

export type SortType = 'Popularity' | 'Price: Low to High' | 'Price: High to Low' | 'Newest';
interface ProductState {
    products: Product[];
    categories: Category[];
    showEditModal: boolean;
    extraInfo: ProductsExtraInfo;
    page: number;
    limit: number;
    totalCartProducts: number

    search: string | null;
    selectedProduct: Product | null;
    selectedSort: SortType;
    selectedCategory: null | Category
    selectedPrice: null | number
}

const initialState: ProductState = {
    products: [],
    categories: [],
    selectedSort: 'Newest',
    showEditModal: false,
    totalCartProducts: 0,
    extraInfo: {
        count: 0,
        pageNumber: 0,
        pageSize: 0,
        from: 0,
        to: 0,
        productWithHighestPrice: null,
        productWithLowestPrice: null,
    },
    page: 1,
    limit: 10,
    search: null,
    selectedCategory: null,
    selectedProduct: null,
    selectedPrice: null
};

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
const publicProductSlice = createSlice({
    name: 'publicProductSlice',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        setCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
        },

        addToCart(state, action: PayloadAction<Product>) {
            const cartProducts = getCartFromLocalStorage();
            const productIndex = cartProducts.findIndex(cartProduct => cartProduct.id === action.payload.id);

            if (productIndex !== -1) {

                // If the product already exists in local storage, increment the units
                // cartProducts[productIndex].units += 1;
                throw new Error('Product already exists in the cart');
            } else {
                // If the product does not exist, add it with units set to 1
                const productWithUnits: CartProduct = { ...action.payload, units: 1 };
                cartProducts.push(productWithUnits);
            }

            updateCartProductsInStorage(cartProducts);

            // Optionally, remove the product from state if needed
            // state.products = state.products.filter(p => p.id !== action.payload.id);
        },


        setTotalCartProducts(state, action: PayloadAction<number>) {
            state.totalCartProducts = action.payload
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
        setExtraInfo(state, action: PayloadAction<ProductsExtraInfo>) {
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
        setSelectedSort(state, action: PayloadAction<SortType>) {
            state.selectedSort = action.payload
        },
        toggleEditModal(state) {
            state.showEditModal = !state.showEditModal;
        },

        setSelectedProduct(state, action: PayloadAction<Product | null>) {
            state.selectedProduct = action.payload;
        },
        setSelectedCategory(state, action: PayloadAction<Category | null>) {
            state.selectedCategory = action.payload;
        },
        setSelectedPrice(state, action: PayloadAction<number | null>) {
            state.selectedPrice = action.payload
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
    setSelectedPrice,
    setSearch,
    toggleEditModal,
    setSelectedProduct,
    setSelectedCategory,
    setSelectedSort,
    setTotalCartProducts,
    setCategories

} = publicProductSlice.actions;

export default publicProductSlice;
