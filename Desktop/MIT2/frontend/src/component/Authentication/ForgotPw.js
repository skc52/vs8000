import React, {useState} from 'react';
import {Container, Paper, TextField, Button ,Grid, Typography,InputAdornment, IconButton} from '@mui/material'
import PinIcon from '@mui/icons-material/Pin';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  forgotPassword } from '../../actions/userActions';


const ForgotPw = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();


    const forgotHandler = (e) => {
        e.preventDefault();
        console.log("dwdwdw")
        dispatch(forgotPassword(email));
    }

  return (


        <Container component='main' maxWidth='xs'>
            <Paper elevation={3} className="flex-col align-middle p-10">
                <div className='p-[20px] mb-[20px] text-center'>
                    <PinIcon/>
                    <Typography>Forgot Password</Typography>
                </div>
                <form action="" onSubmit={forgotHandler}>

                    <Grid container spacing={2} className='gap-[30px]'>
                        <TextField label="Email" name='email' required fullWidth autoFocus onChange={(e)=>setEmail(e.target.value)}/>
                        <Button fullWidth onClick={forgotHandler} className="text-white bg-blue-700 rounded-lg normal-case">Reset Password</Button>
                    </Grid>

                </form>
            </Paper>

               {/* Did you forget?
        <form action="" onSubmit={forgotHandler}>
            <label htmlFor="femail">Email</label>
            <input type="email" name="email" id="femail" onChange={(e)=>setEmail(e.target.value)} />
            <br />
            <input type="submit" value="send" />
        </form> */}
        </Container>
     
  )
}

export default ForgotPw