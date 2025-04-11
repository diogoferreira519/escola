import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ()=> {
    return(
        <div className="flex-col w-full h-full">
            <Navbar/>
            <div className="lg:px-36 md:px-24 sm:px-8 py-8">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;