import React, { useEffect, useState } from 'react'
import { supabase } from '../../Supabase/Supabase';
import { useNavigate } from 'react-router';

const EditProfile = () => {
  const uid = sessionStorage.getItem('uid');
  const [userData, setUserData] = useState({})
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")
  console.log(userData);

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.from('tbl_user').select("*,tbl_course(course_name,tbl_department(department_name)),tbl_academic_year(academic_year),tbl_semester(semester)").eq('id', uid).single();

      if (error) {
        console.error(error);
        return;
      }
      setUserData(data)
      setName(data.name)
      setContact(data.contact)
      setAddress(data.address)
      console.log(data);

    } catch (error) {
      console.log(error);

    }
  }


  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("tbl_user").update({ "name": name, "contact": contact, "address": address }).eq('id',uid)
      if(error){
        console.log(error);
        return
      }
      alert("Updated Successfully...")
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div>
      <table border={1} cellPadding={10} align='center'>
        <tr>
          <td>Name</td>
          <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Contact</td>
          <td><input type="text" value={contact} onChange={(e) => setContact(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Address</td>
          <td>
            <textarea name="" id="" value={address} onChange={(e) =>
              setAddress(e.target.value)}></textarea>
          </td>
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

export default EditProfile