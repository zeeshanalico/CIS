import React from 'react'

const Card = ({children}: {children: React.ReactNode}) => {
  return (
        <div className="overflow-x-auto scrollbar-style shadow-md bg-white rounded-sm flex flex-col mt-4">
            {children}
        </div>
    )
}

export default Card