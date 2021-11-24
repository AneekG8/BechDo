import axios from 'axios';

const AdminNavbar = () => {
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
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top shadow-sm" style={{zIndex: 1}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">Bech-Do.Admin</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav align-items-center">
                            <div className="nav-item mx-2">
                                <a className="nav-link active" href="/admin/products_verification">verifications</a>
                            </div>

                            <div className="nav-item mx-2">
                                <a className="nav-link active" href="/admin/reports">reports</a>
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
 
export default AdminNavbar;