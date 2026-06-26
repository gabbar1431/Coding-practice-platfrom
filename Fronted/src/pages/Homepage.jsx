
// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all',
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]);
//   };

//   const filteredProblems = problems.filter((problem) => {
//     const difficultyMatch =
//       filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//     const statusMatch =
//       filters.status === 'all' ||
//       (filters.status === 'solved' &&
//         solvedProblems.some((sp) => sp._id === problem._id));
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <div className="min-h-screen bg-[#f7f8fa] text-[#1e1e1e]">
//       {/* Navbar */}
//       <nav className="navbar bg-white shadow-md px-6 py-3 flex justify-between items-center border-b">
//         <NavLink to="/" className="text-2xl font-bold text-[#f89f1b]">
//           LeetCode 
//         </NavLink>
//         <div className="flex items-center gap-4">
//           <span className="font-medium text-gray-700">{user?.firstName}</span>
//           <div className="dropdown dropdown-end">
//             <label
//               tabIndex={0}
//               className="btn btn-sm bg-[#a78553] text-white hover:bg-[#e88f14]"
//             >
//               Menu
//             </label>
//             <ul
//               tabIndex={0}
//               className="dropdown-content z-[1] menu p-2 shadow  rounded-box w-40 bg-pink-300"
//             >
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>
//               {user?.role === 'admin' && (
//                 <li>
//                   <NavLink to="/admin">Admin</NavLink>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-5xl mx-auto p-6">
//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           <select
//             className="select select-bordered w-40 bg-cyan-300"
//             value={filters.status}
//             onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved</option>
//           </select>

//           <select
//             className="select select-bordered w-40 bg-green-300"
//             value={filters.difficulty}
//             onChange={(e) =>
//               setFilters({ ...filters, difficulty: e.target.value })
//             }
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select
//             className="select select-bordered w-40 bg-emerald-300"
//             value={filters.tag}
//             onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problems List */}
//         <div className="space-y-4">
//           {filteredProblems.map((problem) => (
//             <div
//               key={problem._id}
//               className="bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition duration-300 p-5 border border-gray-200"
//             >
//               <div className="flex justify-between items-center">
//                 <NavLink
//                   to={`/problem/${problem._id}`}
//                   className="text-lg font-semibold text-[#2563eb] hover:underline"
//                 >
//                   {problem.title}
//                 </NavLink>
//                 {solvedProblems.some((sp) => sp._id === problem._id) && (
//                   <div className="badge bg-green-500 text-white px-3 py-1">
//                     Solved
//                   </div>
//                 )}
//               </div>

//               <div className="mt-3 flex flex-wrap gap-2">
//                 <span
//                   className={`badge px-3 py-2 font-medium ${getDifficultyBadgeColor(
//                     problem.difficulty
//                   )}`}
//                 >
//                   {problem.difficulty}
//                 </span>
//                 <span className="badge bg-gray-200 text-gray-700 px-3 py-2">
//                   {problem.tags}
//                 </span>
//               </div>
//             </div>
//           ))}

//           {filteredProblems.length === 0 && (
//             <div className="text-center text-gray-500 text-lg mt-10">
//               No problems found with selected filters.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case 'easy':
//       return 'bg-green-100 text-green-700 border border-green-300';
//     case 'medium':
//       return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
//     case 'hard':
//       return 'bg-red-100 text-red-700 border border-red-300';
//     default:
//       return 'bg-gray-100 text-gray-700 border border-gray-300';
//   }
// };

