import React from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react'

const categories = ['All', 'Snacks', 'Drinks', 'Fresh Food', 'Electronics']
const sortOptions = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest']

const products = [
    { id: 1, name: 'Energy Bar', category: 'Snacks', price: 2.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Sparkling Water', category: 'Drinks', price: 1.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: 'Fresh Salad', category: 'Fresh Food', price: 5.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 4, name: 'Wireless Earbuds', category: 'Electronics', price: 49.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 5, name: 'Protein Shake', category: 'Drinks', price: 3.99, image: '/placeholder.svg?height=200&width=200' },
    { id: 6, name: 'Granola Bar', category: 'Snacks', price: 1.49, image: '/placeholder.svg?height=200&width=200' },
    // Add more products as needed
]

export default function ProductPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-indigo-900 text-white py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">KioskInventory Products</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar with filters */}
                    <aside className="w-full md:w-1/4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <Filter className="mr-2" size={20} />
                                Filters
                            </h2>
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">Categories</h3>
                                {categories.map((category) => (
                                    <div key={category} className="flex items-center mb-2">
                                        <input type="checkbox" id={category} className="mr-2" />
                                        <label htmlFor={category}>{category}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Price Range</h3>
                                <input type="range" className="w-full" min="0" max="100" />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>RS 0</span>
                                    <span>RS 100</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main content area */}
                    <div className="w-full md:w-3/4">
                        {/* Search and sort bar */}
                        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row justify-between items-center">
                            <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            </div>
                            <div className="relative">
                                <select className="appearance-none bg-white border rounded-lg pl-4 pr-10 py-2">
                                    {sortOptions.map((option) => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
                            </div>
                        </div>

                        {/* Product grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                        <p className="text-gray-600 mb-2">{product.category}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-indigo-600">Rs {product.price.toFixed(2)}</span>
                                            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">
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
                                <button className="px-3 py-2 rounded-lg border hover:bg-gray-100">
                                    <ChevronLeft size={20} />
                                </button>
                                {[1, 2, 3, 4, 5].map((page) => (
                                    <button
                                        key={page}
                                        className={`px-4 py-2 rounded-lg border ${page === 1 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button className="px-3 py-2 rounded-lg border hover:bg-gray-100">
                                    <ChevronRight size={20} />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}