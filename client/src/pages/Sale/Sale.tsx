import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsQuery } from '@/store/slices/productSlice/productApiSlice';
import { setProducts, setExtraInfo, setSearch, setPage, setLimit, addToCart, totalCartProductsInStorage, clearCart } from '@/store/slices/productSlice/productSlice';
import { RootState } from '@/store/store';
import usePagination from '@/components/hooks/usePagination';
import imageCommingSoon from '../../assets/image-coming-soon.jpg';
import { FiShoppingCart, FiTag, CiSearch, FiPackage, FaRupeeSign } from '../../assets/icons'; // Importing some icons
import { Button } from '@/components/ui/button';
import { Product } from '@/types/Product';
import CartModal from './CartModal';
import CartButton from './CartButton';
import { getCartFromLocalStorage } from '@/store/slices/productSlice/productSlice';
import { toast } from '@/components/ui/use-toast';
import { errorHandler } from '@/components/error/errorHandler';
const Sale = () => {
    const { products, extraInfo, limit, page, search } = useSelector((state: RootState) => state.productSlice);
    const [searchValue, setSearchValue] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleModal = () => {
        setTotalCartProducts(getCartFromLocalStorage().length); // Update cart count when toggling modal
        setIsOpen(!isOpen);
    }
    const [totalCartProducts, setTotalCartProducts] = useState(0)
    const { data: productsResponse } = useGetProductsQuery({ limit, page, search: searchValue, availableProducts: true });
    const dispatch = useDispatch();

    const {
        currentPage,
        totalPages,
        goToNextPage,
        goToPrevPage,
        goToPage,
    } = usePagination({
        totalItems: extraInfo.count,
        itemsPerPage: limit,
    });

    useEffect(() => {
        if (productsResponse?.result) {
            dispatch(setProducts(productsResponse.result));
        }
        if (productsResponse?.extraInfo) {
            dispatch(setExtraInfo(productsResponse.extraInfo));
        }
    }, [productsResponse, dispatch]);

    useEffect(() => {
        setTotalCartProducts(getCartFromLocalStorage().length);
    }, [])

    const handleSearch = () => {
        setSearchValue(search);
    }

    const handleAddToCart = (product: Product) => {
        try {
            dispatch(addToCart(product));
            setTotalCartProducts(getCartFromLocalStorage().length); // Increment the count by 1
            toast({
                duration: 1200,
                title: `${product.name} added to cart.`,
            });
        } catch (error) {
            errorHandler(error)
        }
    }
    return (
        <div className='p-6'>
            <div>

            </div>
            <div className='flex flex-row shadow-sm'>
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <CiSearch className='h-6 w-6' />
                    </span>
                    <input
                        name='search'
                        value={search ?? ''}
                        className='flex h-10 pl-10 rouded-none w-full bg-background px-3 focus:outline-none  focus:border-black focus:border-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground active:border-black disabled:cursor-not-allowed disabled:opacity-50'
                        onChange={e => dispatch(setSearch(e.target.value))}
                    />
                </div>
                <Button className='rounded-none' onClick={handleSearch}>Search</Button>
                <CartButton
                    icon={<FiShoppingCart />}
                    itemCount={totalCartProducts} // Pass the updated count
                    disabled={totalCartProducts === 0}
                    onClick={toggleModal} />

            </div>
            <div className="flex flex-row justify-between py-2 items-center">
                <p className="text-sm text-gray-500 ">Showing <span className="font-medium">{extraInfo.from}</span> to <span className="font-medium">{extraInfo.to}</span> of <span className="font-medium">{extraInfo.count}</span> results</p>
                <select
                    className="h-8 outline-none border border-gray-300 rounded"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setLimit(Number(e.target.value)))}
                    value={limit}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {products
                    // .filter(product => !getCartProductsInStorage().some(cartProduct => cartProduct.id === product.id))
                    .map((product: Product) => {
                        const { id, category, image_url, name, quantity, sale_price } = product;
                        return <div key={id} className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                            <img
                                className='w-full h-48 object-fit'
                                src={image_url ?? imageCommingSoon}
                                alt={`product ${name}`}
                            />
                            <div className='p-4'>
                                <div className='text-lg font-semibold mb-2'>{name}</div>
                                <div className='flex items-center mb-2'>
                                    <FiPackage className='text-gray-500 mr-2' />
                                    <span className='text-gray-700'>{category?.name}</span>
                                </div>
                                <div className='flex items-center mb-2'>
                                    <FiTag className='text-gray-500 mr-2' />
                                    <span className='text-gray-700'>Quantity: {quantity}</span>
                                </div>
                                <div className='flex items-center mb-2'>
                                    <FaRupeeSign className='text-gray-500 mr-2' />
                                    <span className='text-gray-700'>{sale_price} PKR</span>
                                </div>
                                {/* <button className='w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'> */}
                                <button onClick={() => handleAddToCart(product)} className='flex items-center justify-center w-full text-white  bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 py-2 mt-4 transition-all'>
                                    <FiShoppingCart className='mr-2' />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    })}
            </div>

            {/* Pagination Controls */}
            <div className="flex mt-2 justify-center rounded-md shadow-sm m-auto" role="group">
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    onClick={() => {
                        dispatch(setPage(page - 1))
                        goToPrevPage()
                    }} disabled={currentPage === 1}
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium ${currentPage === i + 1 ? 'text-blue-700 bg-gray-200' : 'text-gray-900 bg-white'} border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
                        onClick={() => {
                            dispatch(setPage(i + 1))
                            goToPage(i + 1)
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                    onClick={() => {
                        dispatch(setPage(page + 1))
                        goToNextPage()
                    }} disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <CartModal
                isOpen={isOpen}
                toggleModal={toggleModal}
            />
        </div>
    );
};

export default Sale;
