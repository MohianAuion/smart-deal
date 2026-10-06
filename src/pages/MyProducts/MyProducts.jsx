import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';


const MyProducts = () => {
    const{user}=use(AuthContext);
    const showModalRef=useRef(null);
    const[myProducts, setMyProducts]=useState([]);
    const[editedProduct, setEditedProduct]=useState([]);
  

  useEffect(()=>{

    if(user?.email){
 fetch(`http://localhost:3000/products?email=${user.email}`)
    .then(res=>res.json())
    .then(data=>{
        console.log("my product data", data);
        setMyProducts(data);
    })
    }
     
  }
    ,[user?.email])

    // handle edit
    const handleEdit=(myProduct)=>{
      setEditedProduct(myProduct);
      showModalRef.current.showModal();
      console.log(editedProduct);


    }

    // handle update
const handleUpdateProduct=(e)=>{
  e.preventDefault();
 

  const editedData = {

        
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
      }

       fetch(`http://localhost:3000/products/${editedProduct._id}`,{
     method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(editedData)
})
.then(res=>res.json())
.then(data=>{
console.log("edit my product", data);
if(data.modifiedCount){
  const editedProducts= myProducts.map(product=> product._id===editedProduct._id? {...product, ...editedData} : product );

  setMyProducts(editedProducts);
  e.target.reset()
  showModalRef.current.close();
}
})
}

    // handle delete
    const handleDelete=(_id)=>{
        
      Swal.fire({
           title: "Are you sure?",
           text: "You won't be able to revert this!",
           icon: "warning",
           showCancelButton: true,
           confirmButtonColor: "#22c55e",
           cancelButtonColor: "#d33",
           confirmButtonText: "Yes, delete it!",
         }).then((result) => {
           if (result.isConfirmed) {
             fetch(`http://localhost:3000/products/${_id}`, {
               method: "DELETE",
             })
               .then((res) => res.json())
               .then((data) => {
                 console.log("product deleted", data);
                 if (data.deletedCount) {
                   Swal.fire({
                     title: "Deleted!",
                     text: "Your product has been deleted.",
                     icon: "success",
                     confirmButtonColor: "#FFCA28",
                   });
                   const remainingProduct = myProducts.filter((product) => product._id !== _id);
                   setMyProducts(remainingProduct);
                 }
               });
           }
         });
    }

    const handleModalClose=e=>{
      e.preventDefault();
      showModalRef.current.close()
    }

    return (
        <div className='bg-gray-100 py-14'>
      <div className='w-10/12 mx-auto'>

          <h2 className='text-center text-4xl font-bold'>My Products : {myProducts.length}</h2>
         {/* table */}
               <div className="overflow-x-auto mt-4">
                 <table className="table table-fixed w-full bg-white">
                   {/*column widths */}
                   <colgroup>
                     <col style={{ width: "7%" }} />
                     <col style={{ width: "13%" }} />
                     <col style={{ width: "25%" }} />
                     <col style={{ width: "10%" }} />
                     <col style={{ width: "15%" }} />
                     <col style={{ width: "10%" }} />
                     <col style={{ width: "20%" }} />
                   </colgroup>
       
                   {/* column head */}
                   <thead>
                     <tr className='text-center'>
                       <th>SL No.</th>
                       <th>Image</th>
                       <th>Product Name</th>
                       <th>Category</th>
                       <th>Price Range</th>
                       <th>Status</th>
                       <th>Actions</th>
                     </tr>
                   </thead>
       
                   <tbody>
                     {myProducts.map((myProduct, index) => (
                       <tr key={myProduct._id}>
                         {/* sl no */}
                         <td className="text-center text-gray-600 font-bold">{index + 1}</td>
       
                         {/* product image */}
                         <td>
                        
                             <div className="avatar shrink-0 flex justify-center">
                               <div className=" h-12 w-12 rounded-md">
                                 <img src={myProduct.image} alt="product image" />
                               </div>
                               </div>
                          
       
                             
                         </td>
       
                         {/* product name */}
                         <td>
                               <div className="font-bold truncate text-center text-gray-700">
                                 {myProduct.title}
                               </div>
                              
                         </td>
{/* product category */}
                         <td>

                               <div className="font-bold truncate text-center text-gray-700">
                                {myProduct.category}
                               </div>
                              
                         </td>
       
                         {/* product price */}
                         <td className='text-center'>
                           <span className="badge badge-ghost badge-sm text-green-500 font-semibold"> $
                            {myProduct.price_min} - {myProduct.price_max}
                           </span>
                         </td>
       
                         {/* status */}
                         <td className='text-center'>
                           <button className="badge badge-warning">
                             {myProduct.status}
                           </button>
                         </td>
       
                         {/* actions */}
                         <td>
                           <div className='flex justify-center gap-2'>
                            <button onClick={()=>handleEdit(myProduct)}
                             className="btn btn-outline text-green-500 border-green-500"
                           >
                             Edit
                           </button>
                           <button onClick={()=>handleDelete(myProduct)}
                             className="btn btn-outline text-red-500 border-red-500"
                           >
                             Delete
                           </button>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
                 
                 {/* modal */}
                

<dialog ref={showModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-2xl text-center">Update Your Product</h3>
    <div className="modal-action">
      <form method="dialog" onSubmit={handleUpdateProduct}>

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

            {/* Messages
            {success && (
              <p className="text-green-500 mt-3">{success}</p>
            )}

            {error && (
              <p className="text-red-500 mt-3">{error}</p>
            )} */}

            <button className="btn bg-green-500 text-white font-bold w-full mt-6">
              Update Product
            </button>
        {/* if there is a button in form, it will close the modal */}
        <button onClick={handleModalClose} className="btn btn-outline w-full border-red-600 text-red-600 font-bold mt-2">Not Now</button>
      </form>
    </div>
  </div>
</dialog>
               </div>
      </div>
        </div>
    );
};

export default MyProducts;