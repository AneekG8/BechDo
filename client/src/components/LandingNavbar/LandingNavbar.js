import { useEffect } from "react";
const LandingNavbar = (props) => {
    useEffect(()=>{
        document.querySelector(`a[href='/${props.activeLink}']`)?.classList.add('active')
    })
    return ( 
        <nav className="navbar navbar-expand shadow-sm navbar-light fixed-top">
          <div className="container-fluid px-3">
            <a className="navbar-brand" href="/"><i className="fab fa-bootstrap me-1"></i><span className="d-none d-sm-inline">BechDo</span></a>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item mx-1">
                  <a className="nav-link disabled" aria-current="page" href="/contact"><i className="fas fa-phone me-1"></i><span className="d-none d-sm-inline">Contact Us</span></a>
                </li>
                <li className="nav-item mx-1">
                  <a className="nav-link" aria-current="page" href="/admin/login"><i className="fas fa-user-cog me-1"></i><span className="d-none d-sm-inline">Admin</span></a>
                </li>
                <li className="nav-item mx-1">
                  <a className="nav-link" href="/login"><i className="fas fa-sign-in-alt me-1"></i><span className="d-none d-sm-inline">Login</span></a>
                </li>
                <li className="nav-item mx-1">
                  <a className="nav-link" href="/signup"><i className="fas fa-user-plus me-1"></i><span className="d-none d-sm-inline">Signup</span></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
}
 
export default LandingNavbar;