import { useState } from "react";
import Contact from "./Contact";
import Details from "./Details";
import Email from "./Email";
import Starting from "./Starting";
import axios from 'axios';
import { useLocation } from "react-router";
import './Signup.css'
import Finishing from "./Finishing";

const Signup = () => {

    const location = useLocation();

    const params = new URLSearchParams(location.search.slice(1));

    const strategy = params.get('strategy') ||'local';
    console.log(strategy)

    const LOCAL = strategy === 'local';

    const avatar = LOCAL ? '' : JSON.parse(localStorage.getItem('profile')).imageUrl

    const initState = {
        loading: false,
        started: false,
        details: false,
        contact: false,
        verified: LOCAL ? false : true,
        verifying: false,
        email: LOCAL ? '' : JSON.parse(localStorage.getItem('profile')).email,
        password: '',
        firstName: LOCAL ? '' : JSON.parse(localStorage.getItem('profile')).givenName,
        lastName: LOCAL ? '' : JSON.parse(localStorage.getItem('profile')).familyName,
        phone: '',
        city: '',
        state: '',
        pin: '',
        error: ''
    }

    const [State,setState] = useState(initState);

    const check = async ()=>{
        const res = await axios.get('/api/auth/signup/email_verification',{withCredentials: true});
        return res.data.verified;
    }

    const handleStart = ()=>{
        setState( ps => ({
            ...ps,
            started: true
        }))
    }

    const handleInputChange = (e) => {
        setState((prevState)=>({...prevState,[e.target.name]: e.target.value}))
    }

    const handleVerify = (e) => {

        e.preventDefault();

        setState((prevState)=>({...prevState,loading: true}))
        axios.post('/api/auth/signup/email_verification',{email: State.email})
            .then(  async (res) => {
                setState((prevState)=>({...prevState,verifying: true,loading: false}))
                //timeout 
                // setTimeout(()=>{
                //     setState((prevState)=>({...prevState,message: 'Timed out! redirecting now...'}))
                //     setTimeout(()=>{
                //         window.location.assign('/signup?redirectTo='+redirectTo);
                //     },5*1000);
                // },30*1000);
                const t = Date.now()

                while(1){
                    const verified = await check();
                    if(verified)
                    {
                        setState((prevState)=>({...prevState,verifying: false,verified: true}))
                        break;
                    }
                    if( Date.now() > t+60*1000)
                        window.location.assign('/signup')
                }
            })
            .catch( err => setState((prevState)=>({
                ...prevState,
                verifying: false,
                loading: false,
                error: err.response.data.message
            })))
    }

    const handleDetails = (e)=>{
        e.preventDefault();
        console.log(State)
        setState((prevState)=> ({...prevState,details: true}))
    }

    const handleContact = (e)=>{
        e.preventDefault();
        setState((prevState)=> ({...prevState,contact: true}))
    }

    const handleSignUp = ()=>{

        setState((prevState)=> ({...prevState,loading: true}))

        const {email,password,firstName,lastName,phone,city,state,pin} = State;

        axios.post('/api/auth/signup/create_user',{email,password,firstName,lastName,phone,city,state,pin,avatar,strategy})
            .then( res => {
                setState((prevState)=> ({...prevState,loading: false}))
                localStorage.removeItem('profile')
                window.location.assign("/home");
            })
            .catch( err => {
                console.log(err.response.data)
                setState((prevState)=> ({...prevState,loading: false,message: err.response.data.message}))
                window.location.reload()
            })
    }
    return (
         
        <div>
            <nav className="navbar navbar-expand-lg navbar-light shadow fixed-top">
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
                            <a className="nav-link" aria-current="page" href="/admin/login">Admin</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li className="nav-item mx-2">
                            <a className="nav-link active" href="/signup">Sign up</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>


            <div className="container">
                {
                    !State.started && !State.verified ? 
                    <Starting handleStart = {handleStart}/>
                    : 
                    <>
                    {
                        State.verified ?
                        <>
                            {
                                !State.details ?
                                <Details
                                    email = {State.email}
                                    strategy = {strategy}
                                    handleInputChange = {handleInputChange}
                                    handleDetails = {handleDetails}
                                />
                                :
                                <>
                                {
                                    !State.contact ?
                                    <Contact
                                        handleInputChange = {handleInputChange}
                                        handleContact = {handleContact}
                                    />
                                    :
                                    <Finishing handleSignUp = {handleSignUp}/>
                                }
                                </>
                            }
                        </>
                        :
                        <Email
                            handleInputChange = {handleInputChange}
                            handleVerify = {handleVerify}
                            verifying = {State.verifying}
                            error = {State.error} 
                            loading = {State.loading}
                        />
                    }
                    </>
                }
            </div>
        </div>
        
     );
}
 
export default Signup;