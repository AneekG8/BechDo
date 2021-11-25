import { useState } from 'react'
import './Feedback.css'
const Feedback = () => {
    const [state,setState] = useState({
        loading: false,
        feedback: '',
        submitted: false
    })
    const handleInputChange = (e)=>{
        setState((prevState)=>({...prevState,[e.target.name]: e.target.value}))
    }

    const submitFeedback = (e)=>{
        e.preventDefault()
        setState((prevState)=>({...prevState,loading: true}))
        setTimeout(()=>{
            setState((prevState)=>({...prevState,loading: false}))
        },500)
        setTimeout(()=>{
            setState((prevState)=>({...prevState,submitted: true}))
        },1000)
        setTimeout(()=>{
            window.location.assign('/home')
        },1500)

    }
    return ( 
        <div className="text-center container p-3">
            {
                !state.submitted ?
                <>
                    <div className="display-5 text-secondary mb-5">
                        <div className="mb-3">Rate Our Service</div>
                        <span className="star-rating ">
                            <input type="radio" name="rating" value="1"/><i></i>
                            <input type="radio" name="rating" value="2"/><i></i>
                            <input type="radio" name="rating" value="3"/><i></i>
                            <input type="radio" name="rating" value="4"/><i></i>
                            <input type="radio" name="rating" value="5"/><i></i>
                        </span>
                    </div>
                    <form onSubmit={submitFeedback} className="">
                        <div className="mb-3  mx-5 px-5">
                            <label htmlFor="feedback" className="form-label text-secondary"> <b> Feedback: </b> </label>
                            <textarea onChange={handleInputChange} className="form-control"  rows="8" name="feedback" value={state.feedback}></textarea>
                        </div>
                        <button type="submit" className="btn btn-secondary w-25">
                            {
                                state.loading ?
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : 
                                'Done!'
                            }
                        </button>
                    </form>
                </>
                :
                <div>
                    <div className="alert alert-success mb-3" role="alert">
                        Feedback submitted successfully
                    </div>
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-secondary">redirecting to the home page...</p>
                    </div>
                </div>
            }
        </div>
     );
}
 
export default Feedback;