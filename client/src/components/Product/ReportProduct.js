import axios from 'axios';

const ReportProduct = (props) => {
    const {author,product} = props

    if( product.reports.includes(author))
        console.log('reported')
        
    console.log(product)

    const reportPost = (e)=>{
        e.preventDefault();

        axios.post(`/api/products/${product._id}/report`,{
            author,
            product: product._id,
            reason: e.target.reason.value,
            description: e.target.description.value
        })
        .then( res => {
            window.location.reload();
        })
        .catch( err => {
            console.log(err)
        })
    }

    return ( 
        <div>
            <span type="button" className="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="text-dark text-"><u>Report this post</u></i>
            </span>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"> Why do you want to report this post? </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={reportPost}>
                                <div className="mb-3">
                                    <label htmlFor="reason" className="form-label">Reason: </label>
                                    <input type="text" className="form-control" name="reason" required placeholder="Please state a valid reason..."/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description: </label>
                                    <textarea className="form-control" name="description" rows="3" placeholder="Description..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">submit</button>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ReportProduct;