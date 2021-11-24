import { Redirect } from "react-router";
import {useState,useEffect} from 'react';
import axios from "axios";
import Loading from "../Loading/Loading";

const RestrictedRoute = (props) => {
    const [state,setState] = useState({
        isLoading: true,
        isAuth: false,
        user: null,
        message: ''
    })

    useEffect(()=>{
        axios.get('/api/auth/login')
            .then( res => {
                setState({
                    isAuth: res.data.isAuth,
                    user: res.data.user,
                    message: '',
                    isLoading: false
                })
            })
            .catch( err =>{
                setState({
                    isAuth: err.response.data.isAuth,
                    user: null,
                    message: err.response.data.message,
                    isLoading: false
                })
            })
    },[])
    
    return (  
        <div>
            {
                state.isLoading ? <Loading/> :
                state.isAuth ? <>{state.user.role === 'admin' ? <Redirect to={`/admin/dashboard`}/> : <Redirect to={`/home`}/>}</> :
                props.children          
            }
        </div>
    );
}
 
export default RestrictedRoute;