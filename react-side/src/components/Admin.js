import Sidebar from "./Sidebar";
import List from "./List";
import './Admin.css'
import AdminHome from "./AdminHome";

const Admin = () => {
    return(
        <div>
            <div className="admin-div">
                <Sidebar />
                <AdminHome/>
            </div>
        </div>
        
        
    )
}

export default Admin;