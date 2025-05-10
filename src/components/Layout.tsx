import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";

export const ThemeContext = React.createContext();
const Layout = ()=> {
    const [isThemeDark, setThemeDark] = useState(true);

    useEffect(()=> {
        document.documentElement.setAttribute("data-theme", isThemeDark ? 'dark' : 'winter')
    }, [isThemeDark])
    return(
        <ThemeContext.Provider value = {{isThemeDark, setThemeDark}}>
            <div className="flex-col w-full h-full">
                <Navbar/>
                <div className="px-4 lg:px-36 md:px-24 sm:px-8 py-8">
                    <Outlet/>
                </div>
            </div>
        </ThemeContext.Provider>
        
    )
}

export default Layout;