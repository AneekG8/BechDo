import axios from 'axios';
import {useEffect, useState} from 'react'
import Product from './Product';
import '../utils/Utils.css'
const ProductList = (props) => {

    const {location} = props

    const [loading,setLoading] = useState(true)

    const [products,setProducts] = useState(null);

    const [order,setOrder] = useState({
        value: '',
        sortBy: 'createdAt',
        order: -1
    });
    const [page,setPage] = useState(1)
    const [pager,setPager] = useState(null)

    const [disabled,setDisabled] = useState({
        prev: '',
        next: ''
    })

    const [category,setCategory] = useState('all')

    const [sortByLocation,setSortByLocation] = useState(true)

    useEffect(()=>{
        const categoryElements = document.querySelectorAll('.hover-link')

        categoryElements.forEach(item => {
            if(item.dataset.category === category)
                item.classList.add('active')
            else
                item.classList.remove('active')
        })

        setLoading(true)
        axios.get(`/api/products?sortBy=${order.sortBy}&order=${order.order}&page=${page}&category=${category}`,{
            params:{
                location,
                sortByLocation
            }
        })
        .then( res => {
            setProducts(res.data.products)
            setPager(res.data.pager)
            setLoading(false)
        })
        .catch( err => {
            console.log(err)
        })
    },[order,page,category,location,sortByLocation])

    useEffect(()=>{
        if(pager?.totalPages === 0 || (pager?.currentPage === pager?.startPage && pager?.currentPage === pager?.endPage))
            setDisabled({
                prev: ' disabled',
                next: ' disabled'
            })
        else if(pager?.currentPage === pager?.startPage)
            setDisabled({
                prev: ' disabled',
                next: ''
            })
        else if(pager?.currentPage === pager?.endPage)
            setDisabled({
                prev: '',
                next: ' disabled'
            })
        else
            setDisabled({
                prev: '',
                next: ''
            })
        
    },[pager])

    const handleSort = (e)=>{
        setSortByLocation(false)
        const sortBy = e.target.value;

        if(sortBy === 'relevance')
            setOrder({
                value: sortBy,
                sortBy: 'createdAt',
                order: -1
            })

        else if(sortBy === 'priceAsc')
            setOrder({
                value: sortBy,
                sortBy: 'price',
                order: 1
            })

        else if(sortBy === 'priceDesc')
        setOrder({
            value: sortBy,
            sortBy: 'price',
            order: -1
        })
    }

    const handleNextPage = (e)=>{
        if(page < pager.endPage){
            window.scrollTo(0,0)
            setPage(prevPage => {
                return prevPage+1
            })
        }
    }

    const handlePrevPage = (e)=>{
        if(page > pager.startPage){
            window.scrollTo(0,0)
            setPage(prevPage => {
                return prevPage-1
            })
        }
    }

    const handleCategoryChange = (e)=>{
        setPage(1)

        setCategory(e.target.dataset.category)
    }

    const handleSwitchChange = (e)=>{
        setSortByLocation(e.target.checked)
        setOrder(prevState => ({
            ...prevState,
            value:""
        }))
    }

    return ( 
        <div>
            <div className="d-none d-md-flex border py-1 justify-content-around mb-3">
                <b className="cursor-pointer active hover-link" data-category="all" onClick = {handleCategoryChange}>All Categories</b>
                <b className="cursor-pointer hover-link" data-category="mobile" onClick = {handleCategoryChange}>Mobiles</b>
                <b className="cursor-pointer hover-link" data-category="computer" onClick = {handleCategoryChange}>Computers</b>
                <b className="cursor-pointer hover-link" data-category="furniture" onClick = {handleCategoryChange}>Furnitures</b>
                <b className="cursor-pointer hover-link" data-category="plot" onClick = {handleCategoryChange}>Plots</b>                
            </div>
            <div className="container p-5 bg-light">

                {
                    loading ? 

                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    :

                    <>
                        <div className="d-none d-md-flex justify-content-between align-items-center">
                            <h1 className="display-5 ps-5 text-secondary mb-3 form-check form-switch">
                                Products nearby you 
                                <input onChange={handleSwitchChange} checked={sortByLocation} className="me-1 form-check-input" style={{fontSize: '30px'}} type="checkbox" role="switch"/>
                                <span style={{fontSize:"15px"}}> page {pager?.currentPage} of {pager?.totalPages}</span>
                            </h1>
                            <div>
                                sort by - 
                                <select onChange={handleSort} className="mx-2 p-1 cursor-pointer" value={order.value}>
                                    <option value="" disabled>choose an order</option>
                                    <option value="relevance">Relevance</option>
                                    <option value="priceAsc">Price Low To High</option>
                                    <option value="priceDesc">Price High To Low</option>
                                    {/* <option value="priceDesc">Price High To Low</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-md-3 g-4" >
                            {
                                products.map( product => 
                                    <Product product = {product} key = {product._id}/>
                                )
                            }
                        </div>
                        <div className="row p-0 mt-4">
                            <div className="col-12">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li onClick={handlePrevPage} className={"page-item cursor-pointer" + disabled.prev}>
                                            <span className="page-link" tabIndex="-1">Prev</span>
                                        </li>
                                        <li onClick={handleNextPage} className={"page-item cursor-pointer" + disabled.next}>
                                            <span className="page-link">Next</span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
     );
}
 
export default ProductList;