import { Link, useLocation } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
export default function Header() {

    const location = useLocation();
  const current = location.pathname; // gives current route
  return (
    <header className="bg-orange-500 text-white shadow-lg px-4">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            URL Shortener
          </Link>
          <nav>
            {current == '/'?
                  <div className='flex items-center gap-1 text-lg'>
                       <Link to="/dashboard" className="text-white hover:opacity-70 transition-colors flex items-center gap-1">
              <MdOutlineDashboard style={{fontSize:'25px'}}/>
              Dashboard 
            </Link>
              </div>:current == '/dashboard'?
            <div className='flex items-center gap-1 text-lg'>
                    <Link to="/" className="text-white hover:opacity-70 transition-colors flex items-center gap-1">
                  <FaHome style={{fontSize:'25px'}}/>
                Home 
              </Link>
              </div>:<div className='flex items-center gap-10'>
              <div className='flex items-center gap-1 text-lg'>
                       <Link to="/dashboard" className="text-white hover:opacity-70 transition-colors flex items-center gap-1">
              <MdOutlineDashboard style={{fontSize:'25px'}}/>
              {/* Dashboard  */}
            </Link>
              </div>
              <div className='flex items-center gap-1 text-lg'>
                    <Link to="/" className="text-white hover:opacity-70 transition-colors flex items-center gap-1">
                  <FaHome style={{fontSize:'25px'}}/>
                {/* Home  */}
              </Link>
              </div>
            </div>
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

