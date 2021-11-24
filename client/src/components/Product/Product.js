import '../utils/Utils.css'
import moment from 'moment'

const Product = (props) => {
    const {product} = props;
    const showProduct = (productId)=>{
        window.location.assign('/products/'+productId)
    }
    return ( 
        <div className="col cursor-pointer product-animation" onClick = {()=>{showProduct(product._id)}}>
            <div className="card h-100">
                <img height = "210px" src={product.images[0]} className="card-img-top p-3 bg-dark" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title mb-1">Rs. {product.price}</h5>
                    <p className="mb-1"> <b> {product.name} </b> </p>
                    <p className="card-text text-secondary">{product.description?.slice(0,35) + ' .....'  || 'description unavailable'}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <small className="text-muted">{product.city},{product.state}</small>
                    <small className="text-muted">{moment(product.createdAt).fromNow()}</small>
                </div>
            </div>
        </div>
     );
}
 
export default Product;