import { LiaUniversitySolid } from "react-icons/lia";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { FaRegLightbulb, FaRegMoon } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "./Layout";

const Navbar = () => {
  const navigate = useNavigate();
  const {isThemeDark, setThemeDark} = useContext(ThemeContext)

    return (
  <div className={isThemeDark ? 'navbar bg-base-300 shadow-sm w-full' : 'navbar bg-blue-400 shadow-sm w-full' }>
        <div className="navbar-start">
            <Sidebar/>
        </div>
    <div className="lg:navbar-center">
      <a className={`btn btn-ghost text-xl ${isThemeDark ? 'text-blue-400 hover:text-blue-100' : 'text-amber-50 hover:text-blue-400'}`} onClick={()=> navigate('/')}><LiaUniversitySolid className="size-8" />University</a>
    </div>
    <div className="navbar-end">
      <button className="btn btn-ghost btn-circle md:block hidden" onClick={()=> setThemeDark((prevState: boolean)=> !prevState)}>
        <div className="indicator">
        {isThemeDark ?  <FaRegLightbulb /> : <FaRegMoon className={`${isThemeDark ? '' : 'text-white'}`} />}
        </div>
      </button>
      <div>
        <div className="avatar px-8">
          <div className="w-8 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};
export default Navbar;