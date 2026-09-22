import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import noImage from "../../assets/noImage.png";


const AllProducts = () => {

   const allProductsdata=useLoaderData();

     const[showAllBids, setShowAllBids]=useState(false);
     const visibleBids= showAllBids? allProductsdata : allProductsdata.slice(0, 9);

    const handleSeeMore=()=>{
        console.log("see more")

        setShowAllBids(!showAllBids);
    }

    return (
        <div className='bg-gray-100 py-14'>

<h2 className='text-center text-4xl font-bold mb-10'>All <span className='text-yellow-500'>Products</span></h2>
       
 <div className='grid grid-cols-3 gap-5 w-10/12 mx-auto'>

     {
    visibleBids.map(product=> <div key={product._id} className="card bg-base-100 w-96 shadow-sm">
  <figure className="px-4 pt-4">
    <img
      src={product.image || noImage}
      alt=""
      className="rounded-xl"
      onError={(e)=>{
        e.preventDefault()
console.log(e);
e.currentTarget.src= noImage
      }}
      />
  </figure>
  <div className="card-body">
    <p className='bg-gray-200 text-green-400 font-semibold p-1 w-16 text-center rounded-2xl'>{product.sale_status}</p>
    <h2 className="card-title">{product.title}</h2>
    <p className='text-green-500 font-semibold'> $ {`${product.price_min} - ${product.price_max}`}</p>
    <div className="card-actions">
      <Link to={`/productdetails/${product._id}`} className="btn btn-outline border-yellow-400 text-yellow-500 font-medium w-full">View Details</Link>
    </div>
  </div>
</div>)
  }
 </div>

 {/* see more and see less */}
 <div className='flex justify-center mt-6'>
    {
        showAllBids ? <button onClick={handleSeeMore} className='btn btn-warning'>See Less Products<FaArrowLeft></FaArrowLeft> </button> : <button onClick={handleSeeMore} className='btn btn-warning'>See All Products<FaArrowRight></FaArrowRight> </button>
    }
 </div>
        </div>
 
    );
};

export default AllProducts;