const Details = (props) => {
    const {strategy,email,handleDetails,handleInputChange} = props;

    const LOCAL = strategy === 'local';

    return (
        <div>
            <ul id="progressbar">
                <li className="active" id="account"><strong>Email</strong></li>
                <li className="active" id="personal"><strong>Details</strong></li>
                <li id="payment"><strong>Contact</strong></li>
                <li id="confirm"><strong>Finish</strong></li>
            </ul>
            <div className="container">
                <form onSubmit = {handleDetails}>
                    <div className="row p-0 m-0 justify-content-center">
                        {LOCAL && 
                        <div className="col-8 col-md-6 g-4 ">
                            <div className="mb-2">
                                <label htmlFor="firstName" className="form-label text-secondary"><b>First Name</b></label>
                                <input type="text" className="form-control-sm w-100 m-auto" name="firstName" placeholder="first name" onChange={handleInputChange}/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="LastName" className="form-label text-secondary"><b>Last Name</b></label>
                                <input type="text" className="form-control-sm w-100 m-auto" name="lastName" placeholder="last name" onChange={handleInputChange}/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="password" className="form-label text-secondary"><b>Password</b></label>
                                <input type="password" className="form-control-sm w-100 m-auto" name="password" placeholder="password" onChange={handleInputChange}/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="confirmPassword" className="form-label text-secondary"><b>Confirm Password</b></label>
                                <input type="password" className="form-control-sm w-100 m-auto" name="confirmPassword" placeholder="confirm password"/>
                            </div>
                        </div>}
                        <div className="col-8 col-md-6 g-4">
                            <div className="mb-2">
                                <label htmlFor="email" className="form-label text-secondary"><b>Email</b></label>
                                <input type="email" className="form-control-sm w-100 m-auto" name="email" readOnly placeholder="name@example.com" value={email} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="city" className="form-label text-secondary"><b>City</b></label>
                                <input type="text" className="form-control-sm w-100 m-auto" name="city" placeholder="city" onChange={handleInputChange}/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="state" className="form-label text-secondary"><b>State</b></label>
                                <input type="text" className="form-control-sm w-100 m-auto" name="state" placeholder="state" onChange={handleInputChange}/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="pin" className="form-label text-secondary"><b>Pin Code</b></label>
                                <input type="text" className="form-control-sm w-100 m-auto" name="pin" placeholder="pin code" onChange={handleInputChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-3"><button type="submit" className="btn btn-primary w-50">Submit</button></div>
                </form>
            </div>
        </div>
     );
}
 
export default Details;