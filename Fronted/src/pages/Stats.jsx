import React from "react";

export default function Stats() {
  return (
    <main className="pt-15 bg-white min-h-screen overflow-hidden ">
      <section className="max-w-6xl mx-auto flex flex-col items-center py-12">
    
        
       
           <div className="grid grid-cols-1 md:grid-cols-4 gap-60 my-10 h-40">
          {/* Card 1 */}
          <div className="flex flex-col items-center  transition transform hover:scale-109 hover:shadow-lg h-20 ">
            <div className="bg-blue-100 rounded-xl p-6 mb-3 shadow-md">
              <svg className="w-10 h-10 text-blue-500  " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20c0-2.2 2.7-4 6-4s6 1.8 6 4" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-neutral-800">2.8M+</div>
            <span className="text-gray-500">Active Users</span>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center  transition transform hover:scale-109 hover:shadow-lg h-20">
            <div className="bg-green-100 rounded-xl p-6 mb-3 shadow-md  ">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 8v8m5-8v8m5-8v8" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-neutral-800">3,000+</div>
            <span className="text-gray-500">Problems</span>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center  transition transform hover:scale-109 hover:shadow-lg h-20">
            <div className="bg-purple-100 rounded-xl p-6 mb-3 shadow-md">
              <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-neutral-800">50M+</div>
            <span className="text-gray-500">Solutions</span>
          </div>
          {/* Card 4 */}
          <div className="flex flex-col items-center  transition transform hover:scale-109 hover:shadow-lg h-20">
            <div className="bg-orange-100 rounded-xl p-6 mb-3 shadow-md">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="7" width="13" height="13" />
                <rect x="17" y="3" width="4" height="4" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-neutral-800">500+</div>
            <span className="text-gray-500">Companies</span>
          </div>
        </div> 
        {/* Feature Heading */}
        <div className="h-70 bg-gray-100 w-screen mt-20">
  
        <div>
            <h2 className="text-6xl font-bold mb-4 text-center mt-15 text-neutral-800 ">
          Everything You Need to <span className="text-orange-600">Succeed</span>
        </h2>
        </div>
       <div>
         <p className="text-lg text-gray-600 text-center max-w-2xl mt-4 ml-100">
          Our platform provides all the tools and features you need to improve your coding skills and ace technical interviews.
        </p>
       </div>
        </div>
      </section>
    </main>
  );
}
