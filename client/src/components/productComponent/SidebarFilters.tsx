import React from 'react'
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Filter } from '../../assets/icons';
import { Category } from '@/types/Category';
import { ProductsExtraInfo } from '@/types/Product';
interface Props {
    categories: Category[]
    filteredOptions: { category: Category | null, priceRange: number | null }
    setFilteredOptions: (prevState: any) => void
    extraInfo: ProductsExtraInfo
    resetFilters: () => void
    applyFilters: () => void
    handleRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const SidebarFilters = ({ filteredOptions, applyFilters, resetFilters, handleRangeChange, extraInfo, setFilteredOptions, categories }: Props) => {
    return (
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
        </aside>)
}

export default SidebarFilters