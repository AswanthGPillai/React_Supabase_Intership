import React, { useState } from 'react'
import { supabase } from '../../Supabase/Supabase'
import { useNavigate } from 'react-router'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password })
      if (error) {
        console.log(error);
        return
      }
      console.log(data);
      const { data: userData } = await supabase.from('tbl_user').select('*').eq('id', data.user.id).single();
      console.log(userData);
      sessionStorage.setItem('uid', data.user.id);
      alert('Login successful');
      alert(`Welcome ,${userData.name}`);
      navigate('/user/myprofile');

    } catch (error) {
      console.log(error);

    }
  }


  return (
    <div>
      <table border={1} cellPadding={10} align='center'>
        <tr>
          <td>Email</td>
          <td><input type="email" onChange={(e) => setEmail(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Password</td>
          <td><input type="password" onChange={(e) => setPassword(e.target.value)} /></td>
        </tr>
        <tr>
          <td colSpan={2} align='center'>
            <button onClick={handleLogin}>Login</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Login