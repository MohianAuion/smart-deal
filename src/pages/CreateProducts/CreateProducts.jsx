import React, { use, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CreateProducts = () => {
  const { user } = use(AuthContext);
 
  const navigate=useNavigate();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleCreateProduct = (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");


    const productData = {
      title: e.target.title.value,
      price_min: Number(e.target.priceMin.value),
      price_max: Number(e.target.priceMax.value),
      category: e.target.category.value,
      condition: e.target.condition.value,
      usage: e.target.usage.value,
      location: e.target.location.value,
      image: e.target.image.value,
      description: e.target.description.value,
      seller_contact: e.target.contact.value,

      // Seller Info
      email: user?.email,
      seller_email: user?.email,
      seller_name: user?.displayName,
      seller_image: user?.photoURL,

      // Auto Fields
      posted_date: new Date().toLocaleDateString(),
      status: "pending",
      sale_status: "On Sale",
    };

   fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productData),
      })
      .then(res=>res.json())
      .then(data=>{
 if (data.insertedId) {
  console.log(data)
        setSuccess("Product added successfully!");
        Swal.fire({
  title: "Your Product has been Created Successfully!",
  icon: "success",
  draggable: true,
  confirmButtonColor: "#eab308",
  confirmButtonText: "Okay"
});
       navigate("/myproducts");
      }
      })
      .catch(()=>{
        setError("Failed to add product.");
      }) 
  };

  return (
    <div className="bg-base-200 min-h-screen py-10">
      <div className="w-11/12 md:w-8/12 mx-auto">
        <div className="bg-base-100 shadow-xl rounded-lg p-8 border border-gray-200">

          <h2 className="text-4xl text-black font-bold text-center mb-6">
            Create Your Product
          </h2>

          <form onSubmit={handleCreateProduct}>

            <div className="grid md:grid-cols-2 gap-4">

              {/* Title */}
              <div>
                <label className="label">Product Title</label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered w-full"
                  placeholder="Enter product title"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="label">Category</label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Category</option>
                  <option>Electronics</option>
                  <option>Mobile</option>
                  <option>Furniture</option>
                  <option>Home Appliances</option>
                  <option>Vehicles</option>
                  <option>Fashion</option>
                  <option>Sports</option>
                </select>
              </div>

              {/* Price Min */}
              <div>
                <label className="label">Minimum Price</label>
                <input
                  type="number"
                  name="priceMin"
                  className="input input-bordered w-full"
                  placeholder="Minimum price"
                  required
                />
              </div>

              {/* Price Max */}
              <div>
                <label className="label">Maximum Price</label>
                <input
                  type="number"
                  name="priceMax"
                  className="input input-bordered w-full"
                  placeholder="Maximum price"
                  required
                />
              </div>

              {/* Condition */}
              <div>
                <label className="label">Condition</label>
                <select
                  name="condition"
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Condition</option>
                  <option>new</option>
                  <option>used</option>
                </select>
              </div>

              {/* Usage */}
              <div>
                <label className="label">Usage</label>
                <input
                  type="text"
                  name="usage"
                  className="input input-bordered w-full"
                  placeholder="Example: 1 year old"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="input input-bordered w-full"
                  placeholder="Dhaka, Bangladesh"
                  required
                />
              </div>

              {/* Contact */}
              <div>
                <label className="label">Seller Contact</label>
                <input
                  type="text"
                  name="contact"
                  className="input input-bordered w-full"
                  placeholder="+8801XXXXXXXXX"
                  required
                />
              </div>

            </div>

            {/* Image */}
            <div className="mt-4">
              <label className="label">Image URL</label>
              <input
                type="text"
                name="image"
                className="input input-bordered w-full"
                placeholder="Paste image URL"
                required
              />
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="label">Description</label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full h-32"
                placeholder="Write product description..."
                required
              ></textarea>
            </div>

            {/* Messages */}
            {success && (
              <p className="text-green-500 mt-3">{success}</p>
            )}

            {error && (
              <p className="text-red-500 mt-3">{error}</p>
            )}

            <button className="btn btn-warning w-full mt-6">
              Add Product
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;