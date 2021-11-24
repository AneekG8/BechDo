import './Admin.css';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import {useState,useEffect} from 'react'
import moment from 'moment'

const ProductsVerification = () => {

    const [products,setProducts] = useState([])

    useEffect(()=>{
        axios.get('/api/admin/products_verification')
        .then( res => {
            setProducts(res.data)
        })
        .catch( err => {
            console.log(err)
        })
    },[])

    return ( 
        <div>
            <AdminNavbar/>
            <div className="container px-5 mt-3">
                {
                    !products.length ?
                    <div className="text-secondary text-center">
                        <h1 className="display-4"> Yaay! No work for you today Admin!</h1>
                        <h2><i className="far fa-laugh-beam" style={{fontSize: "80px"}}></i></h2>
                    </div> 
                    :
                    <div className="overflow-auto scrollbar-custom" style={{height: "540px"}}>
                        <h5 className="text-secondary border p-2 mb-0"> Products Verification </h5>
                        {
                            products.map( product => (
                                <div onClick = {()=>{window.location.assign('/admin/products_verification/'+product._id)}} className="border cursor-pointer p-2 text-secondary bg-light">
                                    <div className="d-flex">
                                        <div>
                                            <img className="avatar avatar-64 border bg-light rounded-circle text-white" alt="avatar" src={product.images[0]}/>
                                        </div>
                                        <div className="ms-3">
                                            <div><b> Verification Required for product id #{product._id}</b></div>
                                            <div> <b>product name: </b> {product.name} </div>
                                            <div> <b>product price: </b> Rs. {product.price} </div>
                                        </div>
                                    </div>
                                    <p className="text-end mb-0"> <small>{moment(product.createdAt).fromNow()}</small> </p>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
     );
}
 
export default ProductsVerification;