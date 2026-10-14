
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import noImage from "../../assets/noImage.png";

const AllProducts = () => {
    const allProductsdata = useLoaderData();

    const [showAllBids, setShowAllBids] = useState(false);

    const visibleBids = showAllBids
        ? allProductsdata
        : allProductsdata.slice(0, 9);

    const handleSeeMore = () => {
        console.log("see more");
        setShowAllBids(!showAllBids);
    };

    return (
        <div className='bg-gray-100 py-8 sm:py-10 lg:py-14'>

            {/* Page heading */}
            <h2 className='text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10 px-4'>
                All <span className='text-yellow-500'>Products</span>
            </h2>

            {/* Products grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-11/12 sm:w-10/12 mx-auto'>

                {visibleBids.map(product => (
                    <div
                        key={product._id}
                        className="card bg-base-100 w-full min-w-0 shadow-sm"
                    >

                        {/* Product image */}
                        <figure className="px-3 pt-3 sm:px-4 sm:pt-4">
                            <img
                                src={product.image || noImage}
                                alt={product.title || "Product image"}
                                className="rounded-xl w-full h-52 sm:h-56 lg:h-64 xl:h-72 object-cover"
                                onError={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = noImage;
                                }}
                            />
                        </figure>

                        {/* Product information */}
                        <div className="card-body p-4 sm:p-5">

                            {/* Sale status */}
                            <p className='bg-gray-200 text-green-500 font-semibold p-1 w-fit max-w-full text-center rounded-2xl text-xs sm:text-sm'>
                                {product.sale_status}
                            </p>

                            {/* Product title */}
                            <h2 className="card-title text-base sm:text-lg break-words">
                                {product.title}
                            </h2>

                            {/* Price */}
                            <p className='text-green-500 font-semibold text-sm sm:text-base break-words'>
                                $ {`${product.price_min} - ${product.price_max}`}
                            </p>

                            {/* View details */}
                            <div className="card-actions mt-2">
                                <Link
                                    to={`/productdetails/${product._id}`}
                                    className="btn btn-outline border-yellow-400 text-yellow-500 font-medium w-full btn-sm sm:btn-md"
                                >
                                    View Details
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}

            </div>

            {/* See more and see less */}
            {allProductsdata.length > 9 && (
                <div className='flex justify-center mt-6 sm:mt-8 px-4'>
                    {showAllBids ? (
                        <button
                            onClick={handleSeeMore}
                            className='btn btn-warning btn-sm sm:btn-md'
                        >
                            See Less Products <FaArrowLeft />
                        </button>
                    ) : (
                        <button
                            onClick={handleSeeMore}
                            className='btn btn-warning btn-sm sm:btn-md'
                        >
                            See All Products <FaArrowRight />
                        </button>
                    )}
                </div>
            )}

        </div>
    );
};

export default AllProducts;

