import React from 'react'
import { FaExclamationCircle } from '../../assets/icons'
const NoEntriesAvailable = ({ text }: { text?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <FaExclamationCircle className="text-4xl mb-2" />
            <p className="text-lg">{text ?? "No Entries Available"}</p>
        </div>)
}

export default NoEntriesAvailable