import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  clearErrors, login, register } from '../../actions/userActions';
import { Grid, Paper, Typography, TextField, Button, InputAdornment,IconButton,Container  } from '@mui/material';
import  LockRoundedIcon from '@mui/icons-material/LockRounded';
import  VisibilityIcon  from '@mui/icons-material/Visibility';
import  VisibilityOffIcon  from '@mui/icons-material/VisibilityOff';


const SignUpIn = () => {
  const dispatch = useDispatch();




  //state values for register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");

  //state if the user wants to register or sign in
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const switchMode = () => {
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword =() => setShowPassword(!showPassword);


    const navigate = useNavigate();

    const {error, isLoading, isAuthenticated, user } = useSelector(state => state.user);
    //handleSubmit for both logn and register
    const handleSubmit= (e) => {
        e.preventDefault();
        if(isSignUp){
            if(pw!=cpw){
                alert('Passwords do not match');
            }
            else{
                dispatch(register(name, email, pw));
            }
        }
        else{
            dispatch(login(email, pw));
            console.log(user.isActivated)
        }

        
    }

  
  

  useEffect(() => {
    
    if (error){
      alert(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated && user.isActivated){
      navigate("/home")
    }
    else if (isAuthenticated){
      navigate("/checkActivate")
    }
    
  }, [isAuthenticated, user, dispatch, error])
  

  return (
    <div>
      {/* login form */}
      <Container component="main" maxWidth='xs'>
        <Paper elevation={3} className="flex-col align-middle p-10">
            <div className='p-[20px] mb-[20px] text-center'>
                <LockRoundedIcon/>
                <Typography>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
            </div>

            <form action="" onSubmit={handleSubmit}>
                <Grid container spacing ={2} className='gap-[30px]'>
                    {
                        isSignUp &&(
                            <>
                                <TextField type="text" name="name" id="name" label="Name" autoFocus required fullWidth onChange={(e)=>{setName(e.target.value)}}/>

                            </>
                        )
                    }

                    <TextField label="Email" type="email" name="email" id="lemail" fullWidth autoFocus onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField label="Password" name="password" id="pw"  fullWidth onChange={(e)=>{setPw(e.target.value)}} type={showPassword ?"text":"password"}
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
          {/* <label htmlFor="lemail">Email</label>
          <input type="email" name="email" id="lemail" onChange={(e)=>{setLoginEmail(e.target.value)}}/>
          <br />
          <label htmlFor="lpw">Password</label>
          <input type="password" name="password" id="lpw"  onChange={(e)=>{setLoginPassword(e.target.value)}}/>
          <br />
          <input type="submit" value="loginbtn" /> */}
          {isSignUp && (
            <>
                <TextField label="Confirm Password" type="password" name="cpassword" id="cpw"  onChange={(e)=>{setCpw(e.target.value)}} required fullWidth/>
            </>
          )}
        </Grid>

        <div className='flex flex-col mt-16 gap-8 align-middle justify-center'>
            <Button onClick={handleSubmit} className='text-white bg-blue-700 rounded-lg normal-case'>{isSignUp ? 'Sign Up':'Sign In'}</Button>
            <Button onClick={switchMode} className='text-white bg-blue-700 rounded-lg normal-case'>{isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
    
        </div>
        </form>
        </Paper>
      </Container>
    </div>
  )
}
export default SignUpIn
