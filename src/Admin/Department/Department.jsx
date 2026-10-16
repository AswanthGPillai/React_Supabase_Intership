import React, { useEffect, useState } from 'react'
import { supabase } from '../../Supabase/Supabase'
import { data } from 'react-router'



const Department = () => {
    const [department, setDepartment] = useState("")
    const [departmentData, setDepartmentData] = useState([])
    const [editId, setEditId] = useState(null)


    const handleSubmit = async () => {
        try {
            if (editId) {
                const { data, error } = await supabase.from("tbl_department").update({ "department_name": department }).eq('id', editId)
                if (error) {
                    console.log(error);
                    return
                }
                alert("Department Updated Successfully...")
                setDepartment("")
                setEditId(null)
                fetchDepartmentData()
            } else {
                const { data, error } = await supabase.from("tbl_department").insert({ "department_name": department })
                if (error) {
                    console.log(error);
                    return
                }
                alert("Department Inserted Successfully...")
                setDepartment("")
                fetchDepartmentData()
            }

        } catch (error) {
            console.log(error);

        }
    }



    const fetchDepartmentData = async () => {
        try {
            const { data, error } = await supabase.from("tbl_department").select("*")
            console.log(data);
            setDepartmentData(data)

        } catch (error) {
            console.log(error);

        }
    }


    const handleDelete = async (did) => {
        try {
            const { data, error } = await supabase.from("tbl_department").delete().eq('id', did)
            if (error) {
                console.log(error);
                return
            }
            alert("Department Deleted Successfully...")
            fetchDepartmentData()
        } catch (error) {
            console.log(error);

        }
    }


    const handleEdit = async (data) => {
        setEditId(data.id)
        setDepartment(data.department_name)
    }




    useEffect(() => {
        fetchDepartmentData()
    }, [])


    return (
        <div>
            <table border={1} align='center'>
                <tr>
                    <td>Department</td>
                    <td><input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} /></td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'>
                        <button onClick={handleSubmit}>Submit</button>
                    </td>
                </tr>
            </table>
            <br />
            <table border={1} align='center'>
                <tr>
                    <td>Sl.No</td>
                    <td>Department</td>
                    <td>Action</td>
                </tr>
                {departmentData.map((data, index) => (
                    <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.department_name}</td>
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

export default Department