import React from 'react';
import { Link } from 'react-router';

const Product = ({product}) => {
    const{_id,title,price_min,price_max,image,sale_status}=product;
    return (
       <div className="card bg-base-100 w-96 shadow-sm">
  <figure className="px-4 pt-4">
    <img
      src={image}
      alt="Shoes"
      className="rounded-xl w-100 h-100 object-cover" />
  </figure>
  <div className="card-body">
    <p className='bg-gray-200 text-green-400 font-semibold p-1 w-16 text-center rounded-2xl'>{sale_status}</p>
    <h2 className="card-title">{title}</h2>
    <p className='text-green-500 font-semibold'>Price : ${price_min} - ${price_max}</p>
    <div className="card-actions">
      <Link to={`/productdetails/${_id}`} className="btn btn-outline border-yellow-400 text-yellow-500 font-medium w-full">View Details</Link>
    </div>
  </div>
</div>
    );
};

export default Product;