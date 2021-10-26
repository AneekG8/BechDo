import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';

const EmailVerification = () => {

    const location = useLocation();
    const [state,setState] = useState({
        verifying: true,
        verified: false,
        message: ''
    })

    const params = new URLSearchParams(location.search.slice(1));                                            
    const token = params.get('token');

    useEffect(()=>{
        axios.post('/api/auth/email_verify',{token})
            .then( res => setState({
                verifying: false,
                verified: true,
                message: res.data.message
            }))
            .catch( err => setState({
                verifying: false,
                verified: false,
                message: err.response.data.message
            }))
    })
    return ( 
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid px-3">
                    <span clspanssName="navbar-brand" >BechDo</span>
                </div>
            </nav>
            <div className="container text-secondary text-center">
            {
                state.verifying ?
                <h4> we are verifying your email...</h4>
                :
                <h4> {state.message}</h4>
            }
            </div>
        </div>
     );
}
 
export default EmailVerification;