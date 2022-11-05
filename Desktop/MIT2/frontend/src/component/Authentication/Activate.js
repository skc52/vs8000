import React, {useEffect} from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  activate, clearErrors } from '../../actions/userActions';
const Activate = () => {
    const dispatch = useDispatch();
    const {token} = useParams();
    const navigate = useNavigate();

    const {error, success, isLoading, isActivated} = useSelector(state=>state.user);

    useEffect(()=>{
        dispatch(activate(token));
    }, [])

    useEffect(()=>{
       

        if (error){
            dispatch(clearErrors);
            navigate("/signin")
        }

        if (success){
            navigate("/home");
        }

    }, [dispatch, error, success])
  return (
    <div>Activate</div>
  )
}

export default Activate