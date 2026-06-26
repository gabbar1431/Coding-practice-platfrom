


// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice';

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Minimum character should be 3"),
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(8, "Password is too weak")
// });

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(signupSchema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-6"
//       style={{
//         background: 'linear-gradient(135deg, hsla(187, 94%, 50%, 1) 30%, hsla(144, 84%, 55%, 1) 79%)',
//         backgroundAttachment: 'fixed',
//         animation: 'fadeIn 1s ease-in forwards'
//       }}
//     >
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px);}
//           to { opacity: 1; transform: translateY(0);}
//         }
//       `}</style>
//       <div className="card w-96 bg-white bg-opacity-80 shadow-2xl backdrop-blur-lg border-2 border-white border-opacity-25 animate-fadeIn">
//         <div className="card-body">
//           <h2 className="card-title justify-center text-4xl font-extrabold text-green-800 mb-6 select-none">
//             Leetcode
//           </h2>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* First Name */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-green-700 font-semibold">First Name</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="John"
//                 className={`input input-bordered w-full bg-white bg-opacity-90 text-black placeholder-green-600 placeholder-opacity-70 ${
//                   errors.firstName ? 'input-error border-red-500' : 'border-green-300'
//                 }`}
//                 {...register('firstName')}
//               />
//               {errors.firstName && (
//                 <span className="text-red-600 text-xs mt-1">{errors.firstName.message}</span>
//               )}
//             </div>

//             {/* Email */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text text-green-700 font-semibold">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 className={`input input-bordered w-full bg-white bg-opacity-90 text-black placeholder-green-600 placeholder-opacity-70 ${
//                   errors.emailId ? 'input-error border-red-500' : 'border-green-300'
//                 }`}
//                 {...register('emailId')}
//               />
//               {errors.emailId && (
//                 <span className="text-red-600 text-xs mt-1">{errors.emailId.message}</span>
//               )}
//             </div>

//             {/* Password */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text text-green-700 font-semibold">Password</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="••••••••"
//                   className={`input input-bordered w-full pr-10 bg-white bg-opacity-90 text-black placeholder-green-600 placeholder-opacity-70 ${
//                     errors.password ? 'input-error border-red-500' : 'border-green-300'
//                   }`}
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-700 hover:text-green-900 transition"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 >
//                   {showPassword ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <span className="text-red-600 text-xs mt-1">{errors.password.message}</span>
//               )}
//             </div>

