import axios from "axios";
import './Navbar.css';
import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import PopoverBody from 'react-bootstrap/PopoverBody'

const Navbar = (props) => {
    const {user} = props

    const handleLogout = ()=>{
        axios.post('/api/auth/logout')
        .then( res => {
            window.location.reload()
        })
        .catch( err => {
            console.log(err)
        })
    }

    const locationBtnHoverIn = ()=>{
        const locationSpan = document.querySelector('#location')
        if(locationSpan)
            locationSpan.innerHTML = 'relocate yourself'
    }

    const locationBtnHoverOut = ()=>{
        const locationSpan = document.querySelector('#location')
        if(locationSpan)
            locationSpan.innerHTML = props.location.name
    }

    return ( 
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top shadow-sm" style={{zIndex: 1}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">Bech-Do</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav align-items-center">
                            {props.location &&
                            <div className="nav-item mx-2">
                                <button style={{minWidth: "200px"}} onMouseOver={locationBtnHoverIn} onMouseOut={locationBtnHoverOut} className="btn btn-outline-primary btn-sm"> <i className="fas fa-map-marker-alt me-1"></i> <span id="location">{props.location.name}</span> </button>
                            </div>}
                            <div className="nav-item mx-2">
                                {/* <a href="/profile" className="nav-link">
                                    <img className="avatar avatar-32 bg-light rounded-circle text-white" alt="avatar" src={user?.avatar}/>
                                </a> */}
                                <OverlayTrigger
                                    trigger="click"
                                    placement={'bottom'}
                                    overlay={
                                        <Popover id={`popover-positioned-bottom`}>
                                            <PopoverBody>
                                                <div style={{width: '150px'}} className="text-center">
                                                    {/* <div className="px-2 py-1 border cursor-pointer">
                                                        <a href="/edit_profile" className="link-light">Edit Profile</a>
                                                    </div> */}
                                                    {
                                                        user.strategy === 'local' &&
                                                        <div className="px-2 py-1 border cursor-pointer">
                                                            <a href="/change_password" className="link-light">Change Password</a>
                                                        </div>
                                                    }
                                                    <div className="px-2 py-1 border cursor-pointer">
                                                        <a href="/my_ads" className="link-light"> My Ads</a>
                                                    </div>
                                                </div>
                                            </PopoverBody>
                                        </Popover>
                                    }
                                    rootClose={true}
                                >
                                    <span className="cursor-pointer">
                                        <img className="avatar avatar-32 bg-light rounded-circle text-white" alt="avatar" src={user?.avatar}/>
                                    </span>
                                </OverlayTrigger>
                            </div>
                            <div className="nav-item mx-2">
                                <button className="btn btn-sm btn-success" onClick = {()=>{window.location.assign('/sell')}}>sell</button>
                            </div>
                            <div className="nav-item mx-2">
                                <button className="btn btn-sm btn-secondary" onClick = { handleLogout } >Logout</button>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
            <div style = {{height: "64px"}}></div>
        </div>
     );
}
 
export default Navbar;