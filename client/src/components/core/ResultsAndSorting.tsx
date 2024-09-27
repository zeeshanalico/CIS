import React from 'react'

interface Prop {
    from: number
    to: number
    count: number
    limit: number
    selectedSort: string
    sortOptions: string[]
    handleLimitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    handleSelectedSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}
const ResultsAndSorting = ({ from, to, count, limit, selectedSort, sortOptions, handleLimitChange, handleSelectedSortChange, }: Prop) => {
    return (
        <div className="flex py-2 items-center w-full justify-between">
            <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{from}</span> to{' '}
                <span className="font-medium">{to}</span> of{' '}
                <span className="font-medium">{count}</span> results
            </p>

            <div className="flex space-x-4">
                <select
                    className="h-8 outline-none border border-gray-300 rounded"
                    onChange={handleLimitChange}
                    value={limit}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>

                <div className="relative">
                    <select
                        value={selectedSort}
                        onChange={handleSelectedSortChange}
                        className="h-8 outline-none border border-gray-300 rounded"
                    >
                        {sortOptions.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>)
}

export default ResultsAndSorting