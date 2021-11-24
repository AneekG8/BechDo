const UpdatePassword = (props) => {

    const {updatePasswordSubmit,state,handleInputChange} = props 

    return ( 
        <div>
            <h1 className="display-6 text-dark"> <b>Update Password</b> </h1>
            <p className="text-secondary"> Enter your new password below</p>
            <form onSubmit = {updatePasswordSubmit}>
                <div className="mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" required className="form-control-sm w-100" name="password" placeholder="new password..." value={state.password.value} onChange={handleInputChange}/>
                    <p className="p-0 m-0 text-danger">{state.password.error}</p>
                </div>
                <button type="submit" className="btn btn-dark btn-sm w-100">{state.loading ? 'loading...' : 'save' }</button>
            </form>
        </div>
     );
}
 
export default UpdatePassword;