import React from 'react'
import { Route, Routes } from 'react-router'
import AdminRoutes from '../AdminRoutes/AdminRoutes'
import GuestRoutes from '../GuestRoutes/GuestRoutes'
import UserRoutes from '../UserRoutes/UserRoutes'

const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<GuestRoutes />} />
                <Route path="user/*" element={<UserRoutes />} />
            </Routes>
        </div>
    )
}

export default MainRoutes