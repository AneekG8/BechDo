import { useEffect } from "react";

const Finishing = (props) => {
    useEffect(()=>{
        setTimeout(()=>{
            props.handleSignUp();
        },2000)
    })
    return ( 
        <div className="">
            <ul id="progressbar">
                <li className="active" id="account"><strong>Email</strong></li>
                <li className="active" id="personal"><strong>Details</strong></li>
                <li className="active" id="payment"><strong>Contact</strong></li>
                <li className="active" id="confirm"><strong>Finish</strong></li>
            </ul>
            <div className="text-center text-secondary">
                <h4 >Finishig Up...</h4>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
     );
}
 
export default Finishing;