//             {/* Submit button */}
//             <div className="form-control mt-8 flex justify-center">
//               <button
//                 type="submit"
//                 className={`btn bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold shadow-lg hover:from-green-500 hover:via-green-600 hover:to-green-700 transition ${
//                   loading ? 'loading btn-disabled opacity-70' : ''
//                 }`}
//                 disabled={loading}
//               >
//                 {loading ? 'Signing Up...' : 'Sign Up'}
//               </button>
//             </div>
//           </form>

          {/* Redirect to login */}
          // <div className="text-center mt-6">
          //   <span className="text-sm text-green-900 select-none">
          //     Already have an account?{' '}
          //     <NavLink to="/login" className="link link-primary font-semibold">
          //       Login
          //     </NavLink>
          //   </span>
          // </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-0"
      style={{
        background: "linear-gradient(120deg,#e7e3fa 0%,#e6f2ff 55%,#fce7fa 100%)",
        animation: 'fadeIn 1s ease-in forwards'
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
      <div className="flex flex-col md:flex-row w-full md:max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-0 bg-transparent">
        {/* Left: Feature section */}
        <div className="flex-1 flex flex-col justify-center px-7 py-10 md:p-12 bg-transparent">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 text-black leading-snug">Create your account</h1>
          <p className="text-lg text-gray-700 mb-8">
            Sign up in seconds. Beautiful design. Smooth animations. Production ready.
          </p>
          <div className="flex gap-6 flex-wrap mt-2">
            <div className="bg-black/80 rounded-xl  shadow p-4 w-60">
              <span className="font-bold block mb-2">Fast sign up</span>
              <span className="text-gray-600 text-sm">Create an account in seconds.</span>
            </div>
            <div className="bg-pink-400 rounded-xl shadow p-4 w-60">
              <span className="font-bold block mb-2">Beautiful UI</span>
              <span className="text-gray-600 text-sm">Modern, clean and accessible.</span>
            </div>
            <div className="bg-cyan-300 rounded-xl shadow p-4 w-60">
              <span className="font-bold block mb-2">Subtle animations</span>
              <span className="text-gray-600 text-sm">Smooth, delightful motion.</span>
            </div>
          </div>
        </div>
        {/* Right: Glass form card */}
        <div
          className="flex-1 py-12 px-6 md:p-12 bg-white/60 rounded-3xl backdrop-blur-2xl flex flex-col justify-center shadow-lg"
          style={{
            background: "linear-gradient(135deg,#eedcff 60%,#f9d7ec 100%)",
            minWidth: 350,
            maxWidth: 430,
          }}
        >
          <form className="space-y-7" onSubmit={handleSubmit((data) => dispatch(registerUser(data)))}>
            {/* Name Field */}
            <div>
              <label htmlFor="firstName" className="font-medium text-sm text-gray-700 block mb-2">Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 21v-2a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v2"/><circle cx="12" cy="7" r="4" stroke="#aaa" strokeWidth="2"/></svg>
                </span>
                <input
                  type="text"
                  id="firstName"
                  autoComplete="name"
                  placeholder="Your full name"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white bg-opacity-80 border-none shadow-sm text-black text-base focus:ring-2 focus:ring-purple-200 placeholder-gray-400 ${errors.firstName ? 'ring-2 ring-pink-400' : ''}`}
                  {...register('firstName')}
                />
              </div>
              {errors.firstName && (
                <span className="text-pink-500 text-xs mt-2 block">{errors.firstName.message}</span>
              )}
            </div>
            {/* Email Field */}
            <div>
              <label htmlFor="emailId" className="font-medium text-sm text-gray-700 block mb-2">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="4" stroke="#aaa" strokeWidth="2"/><path stroke="#aaa" strokeWidth="2" d="M3 7l9 7 9-7"/></svg>
                </span>
                <input
                  type="email"
                  id="emailId"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white bg-opacity-80 border-none shadow-sm text-black text-base focus:ring-2 focus:ring-purple-200 placeholder-gray-400 ${errors.emailId ? 'ring-2 ring-pink-400' : ''}`}
                  {...register('emailId')}
                />
              </div>
              {errors.emailId && (
                <span className="text-pink-500 text-xs mt-2 block">{errors.emailId.message}</span>
              )}
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="font-medium text-sm text-gray-700 block mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#aaa" strokeWidth="2" d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path stroke="#aaa" strokeWidth="2" d="M2.5 12C4.5 7.5 8.5 5 12 5c3.5 0 7.5 2.5 9.5 7-2 4.5-6 7-9.5 7a9.49 9.49 0 01-9.5-7z"/></svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  placeholder="Minimum 6 characters"
                  className={`w-full pl-12 pr-12 py-4 rounded-xl bg-white bg-opacity-80 border-none shadow-sm text-black text-base focus:ring-2 focus:ring-purple-200 placeholder-gray-400 ${errors.password ? 'ring-2 ring-pink-400' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    // Eye open
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#888" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke="#888" strokeWidth="2" d="M2.5 12C4.5 7.5 8.5 5 12 5c3.5 0 7.5 2.5 9.5 7-2 4.5-6 7-9.5 7a9.49 9.49 0 01-9.5-7z"/></svg>
                  ) : (
                    // Eye closed
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#888" strokeWidth="2" d="M16 12a4 4 0 1 1-8 0"/><path stroke="#888" strokeWidth="2" d="M3 3l18 18"/><path stroke="#888" strokeWidth="2" d="M21 21L3 3"/></svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-pink-500 text-xs mt-2 block">{errors.password.message}</span>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl font-semibold text-lg shadow-xl bg-gradient-to-r from-[#a767e5] to-[#f95cc5] hover:from-[#ad5ffb] hover:to-[#fb83cf] transition hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#e3c7fb] text-white"
              style={{
                background: "linear-gradient(90deg,#a767e5 0%,#f95cc5 100%)"
              }}
            >
              {loading ? 'Signing Up...' : 'Sign up'}
            </button>
          </form>
            <div className="text-center mt-6">
            <span className="text-sm text-green-900 select-none">
              Already have an account?{' '}
              <NavLink to="/login" className="link link-primary font-semibold">
                Login
              </NavLink>
            </span>
          </div>
          <div className="mt-7 text-center text-xs text-gray-500">
            By signing up you agree to our <span className="underline cursor-pointer text-gray-700">Terms</span> and <span className="underline cursor-pointer text-gray-700">Privacy Policy</span>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

