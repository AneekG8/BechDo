import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from '../Navbar/Navbar'
import ReportProduct from './ReportProduct';
import Chat from './Chat'
import moment from 'moment';
import './Product.css'

const ProductDetails = (props) => {
    const {id} = useParams()
    
    const [state,setState] = useState({
        product: null,
        message: ''
    })

    const {user} = props;

    //const {product} = state;

    useEffect(()=>{
        axios.get('/api/products/'+id)
        .then( res => {
            setState(prevState => ({...prevState,product: res.data}))
        })
        .catch( err => {
            console.log(err)
            //setState(prevState => ({...prevState,message: err.response.data.error}))
        })
    },[id])

    const deletePost = (e)=>{
        e.preventDefault()

        const reason = e.target.deleteReason.value;

        if(!reason)
            return
            
        axios.delete('/api/products/'+state.product._id)
        .then( res => {
            if( reason === 'sold')
                window.location.assign('/feedback')
            else    
                window.location.assign('/home')
        })
        .catch( err => {
            console.log(err)
        })
    }


    return ( 
        <div className="">
            <Navbar user = {props.user} />

            {
            state.product &&
            <div className="container-fluid py-4">
                <div className="row p-0 m-0">
                    <div className="col-8">
                        <div className="bg-light border">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active bg-dark py-3 mb-4">
                                        <img height="420px" width="540px" src={state.product.images[0]} className="m-auto d-block" alt="..."/>
                                    </div>
                                    <div className="carousel-item bg-dark py-3 mb-4">
                                        <img height="420px" width="540px" src={state.product.images[1]} className="m-auto d-block" alt="..."/>
                                    </div>
                                    <div className="carousel-item bg-dark py-3 mb-4">
                                        <img height="420px" width="540px" src={state.product.images[2]} className="m-auto d-block" alt="..."/>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className="px-3">
                                <h4> Description </h4>
                                <p> {state.product.description} </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-4 px-2">
                        <div className="bg-light border p-3 mb-3">
                            <h4 className="mb-1"> Rs. {state.product.price} </h4>
                            <p className="text-secondary mb-2"> {state.product.name} </p>
                            <div className="d-flex justify-content-between">
                                <small className="text-secondary"> {state.product.location.fullAddress}  </small>
                                <small className="text-secondary"> {moment(state.product.createdAt).fromNow()}  </small>                            
                            </div>
                        </div>
                        <div className="bg-light border p-3">
                            <p className="text-dark" style={{fontSize: '20px'}} > Seller Description </p>
                            <div className="d-flex align-items-center mb-3">
                                <div>
                                    <a href="/profile" className="p-0">
                                        <img className="avatar avatar-64 border bg-light rounded-circle text-white" alt="avatar" src={state.product.author.avatar}/>
                                    </a>
                                </div>
                                <div className="ms-3">
                                    <p className="text-dark mb-0"><b>{state.product.author.firstName + " " + state.product.author.lastName}</b></p>
                                    <p className="text-secondary mb-0"> <small>member since {moment(state.product.author.createdAt).format('MMM Do YYYY')}</small> </p>
                                </div>
                            </div>
                            {user._id !== state.product.author._id && <Chat user={user} seller={state.product.author} product_id={state.product._id}/>}
                            {user._id !== state.product.author._id && <ReportProduct author={user._id} product={state.product}/>}
                            {user._id === state.product.author._id && 
                                <>
                                    <button type="button" className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Take down this Ad
                                    </button>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel"> Why do u want to delete this ad? </h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form name="deletePost" onSubmit={deletePost}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="deleteReason" value="technical glitch" id="flexRadioDefault1"/>
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                Because of some technical issues
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="deleteReason" value="user's mistake" id="flexRadioDefault2"/>
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                                You made some mistake
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="deleteReason" value="sold" id="flexRadioDefault3"/>
                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                                You have already sold this product
                                                            </label>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary btn mt-3">submit</button>
                                                    </form>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>}
        </div>
     );
}
 
export default ProductDetails;