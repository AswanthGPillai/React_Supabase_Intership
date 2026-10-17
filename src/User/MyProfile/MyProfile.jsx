import React, { useEffect, useState } from 'react'
import { supabase } from '../../Supabase/Supabase';

const MyProfile = () => {
    const uid = sessionStorage.getItem('uid');
    const [userData,setUserData] = useState({})
    console.log(userData);
    
    const fetchUser = async () => {
        try {
            const { data, error } = await supabase.from('tbl_user').select("*").eq('id', uid).single();

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

    useEffect(()=>{
        fetchUser()
    },[])
    return (
        <div>
            <h1>Hi , {userData.name}</h1>
        </div>
    )
}

export default MyProfile