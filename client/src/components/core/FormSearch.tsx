import React from 'react'
import { Button } from '../ui/button'
import { CiSearch } from 'react-icons/ci';

interface Prop {
    setSearchValue: (value: React.SetStateAction<string | null>) => void;
    searchValue: string | null;
    handleSearch: () => void

}
const FormSearch = ({ setSearchValue, searchValue, handleSearch }: Prop) => {
    return (
        <> <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <CiSearch className="h-6 w-6" />
            </span>
            <input
                name="search"
                type="search"
                value={searchValue || ''}
                className="flex h-10 pl-10 w-full bg-background px-3 focus:outline-none focus:border-black focus:border-2 text-sm ring-offset-background placeholder:text-muted-foreground"
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
            <Button className="rounded-none" onClick={handleSearch}>
                Search
            </Button></>
    )
}

export default FormSearch