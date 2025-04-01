import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ()=> {
    return(
        <div className="flex-col w-screen h-screen">
            <Navbar/>
            <div className="px-36 py-8">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;