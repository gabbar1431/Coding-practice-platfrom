import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';

// Validation schema
const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate('/home');
      // dispatch(checkAuth());
    }
  }, [isAuthenticated, navigate]);

 


 const onSubmit = (data) => {
    dispatch(loginUser(data));

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(90deg, hsla(187,94%,50%,1) 30%, hsla(144,84%,55%,1) 79%)',
        backgroundAttachment: 'fixed',
        animation: 'fadeIn 1s ease-in forwards'
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
      <div className="card w-96 bg-white bg-opacity-80 shadow-2xl backdrop-blur-lg border-2 border-white border-opacity-25 animate-fadeIn">
        <div className="card-body">
          <h2 className="card-title justify-center text-4xl font-bold text-purple-700 mb-6">
            Leetcode
          </h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-purple-600 font-semibold">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full bg-white bg-opacity-80 text-black ${errors.emailId ? 'input-error border-red-500' : 'border-purple-300'}`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-red-500 text-xs mt-1">{errors.emailId.message}</span>
              )}
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text text-purple-600 font-semibold">
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`input input-bordered w-full pr-10 bg-white bg-opacity-80 text-black ${errors.password ? 'input-error border-red-500' : 'border-purple-300'}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-purple-500"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
              )}
            </div>
            <div className="form-control mt-8 flex justify-center">
              <button
                type="submit"
                className={`btn btn-primary bg-gradient-to-r via-green-400 text-white shadow-lg hover:from-green-500 hover:to-pink-500 transition ${loading ? 'loading btn-disabled opacity-50' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Logging in...
                  </>
                ) : 'Login'}
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <NavLink to="/signup" className="link link-primary text-purple-600 font-semibold">
                Sign Up
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
