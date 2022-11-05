import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  logout } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutUser(){
    alert("dencioe")
    dispatch(logout());
    navigate("/");
}
  return (
    <div>
      Home

     <button onClick={()=>{logoutUser()}}>Logout</button>
    </div>
    
  )
}

export default Home
