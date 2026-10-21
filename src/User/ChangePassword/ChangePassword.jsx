import React, { useState } from 'react'
import { supabase } from '../../Supabase/Supabase';

const ChangePassword = () => {
    const uid = sessionStorage.getItem('uid');
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async () => {
        try {
            if (newPassword !== confirmPassword) {
                alert('New password and Confirm Password Does not Match...')
                return
            }

            const { error: authError } = await supabase.auth.signInWithPassword({ email: (await supabase.auth.getUser()).data.user.email, password: oldPassword });
            if (authError) {
                console.log(authError);
                alert("InCorrect Old Password...")
                return
            }

            const { error } = await supabase.auth.updateUser({ "password": newPassword })
            if (error) {
                console.log(error);
                alert('Update failed: ' + error.message);
                return;
            }

            // Update Password in the tbl_user

            // const { error: userTblErr } = await supabase.from("tbl_user").update({ "password": newPassword }).eq('id', uid)
            // if (userTblErr) {
            //     console.log(userTblErr);
            //     return
            // }

            alert('Password changed successfully');
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td>Old Password</td>
                    <td><input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>New Password</td>
                    <td><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Confirm Password</td>
                    <td><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></td>
                </tr>
                <tr>
                    <td align='center' colSpan={2}>
                        <button onClick={handleSubmit}>Submit</button>
                        <button>Reset</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default ChangePassword