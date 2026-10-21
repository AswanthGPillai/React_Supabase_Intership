import React, { useEffect, useState } from 'react'
import { supabase } from '../../Supabase/Supabase';
import { useNavigate } from 'react-router';

const MyProfile = () => {
    const uid = sessionStorage.getItem('uid');
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    console.log(userData);

    const fetchUser = async () => {
        try {
            const { data, error } = await supabase.from('tbl_user').select("*,tbl_course(course_name,tbl_department(department_name)),tbl_academic_year(academic_year),tbl_semester(semester)").eq('id', uid).single();

            if (error) {
                console.error(error);
                return;
            }
            setUserData(data)
            console.log(data);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td align='center' colSpan={2}>
                       <img src={userData.photo} alt="" width={150} height={150}/>
                    </td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{userData.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{userData.email}</td>
                </tr>
                <tr>
                    <td>Contact</td>
                    <td>{userData.contact}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{userData.address}</td>
                </tr>
                <tr>
                    <td>Course</td>
                    <td>{userData.tbl_course?.course_name}</td>
                </tr>
                <tr>
                    <td>Department</td>
                    <td>{userData.tbl_course?.tbl_department?.department_name}</td>
                </tr>
                <tr>
                    <td>Semester</td>
                    <td>{userData.tbl_semester?.semester}</td>
                </tr>
                <tr>
                    <td>Academic Year</td>
                    <td>{userData.tbl_academic_year?.academic_year}</td>
                </tr>


                <tr>
                    <td align='center' colSpan={2}>
                        <button onClick={()=>navigate('/user/editprofile')}>Edit Profile</button>
                        <button onClick={()=>navigate('/user/changepassword')}>Change Password</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default MyProfile