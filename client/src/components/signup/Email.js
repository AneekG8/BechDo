const Email = (props) => {
    const {verifying,handleInputChange,handleVerify,error,loading} = props;

    return ( 
        <>
            <ul id="progressbar">
                <li className="active" id="account"><strong>Email</strong></li>
                <li id="personal"><strong>Details</strong></li>
                <li id="payment"><strong>Contact</strong></li>
                <li id="confirm"><strong>Finish</strong></li>
            </ul>

            {verifying ?

            <h4 className="text-secondary mt-5 text-center">
                A confirmation Link has been sent to your email address.Please click on the link to verify your Email Id.
                The link will be valid for 2 minutes. This page will be automatically redirected.
            </h4>

            :
            
            <form onSubmit = {handleVerify} className="container p-5 text-center mt-5">
                <div className="mb-2">
                    <label htmlFor="email" className="form-label text-secondary"><b>Email</b></label>
                    <input type="email" className="form-control w-50 m-auto" name="email" placeholder="name@example.com" onChange = {handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary btn w-50">{loading ? 'loading...' : "verify" }</button>
                <p className="text-danger mt-3">{error}</p>
            </form>
            }
        </>
     );
}
 
export default Email;