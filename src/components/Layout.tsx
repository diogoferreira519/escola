import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"

const Layout = ()=> {
    return(
        <div className="flex w-screen h-screen">
            <Sidebar/>
            <div className="p-12">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;