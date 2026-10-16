import React, { useEffect, useState } from 'react'
import { supabase } from '../../Supabase/Supabase'
const UserRegistration = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [photo, setPhoto] = useState("")
    const [password, setPassword] = useState("")
    const [departmentId, setDepartmentId] = useState(null)
    const [courseId, setCourseId] = useState(null)
    const [semesterId, setSemesterId] = useState(null)
    const [academicYearId, setAcademicYearId] = useState(null)
    const [departmentData, setDepartmentData] = useState([])
    const [courseData, setCourseData] = useState([])
    const [semesterData, setSemesterData] = useState([])
    const [academicYearData, setAcademicYearData] = useState([])



    const fetchDepartmentData = async () => {
        try {
            const { data, error } = await supabase.from("tbl_department").select("*")
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


    const fetchSemesterData = async () => {
        try {
            const { data, error } = await supabase.from("tbl_semester").select("*")
            console.log(data);
            setSemesterData(data)

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


    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({ email: email, password: password })
            if (error) {
                console.log(error)
                alert(error.message)
                return
            }
            const userId = data.user?.id

            if (!userId) {
                alert("User registration failed")
                return
            }

            const photoUrl = await uploadPhoto(userId)

            const { error: userError } = await supabase.from("tbl_user").insert([{
                id: userId,
                name: name,
                email: email,
                contact: contact,
                address: address,
                photo: photoUrl,
                password: password,
                course_id: courseId,
                semester_id: semesterId,
                academic_year_id: academicYearId
            }])


            if (userError) {
                console.error(userError)
                return
            }

            alert("User Registered Successfully")
            handleReset()

        } catch (error) {
            console.log(error);

        }
    }



    const uploadPhoto = async (userId) => {
        if (!photo) {
            return null
        }

        try {
            const extension = photo.name.split('.').pop()
            const fileName = `${userId}_${Date.now()}.${extension}`
            const filePath = `users/${fileName}`

            const { error } = await supabase.storage.from("user_photo").upload(filePath, photo, { upsert: false })

            if (error) {
                console.log(error)
                return null
            }

            const { data } = supabase.storage.from("user_photo").getPublicUrl(filePath)

            return data.publicUrl

        } catch (error) {
            console.error(error)
            return null
        }
    }

    useEffect(() => {
        fetchDepartmentData()
        fetchCourseData()
        fetchSemesterData()
        fetchAcademicYearData()
    }, [])


    return (
        <div>
            <table border={1} cellPadding={10} align='center'>
                <tr>
                    <td>Name</td>
                    <td><input type="text" onChange={(e) => setName(e.target.name)} /></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input type="email" onChange={(e) => setEmail(e.target.name)} /></td>
                </tr>
                <tr>
                    <td>Contact</td>
                    <td><input type="tel" onChange={(e) => setContact(e.target.name)} /></td>
                </tr>
                <tr>
                    <td>Department</td>
                    <td>
                        <select name="" id="" onChange={(e) => setDepartmentId(e.target.value)}>
                            <option value="">--Select Department--</option>
                            {departmentData.map((data, index) => (
                                <option key={data.id} value={data.id}>{data.department_name}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Course</td>
                    <td>
                        <select name="" id="" onChange={(e) => setCourseId(e.target.value)}>
                            <option value="" selected={departmentId == null}>--Select Course--</option>
                            {courseData.filter((data) => departmentId == data.department_id).map((data, index) => (
                                <option key={data.id} value={data.id}>{data.course_name}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Semester</td>
                    <td>
                        <select name="" id="" onChange={(e) => setSemesterId(e.target.value)}>
                            <option value="">--Select Semester--</option>
                            {semesterData.map((data, index) => (
                                <option key={data.id} value={data.id}>{data.semester}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Academic Year</td>
                    <td>
                        <select name="" id="" onChange={(e) => setAcademicYearId(e.target.value)}>
                            <option value="">--Select Year--</option>
                            {academicYearData.map((data, index) => (
                                <option key={data.id} value={data.id}>{data.academic_year}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>
                        <textarea name="" id="" onChange={(e) => setAddress(e.target.name)}></textarea>
                    </td>
                </tr>
                <tr>
                    <td>Photo</td>
                    <td>
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" onChange={(e) => setPassword(e.target.name)} /></td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'>
                        <button onClick={handleSubmit}>Submit</button>
                        <button>Reset</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default UserRegistration