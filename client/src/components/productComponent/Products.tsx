import { Product } from '@/types/Product'
import React from 'react'
import imageComingSoon from '../../assets/image-coming-soon.jpg';

interface Props {
    products: Product[]
    handleAddToCart: (p: Product) => void
}
const Products = ({ products, handleAddToCart }: Props) => {
    return (
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
        </div>)
}

export default Products