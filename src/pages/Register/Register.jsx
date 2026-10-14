
import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { PiEyeglassesFill, PiEyeglassesLight } from "react-icons/pi";
import Loader from "../../components/Loader/Loader";

const Register = () => {
  const {
    createUser,
    updateUser,
    signInUserWithGoogle,
    authLoading
  } = use(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Handle register
  const handleRegister = (e) => {
    e.preventDefault();

    setSuccess(false);
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    console.log(name, email, password, photo);

    // Regex check
    const passwordLength = /^.{8,}$/;
    const passwordCase = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    const specialChar = /[!@#$%^&*]/;

    if (!passwordLength.test(password)) {
      return setError("Password must be at least 8 characters.");
    } else if (passwordCase.test(password)) {
      return setError(
        "Password must contain at least one uppercase and one lowercase letter."
      );
    } else if (!specialChar.test(password)) {
      return setError("Password must contain at least one special character.");
    }

    createUser(email, password)
      .then(() => {
        return updateUser(name, photo);
      })
      .then(() => {
        setSuccess(true);
        navigate(location.state || "/", { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("An account already exists with this email.");
        } else if (error.code === "auth/invalid-email") {
          setError("Please enter a valid email address.");
        } else if (error.code === "auth/network-request-failed") {
          setError("Please check your internet connection.");
        } else {
          setError("Unable to create your account. Please try again.");
        }
      });
  };

  // Handle show password
  const handleShowPassword = () => {
    console.log("showpassword");
    setShowPassword(!showPassword);
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    signInUserWithGoogle()
      .then(() => {
        navigate(location.state || "/", { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (authLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-base-200 mt-5 md:min-h-screen px-4 py-8 sm:py-12 lg:py-16 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">

        <div className="card bg-base-100 shadow-xl sm:shadow-2xl rounded-lg px-3 sm:px-5 py-5 sm:py-7 border border-gray-300">

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
            Register Here
          </h1>

          <p className="text-sm sm:text-base font-medium text-center mt-2">
            Already have an account?{" "}
            <Link
              to="/auth"
              state={location.state}
              className="text-yellow-500 font-bold underline"
            >
              Login Now
            </Link>
          </p>

          <div className="card-body px-1 sm:px-3 py-4">

            <form onSubmit={handleRegister}>
              <fieldset className="fieldset w-full">

                {/* Name */}
                <label className="label text-sm sm:text-base">
                  Name
                </label>

                <input
                  type="text"
                  className="input w-full"
                  placeholder="Your name"
                  name="name"
                  required
                />

                {/* Email */}
                <label className="label text-sm sm:text-base mt-2">
                  Email
                </label>

                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  name="email"
                  required
                />

                {/* Photo URL */}
                <label className="label text-sm sm:text-base mt-2">
                  URL
                </label>

                <input
                  type="text"
                  className="input w-full"
                  placeholder="Photo URL"
                  name="photo"
                />

                {/* Password */}
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
                    {showPassword ? (
                      <PiEyeglassesLight />
                    ) : (
                      <PiEyeglassesFill />
                    )}
                  </button>
                </div>

                {success && (
                  <p className="text-green-500 font-bold mt-2 text-sm">
                    Your account has been registered successfully!
                  </p>
                )}

                {error && (
                  <p className="text-red-500 font-bold mt-2 text-sm break-words">
                    {error}
                  </p>
                )}

                <button className="btn bg-yellow-500 hover:bg-yellow-400 text-black w-full mt-4">
                  Register
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
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
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

export default Register;

