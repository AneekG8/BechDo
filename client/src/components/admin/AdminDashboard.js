import './Admin.css';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = (props) => {
    //const {user} = props;
    
    return ( 
        <div>
            <AdminNavbar/>
            <div className="container px-5 mt-3"> 
                    <div className="overflow-auto scrollbar-custom" style={{height: "540px"}}>
                        <h5 className="text-secondary border p-2 mb-0"> Product Verifications </h5>
                        
                    </div>
            </div>
        </div>
     );
}
 
export default AdminDashboard;