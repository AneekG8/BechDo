const Contact = (props) => {
    console.log(props)
    return ( 
        <div>
            <ul id="progressbar">
                <li className="active" id="account"><strong>Email</strong></li>
                <li className="active" id="personal"><strong>Details</strong></li>
                <li className="active" id="payment"><strong>Contact</strong></li>
                <li id="confirm"><strong>Finish</strong></li>
            </ul>
            <form onSubmit = {props.handleContact} className="container p-5 text-center mt-5">
                <div className="mb-2">
                    <label htmlFor="phone" className="form-label text-secondary"><b>Contact</b></label>
                    <input type="text" className="form-control w-50 m-auto" name="phone" placeholder="Phone Number" onChange={props.handleInputChange}/>
                </div>
                <button type="submit" className="btn btn-primary btn w-50">Verify</button>
            </form>
        </div>
     );
}
 
export default Contact;