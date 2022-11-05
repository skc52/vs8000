import {LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_FAIL, REGISTER_REQUEST
    , REGISTER_SUCCESS, LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS
    ,UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET,
    CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_RESET,
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS,
    UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS,
    DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS ,
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    ACTIVATE_SUCCESS, ACTIVATE_FAIL, ACTIVATE_REQUEST
} from "../constants/userConstants";
import axios from 'axios';





//REGISTER
export const register = (name, email, password) => async(dispatch) => {
    try {
        dispatch({type:REGISTER_REQUEST});
       
        const config = {headers:{"Content-Type":"application/json"},  withCredentials: true};
        
        const {data} = await axios.post(
            `http://localhost:4000/api/v1/register`,
            {name, email, password},
            config
        )

        await axios.post(
            `http://localhost:4000/api/v1/account/sendactivate`,
            {email},
            config
        )
        console.log(data.user)
        dispatch({type:REGISTER_SUCCESS, payload:data.user})

    } catch (error) {
        // console.log(error.response.data.error)
        dispatch({type:REGISTER_FAIL, payload:error.response.data.error});
    }
}




export const activate = (token) => async(dispatch)=>{
    try {
        console.log("acti")
        dispatch({type:ACTIVATE_REQUEST});
        const {data} = await axios.put(
            `http://localhost:4000/api/v1/account/activate/${token}`,
        )

        dispatch({type:ACTIVATE_SUCCESS, payload:data.user});


    } catch (error) {
        dispatch({type:ACTIVATE_FAIL,payload:error.response.data.error });
    }
}

//LOGIN
export const login = (email, password) => async(dispatch)=>{
    try {
        console.log("login")
        dispatch({type:LOGIN_REQUEST});
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        const {data} = await axios.post(
            `http://localhost:4000/api/v1/login`,
            {email, password},
            config,
           
        )

        console.log(data.user)
        dispatch({type:LOGIN_SUCCESS, payload:data.user})

    } catch (error) {
        console.log(error);
        dispatch({type:LOGIN_FAIL, payload:error.response.data.error});
    }
}

// LOGOUT
export const logout = () => async(dispatch) => {
    try {
        const config = {  withCredentials: true};
        await axios.get(`http://localhost:4000/api/v1/logout`, config);
        dispatch({type:LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({type:LOGOUT_FAIL, payload:error.response.data.error});
    }
}



export const clearErrors = ()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}


export const forgotPassword = (email) => async (dispatch)=> {
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const config = {headers:{"Content-type":"application/json"}};
        const {data} = await axios.post(`http://localhost:4000/api/v1/password/forgot`, {email}, config);
        dispatch({type:FORGOT_PASSWORD_SUCCESS, payload:data.message});
    } catch (error) {

        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.response.data.error
        })
        
    }
}

export const resetPassword = (token, password) => async (dispatch)=> {
    try {
        dispatch({type:RESET_PASSWORD_REQUEST});
        const config = {headers:{"Content-type":"application/json"}};
        console.log(password)
        const {data} = await axios.put(`http://localhost:4000/api/v1/password/reset/${token}`, {password}, config);
        dispatch({type:RESET_PASSWORD_SUCCESS, payload:data.success});
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.error
        })        
    }
}