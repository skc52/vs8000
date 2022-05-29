import React, {useState} from 'react'
import "./Register.css"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {setDoc, doc, Timestamp} from "firebase/firestore"
import { auth, db } from '../firebase'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const [data, setData] = useState({
        name:'',
        email:'',
        password:'',
        error:null,
        loading:false,
    })
    const navigate = useNavigate();
    const {name, email, password, error, loading} = data;
    const handleChange = (e) =>{
        setData({...data, [e.target.name]:e.target.value});
    }
    const handleSubmit = async e =>{
        e.preventDefault();
        setData({...data, error:null, loading:true});
        if (!name || !email || !password){
            setData({...data, error: "All fields are required!"});
        }

        try{
            const result = await createUserWithEmailAndPassword(auth, email, password);
            console.log(result.user);
            await setDoc(doc(db, 'users', result.user.uid), {
                uid:result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline:true,
            });
            setData({name:'', email:'', password:'', error:null, loading:false})
            navigate("/");
        } catch (err){
            setData({...data, error:err.message, loading:false})
        }
        
        console.log(data);

    }
  return (
    <section>
        <h3>Create an Account</h3>
        <form className='form' onSubmit={handleSubmit}>
            <div className="input-container">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="" value = {name} onChange = {handleChange} />
            </div>
            <div className="input-container">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="" value = {email} onChange = {handleChange} />
            </div>
            <div className="input-container">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" value = {password} onChange = {handleChange} />
            </div> 
            {error? <p className='error'>{error}</p>: null}
            <div className="button-container">
                <button className='btn' disabled= {loading}>
                {loading?'Creating your account...':'Register'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default Register