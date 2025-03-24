import { useState } from "react";
import { FaChevronRight, FaUniversity } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <>
        <div className={`transition-all duration-300 ${
          open ? "w-64" : "w-16"} h-full p-5 bg-gradient-to-t from-indigo-800 to-gray-900 flex-col justify-center`}>
            <button onClick={()=>setOpen(!open)}><FaChevronRight className={`text-amber-50 border-amber-50 rounded-full transition-all duration-400 ${open ?? 'rotate-180'}`}/></button>
            <div className="pt-5">
                <div className={`gap-4 transition-all duration-500 ${open ? 'block' : 'hidden'}`} onClick={()=>navigate('/pessoas')}>
                    <h1 className="flex items-center p-2 gap-4 rounded-xl w-full text-lg text-white transition-all duration-400 hover:bg-indigo-900"> <IoPersonSharp /> Pessoa</h1>
                </div>
                <div className={`gap-4 transition-all duration-500 ${open ? 'block' : 'hidden'}`} onClick={()=>navigate('/cursos')}>
                    <h1 className="flex items-center p-2 gap-4 rounded-xl w-full text-lg text-white transition-all duration-400 hover:bg-indigo-900"> <FaUniversity /> Cursos</h1>
                </div>
            </div>
        </div>
        </>
    );
}
export default Sidebar;