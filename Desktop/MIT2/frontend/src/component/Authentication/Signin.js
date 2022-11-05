import React, {useState} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  login, register } from '../../actions/userActions';

const Signin = () => {
  const dispatch = useDispatch();


  //state values for login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //state values for register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  //submit handler for login
  const loginSubmit = (e) => {
    e.preventDefault()
    alert("login")
    dispatch(login(loginEmail, loginPassword));
  }

  //submit handler for sign up
  const registerSubmit = (e) => {
    e.preventDefault();
    if (pw != cpw){
      alert("Password do not match");
    }
    else{
      dispatch(register(name, email, pw));
    }
   
}

  return (
    <div>
      {/* login form */}
        <form action="" onSubmit={loginSubmit}>
          <label htmlFor="lemail">Email</label>
          <input type="email" name="email" id="lemail" onChange={(e)=>{setLoginEmail(e.target.value)}}/>
          <br />
          <label htmlFor="lpw">Password</label>
          <input type="password" name="password" id="lpw"  onChange={(e)=>{setLoginPassword(e.target.value)}}/>
          <br />
          <input type="submit" value="loginbtn" />
        </form>

        <br />
    {/* sign up form */}
        <form action="" onSubmit={registerSubmit}>
          <label htmlFor="">Name</label>
          <input type="text" name="name" id="name" onChange={(e)=>{setName(e.target.value)}}/>
          <br />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>
          <br />
          <label htmlFor="pw">Password</label>
          <input type="password" name="password" id="pw" onChange={(e)=>{setPw(e.target.value)}}/>
          <br />
          <label htmlFor="cpw">Confirm</label>
          <input type="password" name="cpassword" id="cpw"  onChange={(e)=>{setCpw(e.target.value)}}/>
          <br />
          <input type="submit" value="Register" className='signUpBtn' 
                        /*disabled = {isLoading? true:false}*/ />
        </form>



    </div>
  )
}

export default Signin
