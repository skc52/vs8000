import React, {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./Navbar.css"
import {auth, db} from "../firebase"
import { signOut } from 'firebase/auth'
import { updateDoc, doc} from 'firebase/firestore'
import { AuthContext } from '../context/auth'


const Navbar = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async() =>{
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline:false  
        })
        await signOut(auth);
        navigate("/login");

    }
  return (
    <nav>
        <h3>
            {user && <Link to = '/'>Messenger</Link>}
        </h3>
        <div>
            {console.log(user)}
            {user ?
                <>
                    <Link to = '/profile'>Profile</Link>
                    <button className='btn' onClick={handleSignOut}>Log Out</button>
                </>
                :
                <>
                    <Link to = '/register'>Register</Link>
                    <Link to = '/login'>Login</Link>
                </>
            }
            
        </div>
    </nav>
  )
}

export default Navbar