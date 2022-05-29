import {createContext, useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Loading from '../components/Loading';

export const AuthContext = createContext();
 

const AuthProvider =({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {//this user is not the same as the state user
            //if logged in provides user else null
            setUser(user);
            setLoading(false);
        });
    },[]);
    if (loading){
        return <Loading/>;
    }
    return <AuthContext.Provider value = {
        {user}
    }>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider;