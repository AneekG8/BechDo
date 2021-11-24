import './Admin.css';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { useParams } from "react-router";
import moment from 'moment'

const ReportDetails = () => {
    const {id} = useParams();

    const [report,setReport] = useState(null)

    useEffect(()=>{
        axios.get('/api/admin/reports/'+id)
        .then(res => {
            console.log(res.data)
            setReport(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[id])

    const showProduct = (productId)=>{
        window.location.assign('/admin/products_verification/'+productId)
    }

    return ( 
        <div>
            <AdminNavbar/>
            {
                report && 
                <>
                    <div className="container mt-3">
                        <div className="row p-0 m-0">
                            <div className="col-2 px-2">
                                
                            </div>

                            <div className="col-6 px-2">
                                <h5> Report Id # {report._id}</h5>
                                <div className="bg-light border p-2 my-3">
                                    Reported For - {report.reason}
                                </div>
                                <div className="bg-light border p-3 mb-3">
                                    <p className="text-dark" style={{fontSize: '20px'}} > Reported By </p>
                                    <div className="d-flex align-items-center mb-3">
                                        <div>
                                            <a href="/profile" className="p-0">
                                                <img className="avatar avatar-64 border bg-light rounded-circle text-white" alt="avatar" src={report.author.avatar}/>
                                            </a>
                                        </div>
                                        <div className="ms-3">
                                            <p className="text-dark mb-0"><b>{report.author.firstName + " " + report.author.lastName}</b></p>
                                            <p className="text-secondary mb-0"> <small>member since {moment(report.author.createdAt).format('MMM Do YYYY')}</small> </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-light border p-2 mb-3">
                                    <b>Description</b> 
                                    <p className="m-0">{report.reason}</p>
                                </div>
                            </div>

                            <div className="col-4 px-3">
                                <div className="card cursor-pointer" onClick={()=>{showProduct(report.product._id)}}>
                                    <img height = "210px" src={report.product.images[0]} className="card-img-top p-3 bg-dark" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title mb-1">Rs. {report.product.price}</h5>
                                        <p className="mb-1"> <b> {report.product.name} </b> </p>
                                        <p className="card-text text-secondary">{report.product.description?.slice(0,35) + ' .....'  || 'description unavailable'}</p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <small className="text-muted">{report.product.city},{report.product.state}</small>
                                        <small className="text-muted">{moment(report.product.createdAt).fromNow()}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
     );
}
 
export default ReportDetails;