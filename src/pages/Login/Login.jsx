
import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { PiEyeglassesFill, PiEyeglassesLight } from 'react-icons/pi';
import Loader from '../../components/Loader/Loader';

const Login = () => {
  const {
    signInUser,
    resetPassword,
    signInUserWithGoogle,
    authLoading
  } = use(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();

    setSuccess(false);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // Sign in user
    signInUser(email, password)
      .then(() => {
        navigate(location.state || "/", { replace: true });
      })
      .then(() => {
        setSuccess(true);
        e.target.reset();
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setError("Invalid email or password.");
        } else if (error.code === "auth/too-many-requests") {
          setError("Too many failed attempts. Please try again later.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  };

  // Handle show password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle reset password
  const handleResetPassword = (e) => {
    e.preventDefault();

    const email = e.currentTarget.form.email.value;

    if (!email) {
      return setError("Please enter your email first.");
    }

    resetPassword(email)
      .then(() => {
        alert("Password reset email has been sent. Please check your inbox.");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Login with Google
  const handleGoogleLogin = () => {
    signInUserWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/", { replace: true });
      });
  };

  if (authLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-base-200 mt-5 md:min-h-screen px-4 py-10 sm:py-16 lg:py-20 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">

        <div className="card bg-base-100 shadow-xl sm:shadow-2xl rounded-lg px-3 sm:px-5 py-5 sm:py-7 border border-gray-300">

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
            Login Here
          </h1>

          <p className="text-sm sm:text-base font-medium text-center mt-2">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              state={location.state}
              replace
              className="text-yellow-500 font-bold underline"
            >
              Register Now
            </Link>
          </p>

          <div className="card-body px-1 sm:px-3 py-4">

            <form onSubmit={handleLogin}>
              <fieldset className="fieldset w-full">

                <label className="label text-sm sm:text-base">
                  Email
                </label>

                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  name="email"
                  required
                />

                <label className="label text-sm sm:text-base mt-2">
                  Password
                </label>

                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input w-full pr-12"
                    placeholder="Password"
                    name="password"
                    required
                  />

                  <button
                    onClick={handleShowPassword}
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-xl"
                  >
                    {showPassword
                      ? <PiEyeglassesLight />
                      : <PiEyeglassesFill />
                    }
                  </button>
                </div>

                {success && (
                  <p className="text-green-500 font-bold mt-2 text-sm">
                    You are logged in successfully!
                  </p>
                )}

                {error && (
                  <p className="text-red-500 font-bold mt-2 text-sm break-words">
                    {error}
                  </p>
                )}

                <div className="text-right mt-2">
                  <button
                    onClick={handleResetPassword}
                    type="button"
                    className="link link-hover hover:underline text-sm"
                  >
                    Forgot password?
                  </button>
                </div>

                <button className="btn bg-yellow-500 hover:bg-yellow-400 text-black w-full mt-4">
                  Login
                </button>

              </fieldset>
            </form>

            {/* OR Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-sm font-medium text-gray-700">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Login with Google */}
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5] w-full text-sm sm:text-base"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Login with Google
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

