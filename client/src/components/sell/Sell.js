import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { useState } from 'react';
import CityInput from './CityInput';
// import Loading from '../Loading/Loading';
const Sell = (props) => {
    const {user} = props;

    const initState = {
        name: '',
        category: '',
        price: '',
        city: user.city,
        state: user.state,
        pin: user.pin,
        fullAddress: '',
        description: '',
        loading: false
    }

    const [state,setState] = useState(initState);

    const handleInputChange = (e)=>{
        setState((prevState)=>({...prevState,[e.target.name]: e.target.value}))
    }

    const handleSubmit = (e)=>{
        setState((prevState)=>({...prevState,loading: true}))

        e.preventDefault()

        const images = e.target.images.files;

        if(images.length < 3)
        {
            document.querySelector('#imgError').innerHTML = "need at least 3 images"
            setState((prevState)=>({...prevState,loading: false}))
            return
        }
        else
            document.querySelector('#imgError').innerHTML = ""

        const formData = new FormData();
        
        for(let i=0;i<images.length;i++)
            formData.append(`images`,images[i])

        for(const field of e.target)
            if (field.type !== 'file' && field.type !== 'submit')
                formData.append(field.name,field.value)

        formData.append('author',user._id)

        axios.post('/api/products/sell',formData)
        .then( res => {
            setState((prevState)=>({...prevState,loading: false}))
            window.location.assign('/home')
        })
        .catch( err => {
            setState((prevState)=>({...prevState,loading: false}))
            console.log(err.response.data)
        })
    }

    const handleLocation = ()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const {coords} = position

            axios.get('https://apis.mapmyindia.com/advancedmaps/v1/c2421e977564d7108e07605a984bd8ed/rev_geocode',{
                params:{
                    lat: coords.latitude,
                    lng: coords.longitude
                }
            })
            .then( res => {
                const currentLocation = res.data.results[0]
                setState(prevState => ({
                    ...prevState,
                    city: currentLocation.city,
                    state: currentLocation.state,
                    pin: currentLocation.pincode,
                    fullAddress: currentLocation.formatted_address
                }))
            })
            .catch( err => console.log(err))
        })   
    }

    return ( 
        <div>
            <Navbar user = {user}/>
{/* 
            {
                state.loading && <Loading/>
            } */}
            <form onSubmit = {handleSubmit}>
                <div className="row py-4 m-0 justify-content-center">
                    <div className="col-10 col-sm-8 col-lg-4 p-3 border shadow">
                        <div className="mb-3">
                            <label for="name" className="form-label text-secondary"> <b> Name: </b> </label>
                            <input type="text" onChange={handleInputChange} className="form-control" name="name" placeholder="product name" value={state.name} required/>
                        </div>
                        <div className="mb-3">
                            <label for="category" className="form-label text-secondary"> <b> Category: </b> </label>
                            <select onChange={handleInputChange} className="form-select text-seconday" name="category" aria-label="Default select example" value={state.category} placeholder="select a category" required>
                                <option value="" disabled selected>Select a category</option>
                                <option value="mobile">Mobile</option>
                                <option value="computer">Computer</option>
                                <option value="furniture">Furniture</option>
                                <option value="plot">Plot</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="price" className="form-label text-secondary"> <b> Price: </b> </label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Rs.</span>
                                <input type="number" onChange={handleInputChange} className="form-control" name="price" placeholder="price" value={state.price} required/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="images" className="form-label text-secondary"> <b> Images: </b> </label>
                            <input className="form-control" name="images" type="file" accept=".png,.jpg,.jpeg" multiple required/>
                            <p className="text-danger" id="imgError"></p>
                        </div>
                        <div className="d-lg-flex mb-3 align-items-center justify-content-between ">
                            <div>
                                <p className="my-1 text-secondary">
                                    Using default user's location
                                </p>
                                <button type="button" className="btn btn-secondary btn-sm" onClick={handleLocation}> Use current location instead</button>
                            </div>
                            <div>
                                <label for="city" className="form-label text-secondary"> <b> City: </b> </label>
                                <CityInput city = {state.city} handleInputChange = {handleInputChange}/>
                            </div>
                        </div>
                        <div className="d-lg-flex mb-3 align-items-center justify-content-between">
                            <div>
                                <label for="state" className="form-label text-secondary"> <b> State: </b> </label>
                                <input type="text" onChange={handleInputChange} className="form-control" name="state" placeholder="state" required value={state.state}/>
                            </div>
                            <div className=""> 
                                <label for="pin" className="form-label text-secondary"> <b> Pin: </b> </label>
                                <input type="text" onChange={handleInputChange} className="form-control" name="pin" placeholder="pin number" required value={state.pin}/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="fullAddress" className="form-label text-secondary"> <b> Full Address: </b> </label>
                            <textarea onChange={handleInputChange} className="form-control"  rows="2" name="fullAddress" value={state.fullAddress}></textarea>
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label text-secondary"> <b> Description: </b> </label>
                            <textarea onChange={handleInputChange} className="form-control"  rows="6" name="description" value={state.description}></textarea>
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
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default Sell;