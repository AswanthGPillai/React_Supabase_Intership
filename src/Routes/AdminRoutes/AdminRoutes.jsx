import React from 'react'
import Department from '../../Admin/Department/Department'
import { Route, Routes } from 'react-router'
import Course from '../../Admin/Course/Course'
import Semester from '../../Admin/Semester/Semester'
import AcademicYear from '../../Admin/AcademicYear/AcademicYear'

const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/department" element={<Department />} />
                <Route path="/course" element={<Course />} />
                <Route path="/semester" element={<Semester />} />
                <Route path="/academicyear" element={<AcademicYear />} />
            </Routes>
        </div>
    )
}

export default AdminRoutes