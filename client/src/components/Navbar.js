import axios from "axios";

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
    return ( 
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">Bech-Do</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/location" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Location
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="/">Kerala</a></li>
                                    <li><a className="dropdown-item" href="/">Kolkata</a></li>
                                    <li><a className="dropdown-item" href="/">Odisha</a></li>
                                </ul>
                            </li>
                            <div className="nav-item mx-2">
                                <a href="/profile" className="nav-link">
                                    <img className="avatar avatar-32 bg-light rounded-circle text-white" alt="avatar" src={user?.avatar}/>
                                </a>
                            </div>
                            <div className="nav-item mx-2">
                                <button className="btn btn-sm btn-success">sell</button>
                            </div>
                            <div className="nav-item mx-2">
                                <button className="btn btn-sm btn-secondary" onClick = { handleLogout } >Logout</button>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
     );
}
 
export default Navbar;