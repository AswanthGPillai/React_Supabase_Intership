import React from 'react'
import MyProfile from '../../User/MyProfile/MyProfile'
import EditProfile from '../../User/EditProfile/EditProfile'
import { Route, Routes } from 'react-router'
import ChangePassword from '../../User/ChangePassword/ChangePassword'

const UserRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/changepassword" element={<ChangePassword />} />
            </Routes>
        </div>
    )
}

export default UserRoutes