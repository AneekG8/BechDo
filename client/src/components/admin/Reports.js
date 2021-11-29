import './Admin.css';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import {useState,useEffect} from 'react';
import moment from 'moment';
const Reports = () => {
    const [reports,setReports] = useState([])

    useEffect(()=>{
        axios.get('/api/admin/reports')
        .then( res => {
            setReports(res.data)
        })
        .catch( err => {
            console.log(err)
        })
    },[])

    console.log(reports)

    return ( 
        <div>
            <AdminNavbar/>
            <div className="container px-5 mt-3"> 
                {
                    !reports.length ?
                    <div className="text-secondary text-center">
                        <h1 className="display-4"> Yaay! No work for you today Admin!</h1>
                        <h2><i className="far fa-laugh-beam" style={{fontSize: "80px"}}></i></h2>
                    </div> 
                    :
                    <div className="overflow-auto scrollbar-custom" style={{height: "540px"}}>
                        <h5 className="text-secondary border p-2 mb-0"> Reports submitted by users </h5>
                        {
                            reports.map( report => (
                                <div onClick = {()=>{window.location.assign('/admin/reports/'+report._id)}} className="border cursor-pointer p-2 text-secondary bg-light">
                                    <div className="d-flex">
                                        <div>
                                            <img className="avatar avatar-64 border bg-light rounded-circle text-white" alt="avatar" src={report.product.images[0]}/>
                                        </div>
                                        <div className="ms-3">
                                            <div><b> Report against Product id #{report.product._id}</b></div>
                                            <div> <b>reason of report: </b> {report.reason} </div>
                                            <div> <b>reported by: </b> {report.author.firstName} </div>
                                        </div>
                                    </div>
                                    <p className="text-end mb-0"> <small>{moment(report.createdAt).fromNow()}</small> </p>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
     );
}
 
export default Reports;