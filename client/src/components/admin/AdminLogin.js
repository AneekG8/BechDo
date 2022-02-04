import { useState } from "react";
import axios from 'axios';
import './Admin.css'
import LandingNavbar from "../LandingNavbar/LandingNavbar";
const AdminLogin = (props) => {

    const [state,setState] = useState({
        email: 'admin@bechdo.com',
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
                window.location.assign('/admin/dashboard')
            })
            .catch( err => {
                setState( prevState => ({
                    ...prevState,
                    error: err.response.data.message
                }))
            })
    }

    return ( 
        <div className="">
            <LandingNavbar activeLink = "admin/login"/>

            <div className="vh-100 row p-0 m-0">
                <div className="col-4 d-none d-md-flex bg-secondary justify-content-center align-items-center" id="sideDisplay">
                    <h1 className="display-3" id="title"> Bech Do</h1>
                </div>

                <div className="col-12 col-md-8 d-flex justify-content-center align-items-center" id="login">
                    <div className="">
                        <h1 className="display-6 text-dark"> <b>Welcome Back Admin!</b> </h1>
                        <p className="text-secondary"> Enter your password below</p>
                        <hr className="w-100"/>
                        <form onSubmit={handleSubmit} className="d-block">
                            <div className="mb-2">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                                <input type="password" className="form-control-sm w-100" name="password" placeholder="password" onChange={handleInputChange}/>
                            </div>
                            <button className="btn btn-dark btn-sm w-100">login</button>
                        </form>
                        <p style={{color: "red"}}> {state.error}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AdminLogin;