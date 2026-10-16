import React, { useEffect, useState } from 'react'
import { supabase } from '../../Supabase/Supabase'

const AcademicYear = () => {
    const [academicYear, setAcademicYear] = useState("")
    const [academicYearData, setAcademicYearData] = useState([])
    const [editId, setEditId] = useState(null)


    const handleSubmit = async () => {
        try {
            if (editId) {
                const { data, error } = await supabase.from("tbl_academic_year").update({ "academic_year": academicYear }).eq('id', editId)
                if (error) {
                    console.log(error);
                    return
                }
                alert("Academic Year Updated Successfully...")
                setAcademicYear("")
                setEditId(null)
                fetchAcademicYearData()
            } else {
                const { data, error } = await supabase.from("tbl_academic_year").insert({ "academic_year": academicYear })
                if (error) {
                    console.log(error);
                    return
                }
                alert("Academic Year Inserted Successfully...")
                setAcademicYear("")
                fetchAcademicYearData()
            }

        } catch (error) {
            console.log(error);

        }
    }



    const fetchAcademicYearData = async () => {
        try {
            const { data, error } = await supabase.from("tbl_academic_year").select("*")
            console.log(data);
            setAcademicYearData(data)

        } catch (error) {
            console.log(error);

        }
    }


    const handleDelete = async (did) => {
        try {
            const { data, error } = await supabase.from("tbl_academic_year").delete().eq('id', did)
            if (error) {
                console.log(error);
                return
            }
            alert("Academic Year Deleted Successfully...")
            fetchAcademicYearData()
        } catch (error) {
            console.log(error);

        }
    }


    const handleEdit = async (data) => {
        setEditId(data.id)
        setAcademicYear(data.academic_year)
    }




    useEffect(() => {
        fetchAcademicYearData()
    }, [])


    return (
        <div>
            <table border={1} align='center'>
                <tr>
                    <td>Academic Year</td>
                    <td><input type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} /></td>
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
                    <td>Academic Year</td>
                    <td>Action</td>
                </tr>
                {academicYearData.map((data, index) => (
                    <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.academic_year}</td>
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

export default AcademicYear