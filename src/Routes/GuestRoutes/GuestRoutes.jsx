import React from 'react'
import { Route, Routes } from 'react-router'
import UserRegistration from '../../Guest/UserRegistration/UserRegistration'
import Login from '../../Guest/Login/Login'

const GuestRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/userregistration" element={<UserRegistration />} />
            </Routes>
        </div>
    )
}

export default GuestRoutes