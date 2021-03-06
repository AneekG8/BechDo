import { Redirect } from "react-router";
import {useState,useEffect,cloneElement} from 'react';
import axios from "axios";
import Loading from "../Loading/Loading";

const PrivateRoute = (props) => {
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
                console.log(err.response)
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
                state.isAuth && state.user.role !== 'admin' ?  cloneElement(props.children,{user: state.user})  :
                <Redirect to={`/login`}/>
            }
        </div>
    );
}
 
export default PrivateRoute;