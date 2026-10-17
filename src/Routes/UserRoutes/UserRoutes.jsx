import React from 'react'
import MyProfile from '../../User/MyProfile/MyProfile'
import EditProfile from '../../User/EditProfile/EditProfile'
import { Route, Routes } from 'react-router'

const UserRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/editprofile" element={<EditProfile />} />
            </Routes>
        </div>
    )
}

export default UserRoutes