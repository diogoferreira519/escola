import { FaUniversity } from 'react-icons/fa';
import { IoIosHome, IoMdMenu } from 'react-icons/io';
import { IoPersonSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();
    return (
        <>
    <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <label htmlFor="my-drawer"><IoMdMenu className="pt-2 size-12 rounded-sm"/></label>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-300 text-base-content min-h-full w-60 p-4">
            {/* Sidebar content here */}
            <li className="font-light text-xl"onClick={()=> navigate('/')}><a><IoIosHome className='text-blue-500' />Home</a></li>
            <li className="font-light text-xl"onClick={()=> navigate('/pessoas')}><a><IoPersonSharp className='text-blue-500'/>Pessoas</a></li>
            <li className="font-light text-xl"onClick={()=> navigate('/cursos')}><a> <FaUniversity className='text-blue-500'/>Cursos</a></li>
            </ul>
        </div>
        </div>
        </>
    );
}
export default Sidebar;