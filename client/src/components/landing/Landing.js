import './Landing.css'
const Landing = () => {
    return ( 
    <div className="vh-100 d-flex justify-content-center align-items-center" id="landing">
        <nav className="navbar navbar-expand-lg shadow-sm navbar-light fixed-top">
          <div className="container-fluid px-3">
            <a className="navbar-brand" href="/">BechDo</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item mx-2">
                  <a className="nav-link" aria-current="page" href="/contact">Contact Us</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" aria-current="page" href="/admin/login">Admin</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="/signup">Sign up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <h1 className="display-1" id="title">
          Bech Do
        </h1>
    </div>
    );
}
 
export default Landing;