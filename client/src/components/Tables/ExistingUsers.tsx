import React from 'react'
import { useGetAllUsersQuery } from '@/store/slices/userSlice/userApiSlice'
import { Kiosk } from '@/types/kiosk'

const ExistingUsers = () => {
    const { data } = useGetAllUsersQuery({})
    return (
        <div>

        </div>
    )
}

export default ExistingUsers