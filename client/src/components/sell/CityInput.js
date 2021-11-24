import axios from "axios";
import { useEffect, useState } from "react";

const CityInput = (props) => {
    const [state,setState] = useState({
        cities : [],
        loading: true
    })

    useEffect(()=>{

        axios.get('https://parseapi.back4app.com/classes/Indiacities_india_cities_database?limit=5000order=ascii_name&keys=ascii_name',{
            headers: {
                'X-Parse-Application-Id': 'poBghaNlCuCFcYlket0xA1voLD8M9rtiiXNUTCkG', // This is your app's application id
                'X-Parse-REST-API-Key': 'etWdz5ndwcKWNh01pyThhtw9eWMFRRQJdiiK2HBa', // This is your app's REST API key
            }            
        })
        .then(res => {
            console.log(res.data.results.length)
            setState({
                cities: res.data.results,
                loading: false
            })
        })
        .catch( err => {
            console.log(err)
        })
    },[])

    return (
        <div>
            {
                state.loading ? <p>loading...</p> :
                <select name="city" style={{width: "200px"}} className="form-select text-seconday" value={props.city} onChange={props.handleInputChange} required>
                    <option value="" disabled selected> select your city </option>
                    {
                        state.cities.map( city => (
                            <option value={city.ascii_name} > {city.ascii_name} </option>
                        ))
                    }
                </select>
            }
        </div>
    )
}
export default CityInput;