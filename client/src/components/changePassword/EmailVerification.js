const EmailVerification = (props) => {

    const {state,emailVerificationSubmit,handleInputChange} = props

    return ( 
        <div>
            <h1 className="display-6 text-dark"> <b>Please verify your Email</b> </h1>
            <p className="text-secondary"> Enter your email below</p>
            <form onSubmit={emailVerificationSubmit}>
                <div className="mb-2">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" required className="form-control-sm w-100" name="email" placeholder="name@example.com" value={state.email.value} onChange={handleInputChange}/>
                    <p className="p-0 m-0 text-danger">{state.email.error}</p>
                </div>
                <button type="submit" className="btn btn-dark btn-sm w-100">{state.loading ? 'loading...' : 'verify' }</button>
            </form>
        </div>
     );
}
 
export default EmailVerification;