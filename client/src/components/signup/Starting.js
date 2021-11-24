const Starting = (props) => {
    return ( 
        <div>
            <div className="vh-100 d-flex align-items-center justify-content-center">
                <div className="border shadow container py-4 text-center" id="starting">
                    <h1 className="display-2 mb-5">
                        BechDo
                    </h1>
                    <h4 className="my-3">
                        Welcome To BechDo
                    </h4>
                    <p className="text-secondary mb-5">
                        Let's get started!
                    </p>
                    <button className="btn btn-primary btn-fluid mb-3" onClick = {props.handleStart}>
                        Start Registering!
                    </button>
                    <p> Already have an account? <a href="/login">Log in</a></p>
                </div>
            </div>
        </div>
     );
}
 
export default Starting;