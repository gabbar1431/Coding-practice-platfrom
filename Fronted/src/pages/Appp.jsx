import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authSlice';



function Appp() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


    const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="font-sans">
      {/* Fixed Navbar */}
      <header
        className={`fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md transition-shadow duration-300 z-50 flex justify-between items-center px-10 py-6 ${
          scrolled ? "shadow-md shadow-black/20" : ""
        }`}
        style={{ height: "80px" }} // fixed header height
      >
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 rounded-xl p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M5 7h14M5 12h14m-7 5h7"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-orange-600">LeetCode</span>
        </div>
        <nav className="flex gap-8 text-gray-800 text-lg font-medium">
          {/* <a href="#">Problems</a> */}
             <NavLink to ="/home">
             Problems
             </NavLink>
          <a href="#">Contest</a>
          <a href="#">Discuss</a>
          <a href="#">Interview</a>
        </nav>
        <div className="flex items-center gap-4">
          {/* <a href="#" className="text-gray-700 font-semibold">
            Sign In
          </a> */}
        {!user &&(
              <NavLink to="/login" className="text-gray-700 font-semibold">
             Sign Up
           </NavLink>
        )
          
        }

       
              {/* <button className="bg-orange-500 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-orange-600">
                 <NavLink to="signup">
                    Register
                    </NavLink>

             </button> */}
             {!user && (
         <button className="bg-orange-500 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-orange-600">
         <NavLink to="signup">
          Register
         </NavLink>
        </button>

      



)}

        {user &&(
       <button className="bg-orange-500 text-white px-5 py-2 rounded-lg font-bold shadow hover:bg-orange-600" onClick={handleLogout}>
            Logout
          </button>     
        )}

        </div>
      </header>

      {/* Content - pad top equal to header height so content is not hidden */}
      <main className="pt-[80px] flex flex-col justify-center px-10 pl-20 h-[600px] w-screen bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-500">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-3 text-white ">
          Master{" "}
          <span className="text-yellow-300">Coding</span> Interviews{" "}
          <span className="text-pink-300">with</span>
        </h1>
        <h2 className="text-5xl font-bold text-white mb-8">Practice</h2>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-10">
          Enhance your programming skills with our vast collection of coding
          challenges. Practice algorithms, data structures, and prepare for
          technical interviews at top companies.
        </p>
        <div className="flex gap-6">
        <NavLink to ="/home">
            <button className="bg-white text-orange-500 font-bold text-lg rounded-xl px-8 py-4 shadow hover:bg-orange-50 hover:scale-105 transition">
            Start Solving &rarr;
          </button>
        </NavLink>
         <NavLink to="/profile">
           <button className="border-2 border-white text-white font-bold text-lg rounded-xl px-8 py-4 hover:bg-white/20 flex items-center gap-2 transition">
            View Profile{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M6 20c0-2.2 2.7-4 6-4s6 1.8 6 4"
              />
            </svg>
          </button>
         </NavLink>
        </div>
      </main>
    </div>
  );
}

export default Appp;

         