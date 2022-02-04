import { useState } from "react";
import axios from 'axios'
import EmailVerification from "./EmailVerification";
import UpdatePassword from "./UpdatePassword";
import LandingNavbar from "../LandingNavbar/LandingNavbar";

const ChangePassword = () => {

    const initalState = {
        loading: false,
        email: {
            value: '',
            error: '',
            verifying: false,
            verified: false
        },
        password: {
            value: '',
            error: '',
            updated: false
        }
    }

    const [state,setState] = useState(initalState)

    const handleInputChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: {
                ...prevState[e.target.name],
                value: e.target.value,
                error: ''
            }
        }))
    }

    const check = async ()=>{
        const res = await axios.get('/api/auth/signup/email_verification',{withCredentials: true});
        return res.data.verified;
    }

    const emailVerificationSubmit = (e)=>{
        e.preventDefault()

        setState(prevState => ({
            ...prevState,
            loading: true,
            email: {
                ...prevState.email,
                error: ''
            }
        }))

        axios.post('/api/auth/change_password/email_verification',{
            email: state.email.value
        })
        .then( async res =>  {
            setState(prevState => ({
                ...prevState,
                loading: false,
                email: {
                    ...prevState.email,
                    verifying: true,
                }
            }))
            const t = Date.now()

            while(1){
                const verified = await check();
                if(verified)
                {
                    console.log('verified')
                    setState(prevState => ({
                        ...prevState,
                        email: {
                            ...prevState.email,
                            verifying: false,
                            verified: true
                        }
                    }))
                    break;
                }
                if( Date.now() > t+60*1000){
                    setState(initalState)
                    break;
                }
                    
            }
        })
        .catch(err => {
            console.log(err.response.data)
            setState(prevState => ({
                ...prevState,
                loading: false,
                email: {
                    ...prevState.email,
                    error: err.response.data.message
                }
            }))
        })
    }

    const updatePasswordSubmit = (e)=>{

        e.preventDefault()

        setState(prevState => ({
            ...prevState,
            loading: true,
            password: {
                ...prevState.password,
                error: ''
            }
        }))

        axios.post('/api/auth/change_password',{
            email: state.email.value,
            password: state.password.value
        })
        .then( res => {
            setState(prevState => ({
                ...prevState,
                loading: false,
                password: {
                    ...prevState.password,
                    updated: true
                }
            }))
            setTimeout(()=>{
                window.location.assign('/login')
            },1000)
        })
        .catch( err => {
            setState(prevState => ({
                ...prevState,
                loading: false,
                password: {
                    ...prevState.password,
                    error: err.response.data.message
                }
            }))
        })
    }


    return ( 
        <div className="" id="login">
            
            <LandingNavbar/>

            <div className="vh-100 row p-0 m-0">

                <div className="col-4 d-none d-md-flex justify-content-center align-items-center" id="sideDisplay">
                    <h1 className="display-3" id="title"> Bech Do</h1>
                </div>

                <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
                    {
                        !state.password.updated ?
                        <>
                        {
                            !state.email.verified ?
                            <>
                                {
                                    state.email.verifying ?
                                    <div className="text-secondary text-center display-5">
                                        Link Sent!
                                    </div>
                                    :
                                    <EmailVerification state={state} emailVerificationSubmit={emailVerificationSubmit} handleInputChange={handleInputChange}/>
                                }
                            </> 
                            :
                            <UpdatePassword updatePasswordSubmit={updatePasswordSubmit} state={state} handleInputChange={handleInputChange} />
                        }
                        </>
                        :
                        <div>
                            <div className="alert alert-success mb-3" role="alert">
                                Password updated successfully!
                            </div>
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="text-secondary">redirecting to the login page...</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
     );
}
 
export default ChangePassword;