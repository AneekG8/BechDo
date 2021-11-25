import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Product from "../Product/Product";

const Ads = (props) => {
    const {user} = props;

    const initialState = {
        loading: false,
        products: []
    }

    const [state,setState] = useState(initialState)

    useEffect(()=>{
        axios.get('api/users/'+user._id+'/products')
        .then( res => {
            setState(prevState => ({
                ...prevState,
                products: res.data
            }))
        })
        .catch( err => {
            console.log(err)
        })
    },[user._id])
    return ( 
        <div>
            <Navbar user={user}/>
            <div className="container py-3">
                <h1 className="text-center">
                    <img className="avatar avatar-128 border bg-light rounded-circle text-white" alt="avatar" src={user.avatar}/>
                </h1>
                {
                    !state.products.length ?
                    <div className="text-center text-secondary display-5"><i>No products available</i></div>
                    :
                    <h1 className="display-5 mb-3 text-secondary">Your Ads</h1>
                }
                <div className="row row-cols-1 row-cols-md-3 g-4" >
                    {
                        state.products.map( product => 
                            <Product product = {product} key = {product._id}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Ads;