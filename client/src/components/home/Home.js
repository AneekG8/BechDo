import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import ProductList from "../Product/ProductList";
import '../utils/Utils.css'

const Home = (props) => {

    const [state,setState] = useState({
        location: {
            name: 'India',
            coords: {
                lat: 20.5937,
                lng: 78.9629
            }
        }
    })

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{

            const {coords} = position

            setState(prevState => ({...prevState,location:{
                name: 'unavailable',
                coords: {
                    lat: coords.latitude,
                    lng: coords.longitude
                }
            }}))

            axios.get('https://apis.mapmyindia.com/advancedmaps/v1/c2421e977564d7108e07605a984bd8ed/rev_geocode',{
                params:{
                    lat: coords.latitude,
                    lng: coords.longitude
                }
            })
            .then( res => {
                
                const currentLocation = res.data.results[0]
                setState(prevState => ({...prevState,location:{
                    name: currentLocation.city + ' , ' + currentLocation.state,
                    coords: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                }}))
            })
            .catch( err => console.log(err))
        })
    },[])

    return ( 
        <div>
            <Navbar user = {props.user} location = {state.location} />
            
            <ProductList location = {state.location}/>
        </div>
     );
}
 
export default Home;