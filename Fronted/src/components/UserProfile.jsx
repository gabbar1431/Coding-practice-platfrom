
import React from 'react';
// User data array example
import UserProfileUpdatePanel from './UserProfileUpdatePanel.jsx';
import {useSelector } from 'react-redux';

function UserProfile() {
const { user } = useSelector((state) => state.auth);

  function handleProfileUpdate(updatedData) {
  // Your logic to handle updated profile data
  console.log('Updated user data:', updatedData);
}




  
  return (
  <div className="fixed top-0 left-0 h-full w-[35vw] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 shadow-lg overflow-y-auto">
    <div className="max-w-full mx-auto my-12 rounded-xl">
      <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 p-6 rounded-b-xl">
        <div className="flex flex-col md:flex-row md:space-x-8 items-center">
          <div className="relative w-28 h-28">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="rounded-full w-full h-full border-4 border-white shadow-xl"
            />
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">{user.firstName}{user.lastName}</h1>
              {user.verified && (
                <span className="bg-green-500 text-xs font-semibold px-2 py-1 rounded-full text-white ml-2">Verified</span>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="bg-blue-100 text-blue-900 rounded px-2 py-1 text-xs">{user.role}</span>
              <span className="text-sm text-white">{user.age} years old</span>
            </div>
            <p className="text-white mt-4 text-sm leading-relaxed">{user.bio}</p>
            <div className="flex space-x-6 mt-4 text-center text-sm">
              <div>
                <p className="font-bold text-blue-200">{user.stats.projects}</p>
                <p className="text-white">Projects</p>
              </div>
              <div>
                <p className="font-bold text-pink-200">{user.stats.followers}</p>
                <p className="text-white">Followers</p>
              </div>
              <div>
                <p className="font-bold text-green-200">{user.stats.rating}</p>
                <p className="text-white">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="font-semibold text-lg mb-3">Skills & Expertise</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {user.skills.map(skill => (
            <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-semibold">{skill}</span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold text-md mb-2">Contact Information</h3>
            <p className="text-sm">{user.email}</p>
            <p className="text-sm">{user.phone}</p>
            <p className="text-sm">{user.location}</p>
          </div>
          <div>
            <h3 className="font-semibold text-md mb-2">Professional Details</h3>
            <p className="text-sm">Member since {user.memberSince}</p>
            <p className="text-sm">{user.available ? "Available for projects" : "Not available"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-md mb-2">Recent Activity</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {user.activities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-md mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-600 shadow text-sm">Edit Personal Information</button>
              <button className="w-full bg-green-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-green-600 shadow text-sm">Update Contact Details</button>
              <button className="w-full bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-purple-600 shadow text-sm">Manage Professional Info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
     <UserProfileUpdatePanel user={user} onSubmit={handleProfileUpdate} />

  </div>
);

}

// To render, for example the first user:


export default UserProfile;


         