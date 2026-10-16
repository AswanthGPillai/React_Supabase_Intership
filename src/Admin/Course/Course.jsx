import React, { useEffect, useState } from 'react'
import { supabase } from '../../Supabase/Supabase'

const Course = () => {
    const [departmentId, setDepartmentId] = useState(null)
    const [departmentData, setDepartmentData] = useState([])
    const [courseData, setCourseData] = useState([])
    const [courseName, setCourseName] = useState("")
    const [editId, setEditId] = useState(null)

    const handleSubmit = async () => {
        try {
            if (editId) {
                const { data, error } = await supabase.from("tbl_course").update({ "course_name": courseName, "department_id": departmentId }).eq("id", editId)
                if (error) {
                    console.log(error);
                    return
                }
                alert("Course Updated Successfully...")
                setCourseName("")
                setEditId(null)
                setDepartmentId(null)
                fetchCourseData()
            } else {
                const { data, error } = await supabase.from("tbl_course").insert({ "course_name": courseName, "department_id": departmentId })
                if (error) {
                    console.log(error);
                    return
                }
                alert("Course Inserted Successfully...")
                setCourseName("")
                setDepartmentId(null)
                fetchCourseData()
            }

        } catch (error) {
            console.log(error)

        }
    }

    const fetchDepartmentData = async () => {
        try {
            const { data, error } = await supabase.from("tbl_department").select()
            console.log(data);
            setDepartmentData(data)

        } catch (error) {
            console.log(error);

        }
    }


    const fetchCourseData = async () => {
        try {
            const { data, error } = await supabase.from("tbl_course").select("*,tbl_department(department_name)")
            console.log(data);
            setCourseData(data)
        } catch (error) {
            console.log(error);

        }
    }


    const handleDelete = async (did) => {
        try {
            const { data, error } = await supabase.from("tbl_course").delete().eq('id', did)
            if (error) {
                console.log(error);
                return
            }
            alert("Place Deleted Successfully...")
            fetchCourseData()


        } catch (error) {
            console.log(error);

        }
    }


    const handleEdit = async (data) => {
        setEditId(data.id)
        setDepartmentId(data.department_id)
        setCourseName(data.course_name)
    }

    useEffect(() => {
        fetchDepartmentData();
        fetchCourseData()
    }, []);
    return (
        <div>
            <table border={1} cellPadding={10} align='center'>
                <tr>
                    <td>Department</td>
                    <td>
                        <select name="sel_department" id="" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                            <option value="" selected={departmentId == null}>--Select Department--</option>
                            {
                                departmentData.map((data, index) => (
                                    <option key={data.id} value={data.id}>{data.department_name}</option>
                                ))
                            }
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Course</td>
                    <td><input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} /></td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'>
                        <button onClick={handleSubmit}>Submit</button>
                    </td>
                </tr>
            </table>
            <br /><br />
            <table border={1} cellPadding={10} align='center'>
                <tr>
                    <td>Sl.No</td>
                    <td>Course</td>
                    <td>Department</td>
                    <td>Action</td>
                </tr>
                {courseData.map((data, index) => (
                    <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.course_name}</td>
                        <td>{data.tbl_department.department_name}</td>
                        <td>
                            <button onClick={() => handleEdit(data)}>Edit</button>
                            <button onClick={() => handleDelete(data.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Course