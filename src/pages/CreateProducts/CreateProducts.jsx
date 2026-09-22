import React from 'react';

const CreateProducts = () => {

    const handleOnSubmit=e=>{
        e.preventDefault();
        console.log("form submited")
    }
    return (
        <div className='bg-gray-100 py-12'>
           <div>

            <h2 className='text-center font-bold text-4xl mb-6'>Create <span className='text-yellow-500'>a Product</span></h2>
            <div className='w-8/12 mx-auto bg-white px-10 py-7 rounded-lg'>
                 <form onSubmit={handleOnSubmit}>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2">

            {/* Title */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Yamaha FZ Guitar for Sale"
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Category
              </label>

              <select
                name="category"
                className="select select-bordered select-sm w-full"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select a Category
                </option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="vehicles">Vehicles</option>
                <option value="sports">Sports</option>
                <option value="books">Books</option>
                <option value="furniture">Furniture</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Min Price You want to Sale ($)
              </label>

              <input
                type="number"
                name="price_min"
                placeholder="e.g. 18.5"
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Max Price You want to Sale ($)
              </label>

              <input
                type="number"
                name="price_max"
                placeholder="Optional (default = Min Price)"
                className="input input-bordered input-sm w-full"
              />
            </div>

            {/* Product Condition */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Product Condition
              </label>

              <div className="flex h-8 items-center gap-6">
                <label className="flex cursor-pointer items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="condition"
                    value="Brand New"
                    className="radio radio-primary radio-xs"
                    defaultChecked
                  />
                  Brand New
                </label>

                <label className="flex cursor-pointer items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="condition"
                    value="Used"
                    className="radio radio-primary radio-xs"
                  />
                  Used
                </label>
              </div>
            </div>

            {/* Product Usage Time */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Product Usage Time
              </label>

              <input
                type="text"
                name="usage_time"
                placeholder="e.g. 1 year 3 month"
                className="input input-bordered input-sm w-full"
              />
            </div>

            {/* Product Image URL */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Your Product Image URL
              </label>

              <input
                type="url"
                name="image"
                placeholder="https://..."
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            {/* Seller Name */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Seller Name
              </label>

              <input
                type="text"
                name="seller_name"
                placeholder="e.g. Artisan Roasters"
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            {/* Seller Email */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Seller Email
              </label>

              <input
                type="email"
                name="seller_email"
                placeholder="hello1235@nrlord.com"
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            {/* Seller Contact */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Seller Contact
              </label>

              <input
                type="tel"
                name="seller_contact"
                placeholder="e.g. +1-555-1234"
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            {/* Seller Image */}
            <div>
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Seller Image URL
              </label>

              <input
                type="url"
                name="seller_image"
                placeholder="https://..."
                className="input input-bordered input-sm w-full"
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="City, Country"
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-[10px] font-medium text-gray-700">
                Simple Description about your Product
              </label>

              <textarea
                name="description"
                rows="4"
                placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough....."
                className="textarea textarea-bordered w-full text-xs"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="btn w-full border-0 bg-gradient-to-r from-yellow-500 to-yellow-400 text-xs text-white hover:from-yellow-600 hover:to-yellow-500"
              >
                Create A Product
              </button>
            </div>

          </div>
        </form>
            </div>
           </div>
        </div>
    );
};

export default CreateProducts;