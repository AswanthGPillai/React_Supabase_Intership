import React from 'react'
import { Route, Routes } from 'react-router'
import AdminRoutes from '../AdminRoutes/AdminRoutes'
import GuestRoutes from '../GuestRoutes/GuestRoutes'

const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<GuestRoutes />} />
            </Routes>
        </div>
    )
}

export default MainRoutes