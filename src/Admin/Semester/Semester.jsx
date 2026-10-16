import React, { useEffect, useState } from 'react'
import { supabase } from '../../Supabase/Supabase'

const Semester = () => {
    const [semester, setSemester] = useState("")
    const [semesterData, setSemesterData] = useState([])
    const [editId, setEditId] = useState(null)


    const handleSubmit = async () => {
        try {
            if (editId) {
                const { data, error } = await supabase.from("tbl_semester").update({ "semester": semester }).eq('id', editId)
                if (error) {
                    console.log(error);
                    return
                }
                alert("Semester Updated Successfully...")
                setSemester("")
                setEditId(null)
                fetchSemesterData()
            } else {
                const { data, error } = await supabase.from("tbl_semester").insert({ "semester": semester })
                if (error) {
                    console.log(error);
                    return
                }
                alert("Semester Inserted Successfully...")
                setSemester("")
                fetchSemesterData()
            }

        } catch (error) {
            console.log(error);

        }
    }



    const fetchSemesterData = async () => {
        try {
            const { data, error } = await supabase.from("tbl_semester").select("*")
            console.log(data);
            setSemesterData(data)

        } catch (error) {
            console.log(error);

        }
    }


    const handleDelete = async (did) => {
        try {
            const { data, error } = await supabase.from("tbl_semester").delete().eq('id', did)
            if (error) {
                console.log(error);
                return
            }
            alert("Semester Deleted Successfully...")
            fetchSemesterData()
        } catch (error) {
            console.log(error);

        }
    }


    const handleEdit = async (data) => {
        setEditId(data.id)
        setSemester(data.semester)
    }




    useEffect(() => {
        fetchSemesterData()
    }, [])


    return (
        <div>
            <table border={1} align='center'>
                <tr>
                    <td>Semester</td>
                    <td><input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} /></td>
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
                    <td>Semester</td>
                    <td>Action</td>
                </tr>
                {semesterData.map((data, index) => (
                    <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.semester}</td>
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

export default Semester