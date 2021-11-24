import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AdminNavbar from './AdminNavbar';
import './Admin.css';
import moment from 'moment';

const ProductDetails = (props) => {
    const {id} = useParams()
    
    const [state,setState] = useState({
        product: null,
        message: ''
    })

    //const {user} = props;

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

    const deletePost = ()=>{
        axios.delete('/api/products/'+state.product._id)
        .then( res => {
            window.location.assign('/admin/products_verification')
        })
        .catch( err => {
            console.log(err)
        })
    }

    const approvePost = ()=>{
        axios.put('/api/admin/product_verification/'+state.product._id)
        .then( res => {
            window.location.assign('/admin/products_verification')
        })
        .catch( err => {
            console.log(err)
        })
    }

    const showReport = (reportId)=>{
        window.location.assign('/admin/reports/'+reportId)
    }

    return ( 
        <div className="">
            <AdminNavbar/>

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
                        {
                            !state.product.status.verified &&
                            <div className="bg-light border p-3 mb-3">
                                <h4 className="mb-2 text-center"> Verify this product! </h4>
                                <div className="d-flex py-3 px-5 justify-content-between">
                                    <button className="btn btn-sm btn-success" onClick={approvePost}>Approve</button>  
                                    <button className="btn btn-sm btn-danger" onClick={deletePost}>Disapprove</button>                                                                                  
                                </div>
                            </div>
                        }
                        <div className="bg-light border p-3 mb-3">
                            <h4 className="mb-1"> Rs. {state.product.price} </h4>
                            <p className="text-secondary mb-2"> {state.product.name} </p>
                            <div className="d-flex justify-content-between">
                                <small className="text-secondary"> {state.product.location.fullAddress}  </small>
                                <small className="text-secondary"> {moment(state.product.createdAt).fromNow()}  </small>                            
                            </div>
                        </div>
                        <div className="bg-light border p-3 mb-3">
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
                            <button type="button" className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Take down this Ad
                            </button>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"> Are you sure? </h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body text-center">
                                            <button type="button" className="btn btn-danger" onClick={deletePost}> Yes! </button>
                                        </div>                
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light border p-3 mb-3">
                            <p> <i>This post has {state.product.reports.length} reports</i> </p>
                            <div style={{maxHeight: "100px"}} className="overflow-auto scrollbar-custom">
                                {
                                    state.product.reports.map( report => (
                                        <div onClick={()=>{showReport(report._id)}} className="bg-white border p-2 cursor-pointer">
                                            Reported for <b><i>{report.reason}</i></b>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
     );
}
 
export default ProductDetails;