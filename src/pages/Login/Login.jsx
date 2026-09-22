import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {

  const{signInUser, signInUserWithGoogle}=use(AuthContext);
  const handleLogin=e=>{
   e.preventDefault();

    
    const email=e.target.email.value;
    const password=e.target.password.value;
    console.log(email, password);

    // sign in user
    signInUser(email, password)
    .then(result=>{
      console.log(result.user);
    })
    .catch(error=>{
      console.log(error.message);
    })
  }

  // login with google
  const handleGoogleLogin=()=>{
    signInUserWithGoogle();
  }
    return (
       <div className=" bg-base-200 min-h-screen ">
  <div className='w-10/12 mx-auto py-36'>
    
     <div className="card bg-base-100 mx-auto max-w-sm shrink-0 shadow-2xl pt-7 rounded-lg px-4 border border-gray-500 ">
         <h1 className="text-4xl font-bold text-center">Login Here</h1>
         <p className='font-medium text-center mt-2'>Don't have an account? <Link to="/auth/register" className='text-yellow-400 font-bold underline'> Register Now</Link></p>
        
      <div className="card-body">
         
        <form onSubmit={handleLogin}>

            <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" name="email" required />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" name="password" required />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn bg-yellow-500 mt-4">Login</button>
        </fieldset>
        </form>

{/* orrrrrrrrr */}
       <div className="flex items-center gap-3 my-2">
    <div className="flex-1 border-t border-gray-300"></div>

    <span className="text-sm font-medium text-gray-700">OR</span>

    <div className="flex-1 border-t border-gray-300"></div>
</div>

        {/* login with Google */}
<button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

      </div>
    </div>
  </div>
</div>
    );
};

export default Login;