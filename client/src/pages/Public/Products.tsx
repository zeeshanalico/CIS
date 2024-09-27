import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { motion } from 'framer-motion';
import FormSearch from '@/components/core/FormSearch';
import {
    getCartFromLocalStorage,
    addToCart,
    setExtraInfo,
    CartProduct,
    SortType,
    clearCart,
    removeFromCart,
    setCategories,
    setPage,
    setSelectedCategory,
    setSelectedProduct,
    setSelectedSort,
    setTotalCartProducts,
    toggleEditModal,
    setProducts,
    setSearch,
    setLimit,
    setSelectedPrice,
} from '@/store/slices/publicSlice/publicProductSlice';
import usePagination from '@/components/hooks/usePagination';
import { Product } from '@/types/Product';
import { errorHandler } from '@/components/error/errorHandler';
import { toast } from '@/components/ui/use-toast';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/store/slices/publicSlice/publicApiSlice';
import imageComingSoon from '../../assets/image-coming-soon.jpg';
import { Button } from '@/components/ui/button';
import CartButton from '../Sale/CartButton';
import { FiShoppingCart } from 'react-icons/fi';
import { CiSearch } from '../../assets/icons';
import { Category } from '@/types/Category';
import ResultsAndSorting from '@/components/core/ResultsAndSorting';

const sortOptions = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export default function ProductPage() {
    const {
        products,
        totalCartProducts,
        extraInfo,
        limit,
        page,
        search,
        categories,
        selectedCategory,
        selectedPrice,
        selectedSort,
        selectedProduct,
        showEditModal,
    } = useSelector((state: RootState) => state.publicProductSlice);
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState<string | null>(search || '');
    const { data: categoriesResponse } = useGetCategoriesQuery();
    const [isOpenCart, setIsOpenCart] = useState<boolean>(false);

    const { data: productsResponse } = useGetProductsQuery({
        limit,
        page,
        search,
        availableProducts: true,
        category: selectedCategory?.id,
        priceRange: selectedPrice,
    });

    const [filteredOptions, setFilteredOptions] = useState<{ category: Category | null, priceRange: number | null }>({
        category: selectedCategory,
        priceRange: extraInfo.productWithHighestPrice?.sale_price ?? null,

    });

    const { currentPage, totalPages, goToNextPage, goToPrevPage, goToPage } = usePagination({
        totalItems: extraInfo?.count || 0,
        itemsPerPage: limit,
    });

    useEffect(() => {
        if (productsResponse?.result) {
            dispatch(setProducts(productsResponse.result));
        }
        if (productsResponse?.extraInfo) {
            dispatch(setExtraInfo(productsResponse.extraInfo));
        }
    }, [productsResponse, dispatch, extraInfo]);

    useEffect(() => {
        if (categoriesResponse?.result) {
            dispatch(setCategories(categoriesResponse.result));
        }
    }, [categoriesResponse, dispatch]);

    useEffect(() => {
        const cartItems = getCartFromLocalStorage();
        if (cartItems) {
            dispatch(setTotalCartProducts(cartItems.length));
        }
    }, [dispatch]);

    const handleSearch = () => {
        goToPage(1)
        dispatch(setPage(1));
        dispatch(setSearch(searchValue || ''));
    };

    const handleAddToCart = (product: Product) => {
        try {
            dispatch(addToCart(product));
            dispatch(setTotalCartProducts(getCartFromLocalStorage().length)); // Update cart count
            toast({
                duration: 1200,
                title: `${product.name} added to cart.`,
            });
        } catch (error) {
            errorHandler(error);
        }
    };

    const toggleModal = () => {
        setIsOpenCart(!isOpenCart);
    };

    const applyFilters = () => {
        goToPage(1)
        dispatch(setPage(1));
        dispatch(setSelectedCategory(filteredOptions.category));
        dispatch(setSelectedPrice(filteredOptions.priceRange));
    };

    const resetFilters = () => {
        goToPage(1)
        dispatch(setPage(1));
        setFilteredOptions({
            category: null,
            priceRange: null,
        });
        dispatch(setSelectedCategory(null));
        dispatch(setSelectedPrice(null));
        dispatch(setSearch(''));
    };


    const handleSelectedSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setSelectedSort(e.target.value as SortType));
    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setLimit(Number(e.target.value)))
    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilteredOptions((prevState: any) => ({ ...prevState, priceRange: e.target.value }))
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-indigo-900 text-white py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">KioskInventory Products</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Sidebar with filters */}
                    <aside className="w-full md:w-1/4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <Filter className="mr-2" size={20} />
                                Filters
                            </h2>

                            {/* Categories */}
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">Categories</h3>
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            id={category.name}
                                            name="category"
                                            value={category.name}
                                            className="mr-2"
                                            checked={filteredOptions.category?.id === category.id}
                                            onChange={() => setFilteredOptions((prevState: any) => ({ ...prevState, category }))}
                                        />
                                        <label htmlFor={category.name}>{category.name}</label>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">Price Range</h3>
                                <input
                                    type="range"
                                    name="priceRange"
                                    onChange={handleRangeChange}
                                    step="10"
                                    className="w-full"
                                    min={extraInfo?.productWithLowestPrice?.sale_price}
                                    max={extraInfo?.productWithHighestPrice?.sale_price}
                                    value={filteredOptions.priceRange ?? 0}
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>RS {extraInfo.productWithLowestPrice?.sale_price}</span>
                                    <span>RS {extraInfo.productWithHighestPrice?.sale_price}</span>
                                </div>
                            </div>

                            {/* Reset and Apply buttons */}
                            <div className="flex justify-between gap-2 mt-4">
                                <Button variant="secondary" className='w-full' onClick={resetFilters}>
                                    Reset
                                </Button>
                                <Button className='bg-indigo-600 hover:bg-indigo-700 w-full' onClick={applyFilters}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* Main content area */}
                    <div className="w-full md:w-3/4">
                        {/* Search and sort bar */}
                        <div className="p-1 flex flex-col gap-4 justify-between items-center">
                            <div className="flex flex-row shadow-sm justify-between w-full">
                                <FormSearch
                                    setSearchValue={setSearchValue}
                                    handleSearch={handleSearch}
                                    searchValue={searchValue}
                                />
                                <CartButton
                                    icon={<FiShoppingCart />}
                                    itemCount={totalCartProducts} // Pass the updated count
                                    disabled={totalCartProducts === 0}
                                    onClick={toggleModal}
                                />
                            </div>

                            {/* Results and Sorting */}
                            <ResultsAndSorting
                                to={extraInfo.to}
                                from={extraInfo.from}
                                count={extraInfo.count}
                                limit={limit}
                                handleLimitChange={handleLimitChange}
                                selectedSort={selectedSort}
                                sortOptions={sortOptions}
                                handleSelectedSortChange={handleSelectedSortChange}
                            />

                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                                    <img
                                        src={product.image_url ?? imageComingSoon}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                        <p className="text-gray-600 mb-2">{product.category?.name}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-indigo-600">Rs {product.sale_price}</span>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                <button
                                    onClick={() => {
                                        dispatch(setPage(page - 1));
                                        goToPrevPage();
                                    }}
                                    className="px-3 py-2 rounded-lg border hover:bg-gray-100"
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => {
                                            dispatch(setPage(index + 1));
                                            goToPage(index + 1);
                                        }}
                                        className={`px-3 py-2 rounded-lg border ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => {
                                        dispatch(setPage(page + 1));
                                        goToNextPage();
                                    }}
                                    className="px-3 py-2 rounded-lg border hover:bg-gray-100"
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}
