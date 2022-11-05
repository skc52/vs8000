import React, { useState, useEffect} from 'react'

import {MailOutlineOutlined, LockOpenIcon, VPNKey, Lock} from "@mui/icons-material";
import {FaLockOpen, FaEnvelope, FaSmile, FaLock, FaUserLock} from "react-icons/fa"
import { useNavigate , useParams} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword} from '../../actions/userActions';
import { CHANGE_PASSWORD_RESET } from '../../constants/userConstants';
const Reset = () => {
    const dispatch = useDispatch();
    const {error, success, isLoading} = useSelector(state=>state.forgotPw);
    const navigate = useNavigate();
    const {token} = useParams();

    

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        e.preventDefault();
       
        if (newPassword == confirmPassword){
            dispatch( resetPassword(token,newPassword));
        }
        else{
            alert("Password no match")
        }
        
    }


    
    useEffect(()=>{

        
        if(error){
            console.log(error);
            
            dispatch(clearErrors)
        }

        if (success){
          
           
            navigate("/signin");
            
            
        }
    },[dispatch, error, success])
    return (

        <>
           
            
             <div className="resetPasswordContainer">
                 <div className="resetPasswordBox">
                     <h2 className='resetPasswordHeading'>Reset Password</h2>
                 <form className='resetPasswordForm' encType = "multipart/form-data" onSubmit={resetPasswordSubmit} >
                             
         
                             
                       
                        <div className="resetPassword">
                                    {/* <LockOpenIcon/> */}
                                    <FaLockOpen/>
                                    <input
                                        type = "password"
                                        placeholder='New Password'
                                        required
                                        value={newPassword}
                                        onChange = {(e)=>setNewPassword(e.target.value)}
                                    />
                        </div>
                        <div className="resetPassword">
                                    {/* <LockOpenIcon/> */}
                                    <Lock/>
                                    <input
                                        type = "password"
                                        placeholder='Confirm Password'
                                        required
                                        value={confirmPassword}
                                        onChange = {(e)=>setConfirmPassword(e.target.value)}
                                    />
                        </div>
                             <input type="submit" value="Reset" className='resetPasswordBtn' 
                             /*disabled = {isLoading? true:false}*/ />
                         </form>
                 </div>
             </div>
             
        </>
       )
}

export default Reset