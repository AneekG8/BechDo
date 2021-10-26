import Navbar from "../Navbar";

const Home = (props) => {

    return ( 
        <div>
            <Navbar user = {props.user} />
            <div style = {{height: "64px"}}></div>
            <div className="text-center border py-1">
                <h5> categories  </h5>
            </div>
            <div className="container py-3">
                
            <div className="row row-cols-1 row-cols-md-3 g-4" >
                <div className="col">
                    <div className="card h-100">
                    <img height = "260px" src="https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZSUyMHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Rs. 50000</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                    <img height = "260px" src="https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZSUyMHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Rs. 50000</h5>
                        <p className="card-text">
                            <p><b> iphone </b></p>
                            <p> 2 months old. </p>
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                    <img height = "260px" src="https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZSUyMHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Rs. 50000</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                    <img height = "260px" src="https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZSUyMHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Rs. 50000</h5>
                        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
     );
}
 
export default Home;