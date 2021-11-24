const Loading = () => {
    return ( 
        <div className=" d-flex justify-content-center vw-100 vh-100 align-items-center bg-dark"
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 2,
                opacity: 0.75
            }} 
        >
            <div className="text-center text-white">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p> Loading... </p>
            </div>
        </div>
     );
}
 
export default Loading;