// export default Homepage;
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all',
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  // Stats
  const totalSolved = solvedProblems.length;
  const totalProblems = problems.length;
  const easySolved = solvedProblems.filter(p => p.difficulty === 'easy').length;
  const mediumSolved = solvedProblems.filter(p => p.difficulty === 'medium').length;
  const hardSolved = solvedProblems.filter(p => p.difficulty === 'hard').length;
  const progress = totalProblems ? Math.round((totalSolved / totalProblems) * 100) : 0;

  // Table Data
  const filteredProblems = problems.filter((problem) => {
    const difficultyMatch =
      filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch =
      filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch =
      filters.status === 'all' ||
      (filters.status === 'solved' &&
        solvedProblems.some((sp) => sp._id === problem._id));
    return difficultyMatch && tagMatch && statusMatch;
  });

  return (
    <div
      className="min-h-screen bg-[#f6f8fa] text-[#1e1e1e] animate-fadeIn"
      style={{ animationDuration: '1s', animationTimingFunction: 'ease-in' }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Navbar */}
   <nav
  className="navbar bg-white px-6 py-3 mb-6 flex justify-between items-center border-b border-gray-200 shadow-md shadow-gray-300"
  style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 1px 3px -1px rgba(0,0,0,0.06)' }}
>
  <NavLink
    to="/"
    className="text-2xl font-bold text-[#2563eb] hover:text-[#1746a7] transition-colors duration-300"
  >
    LeetCode
  </NavLink>

  <div className="flex items-center gap-4">
    <span className="font-medium text-gray-700 select-none">{user?.firstName}</span>
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-sm bg-gradient-to-r from-[#f89f1b] to-[#e88f14] text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#e88f14]"
      >
        Menu
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-lg rounded-box w-40 bg-pink-300"
      >
        <li>
          <button className="hover:bg-pink-400 rounded transition" onClick={handleLogout}>
            Logout
          </button>
        </li>
        {user?.role === 'admin' && (
          <li>
            <NavLink className="hover:bg-pink-400 rounded transition" to="/admin">
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>



      {/* Top stats/card panel */}
      <div className="max-w-7xl mx-auto mt-10 mb-4">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div>
            <span className="text-3xl font-bold mb-1 block">Problems</span>
            <span className="text-gray-500 text-lg block mb-3">
              Solve problems to improve your coding skills
            </span>
            <div className="w-full mt-4">
              <div className="flex items-center justify-between mb-1 text-xs text-gray-600 font-medium">
                <span>{totalSolved} of {totalProblems} problems solved ({progress}%)</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-8 mt-5 md:mt-0 text-center">
            <div>
              <span className="block text-3xl font-bold text-green-600">{easySolved}</span>
              <span className="text-gray-500 text-md">Easy</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-orange-400">{mediumSolved}</span>
              <span className="text-gray-500 text-md">Medium</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-red-400">{hardSolved}</span>
              <span className="text-gray-500 text-md">Hard</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-blue-600">{totalSolved}</span>
              <span className="text-gray-500 text-md">Total Solved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto mb-6 px-2">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-4">
            <select
              className="select select-bordered w-44 bg-cyan-300"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Problems</option>
              <option value="solved">Solved</option>
            </select>
            <select
              className="select select-bordered w-44 bg-green-300"
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select
              className="select select-bordered w-44 bg-emerald-300"
              value={filters.tag}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            >
              <option value="all">All Tags</option>
              <option value="array">Array</option>
              <option value="linkedList">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">DP</option>
            </select>
          </div>
          <input
            type="text"
            className="input input-bordered w-72 bg-white"
            placeholder="Search problems..."
            onChange={(e) => {
              setFilters({ ...filters, search: e.target.value.trim().toLowerCase() });
            }}
          />
        </div>
      </div>

      {/* Problems Table List */}
      <div className="max-w-7xl mx-auto px-2">
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-100">
          <table className="table w-full">
            <thead className="bg-[#22c6b3] text-md font-semibold">
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Category</th>
                <th>Acceptance</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem, idx) => {
                const isSolved = solvedProblems.some(sp => sp._id === problem._id);
                const acceptance = problem.acceptanceRate
                  ? `${problem.acceptanceRate.toFixed(1)}%`
                  : 'N/A';
                return (
                  <tr
                    key={problem._id}
                    className="hover:bg-gray-50 hover:shadow-lg transform hover:scale-[1.02] transition duration-300"
                  >
                    <td>
                      {isSolved ? (
                        <span className="rounded-full bg-green-100 text-green-600 p-1 px-3 font-medium text-sm">
                          &#10003;
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-200 text-gray-400 p-1 px-3 font-medium text-sm">
                          &bull;
                        </span>
                      )}
                    </td>
                    <td>
                      <NavLink
                        to={`/problem/${problem._id}`}
                        className="font-semibold text-xl text-[#2563eb] hover:underline"
                      >
                        {idx + 1}. {problem.title}
                      </NavLink>
                    </td>
                    <td>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyBadgeColor(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty.charAt(0).toUpperCase() +
                          problem.difficulty.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                        {problem.tags.charAt(0).toUpperCase() + problem.tags.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">{acceptance}</span>
                        <div className="h-2 w-16 rounded bg-gray-200 overflow-hidden">
                          <div
                            style={{ width: acceptance !== 'N/A' ? acceptance : '0%' }}
                            className="h-2 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredProblems.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-6">
                    No problems found with selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Color badge utility for difficulty
const getDifficultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-100 text-green-700 border border-green-300';
    case 'medium':
      return 'bg-orange-100 text-orange-600 border border-orange-300';
    case 'hard':
      return 'bg-red-100 text-red-700 border border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-300';
  }
};

export default Homepage;
