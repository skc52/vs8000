import React, { useState, useEffect} from 'react'
import {Container, Paper, TextField, Button ,Grid, Typography,InputAdornment, IconButton} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibility';
import LockResetIcon from '@mui/icons-material/LockReset';


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

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword =() => setShowPassword(!showPassword);

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
           <Container component='main' maxWidth='xs'>
                <Paper elevation={3} className="flex-col align-middle p-10">
                    <div className='p-[20px] mb-[20px] text-center'>
                        <LockResetIcon/>
                        <Typography>Reset Password</Typography>
                    </div>

                    <form  encType = "multipart/form-data" onSubmit={resetPasswordSubmit} >
                    <Grid container spacing={2} className='gap-[30px]'>
                    <TextField label="New Password" name="password" id="pw" type={showPassword ?"text":"password" }value={newPassword} fullWidth autoFocus onChange = {(e)=>setNewPassword(e.target.value)} 
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword?<VisibilityIcon/> :<VisibilityOffIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}                  
                    />   

                    <TextField label="Confirm Password" type="password" value={confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)} required fullWidth/>

                    <Button onClick={resetPasswordSubmit} className='text-white bg-blue-700 rounded-lg normal-case'>Reset Password</Button>


                    </Grid>
                    </form>
                </Paper>
           </Container>

       )
}

export default Reset