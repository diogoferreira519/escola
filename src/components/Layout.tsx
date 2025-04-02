import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ()=> {
    return(
        <div className="flex-col w-full h-full">
            <Navbar/>
            <div className="px-36 py-8">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;