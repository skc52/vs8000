
import './App.css';
import Header from "./component/layout/Header.js"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./component/Home/Home"
import SignUpIn from './component/Authentication/SignUpIn';
import Profile from './component/Profile/Profile';
import Chat from './component/Chat/Chat.js'
import Notification from './component/Notification/Notification.js'
import Activate from "./component/Authentication/Activate.js"
import Welcome from "./component/Welcome/Welcome.js"
import ResetPw from "./component/Authentication/ResetPw.js"
import ForgotPw from  "./component/Authentication/ForgotPw.js"
import { useSelector } from 'react-redux';
import CheckActivate from './component/Authentication/CheckActivate';

function App() {



  const {isAuthenticated, user} = useSelector(state=>state.user)
  return (
   <div>
      
    <BrowserRouter>
    {/* <Header/> */}
      <Routes>
      <Route exact path = '/' element = {<Welcome/>}/>
    <Route exact path = '/home' element = {<Home/>}/>
       <Route exact path = '/checkActivate' element = {<CheckActivate/>}/>
        <Route exact path = '/signin' element = {<SignUpIn/>}/>
        <Route exact path = '/profile/me' element = {<Profile/>}/>
        <Route exact path = '/chat' element = {<Chat/>}/>
        <Route exact path = '/notification' element = {<Notification/>}/>
        <Route exact path = '/api/v1/account/activate/:token' element = {<Activate/>}/>
        <Route exact path = '/api/v1/password/forgot/' element = {<ForgotPw/>}/>
        <Route exact path = '/api/v1/password/reset/:token' element = {<ResetPw/>}/>

      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App;
