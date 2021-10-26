import { useState } from "react";
import axios from 'axios';
import {GoogleLogin} from 'react-google-login';


const Login = () => {
    const [state,setState] = useState({
                                    email: '',
                                    password: '',
                                    error: ''
                                })

    const handleInputChange = (e) => {
        setState({...state,[e.target.name]: e.target.value,error: ''})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('/api/auth/login',state)
            .then(res => {
                window.location.assign('/home')
            })
            .catch( err => {
                setState( prevState => ({
                    ...prevState,
                    error: err.response.data.message
                }))
            })
    }

    const googleSuccess = (response)=>{
        axios.post('/api/auth/login/oAuth',{email: response.profileObj.email})
            .then( res => {
                window.location.assign('/home')
            })
            .catch( err => {
                localStorage.setItem('profile',JSON.stringify(response.profileObj))
                window.location.assign(`/signup?strategy=oAuth`)
            })
    }

    const googleFailure = (res)=>{
        setState({...state,error: 'something went wrong!'})
    }
    return ( 
        <div className="">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid px-3">
                <a className="navbar-brand" href="/">BechDo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item mx-2">
                    <a className="nav-link" aria-current="page" href="/contact">Contact Us</a>
                    </li>
                    <li className="nav-item mx-2">
                    <a className="nav-link active" href="/login">Login</a>
                    </li>
                    <li className="nav-item mx-2">
                    <a className="nav-link" href="/signup">Sign up</a>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
            <div className="vh-100 row p-0 m-0">
            <div className="col-4 d-none d-md-flex bg-secondary justify-content-center align-items-center">
                <h1 className="display-3"> Bech Do</h1>
            </div>
            <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
                <div className="">
                <h1 className="display-6 text-secondary"> <b>Sign In </b> </h1>
                <p className="text-secondary"> Enter your details below</p>
                <GoogleLogin
                clientId='377277162164-d2sr05uf6kfs23uo3ga97cbvdim852c3.apps.googleusercontent.com'
                onSuccess = { googleSuccess }
                onFailure = { googleFailure }
                className = "w-100 mb-2 border"
                />

                <hr className="w-100"/>
                <form onSubmit={handleSubmit} className="d-block">
                    <div className="mb-2">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control-sm w-100" name="email" placeholder="name@example.com" onChange={handleInputChange}/>
                    </div>
                    <div className="mb-2">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password" className="form-control-sm w-100" name="password" placeholder="password" onChange={handleInputChange}/>
                    </div>
                    <button className="btn btn-primary btn-sm w-100">login</button>
                </form>
                <p className="w-100 my-2">
                    don't have an account? <a href="/signup">Sign up</a>
                </p>
                <p style={{color: "red"}}> {state.error}</p>
                </div>
            </div>
            </div>
        </div>
     );
}
 
export default Login;