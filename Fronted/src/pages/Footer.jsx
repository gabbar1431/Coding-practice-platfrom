import React from "react";
import { useNavigate, NavLink } from 'react-router';

export default function Footer() {
  return (
    <section className="relative w-full flex items-center justify-center min-h-[450px] bg-gradient-to-br from-orange-500 via-pink-700 to-pink-900 overflow-hidden mt-10">
      {/* Background bubbles */}
      <span className="absolute left-16 top-12 w-56 h-56 rounded-full bg-orange-200 opacity-25"></span>
      <span className="absolute right-10 bottom-10 w-40 h-40 rounded-full bg-pink-200 opacity-20"></span>
      <span className="absolute left-1/2 top-1/2 w-24 h-24 rounded-full bg-pink-100 opacity-15 -translate-x-1/2 -translate-y-1/2"></span>
      
      <div className="w-full max-w-4xl z-10 flex flex-col items-center justify-center py-24 px-2">
        <h2 className="text-white text-5xl md:text-6xl font-extrabold mb-7 text-center">
          Ready to Start Your Journey?
        </h2>
        <div className="text-white text-xl text-center mb-14">
          Join millions of developers who are improving their skills and landing their dream jobs<br />with our platform.
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <NavLink to ="/home">
            <button className="text-orange-500 bg-white font-bold text-xl px-10 py-5 rounded-2xl shadow hover:scale-105 transition flex items-center gap-2">
            Start Practicing Now 
            <span>
              <svg className="w-6 h-6 fill-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,20A8,8,0,1,0,4,12,8,8,0,0,0,12,20Zm0-3.13c.34,0,2.08-.71,2.65-.94a4,4,0,0,0,2.35-2.9A5.93,5.93,0,0,1,12,16.07a5.94,5.94,0,0,1-5-2.06,4,4,0,0,0,2.35,2.9C9.92,16.16,11.66,16.87,12,16.87Zm0-8.62A2.25,2.25,0,1,1,9.75,10.5,2.25,2.25,0,0,1,12,8.25Z" /></svg>
            </span>
          </button>
        </NavLink>
         <NavLink to="/signup">
           <button className="border-2 border-white text-white font-bold text-xl px-10 py-5 rounded-2xl hover:bg-white/20 transition flex items-center gap-2">
            Create Account
            <span>
              <svg className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,20A8,8,0,1,0,4,12,8,8,0,0,0,12,20Zm0-3.13c.34,0,2.08-.71,2.65-.94a4,4,0,0,0,2.35-2.9A5.93,5.93,0,0,1,12,16.07a5.94,5.94,0,0,1-5-2.06,4,4,0,0,0,2.35,2.9C9.92,16.16,11.66,16.87,12,16.87Zm0-8.62A2.25,2.25,0,1,1,9.75,10.5,2.25,2.25,0,0,1,12,8.25Z" /></svg>
            </span>
          </button>
         </NavLink>
        </div>
      </div>
    </section>
  );
}
