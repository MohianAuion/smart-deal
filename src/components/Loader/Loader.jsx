import React from 'react';

const Loader = () => {
    return (
       
 
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="flex flex-col items-center">

        {/* Shopping Bag */}
        <div className="relative">
          <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-4xl">🛍️</span>
          </div>

          {/* Handle */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 
                          w-9 h-7 border-4 border-yellow-400 
                          border-b-0 rounded-t-full">
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-6">
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce"></span>
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>

        <p className="mt-4 text-gray-600 font-medium">
          Finding the best deals for you...
        </p>

      </div>
    </div>


    );
};

export default Loader;