import React, { use, useState } from 'react';
import Product from '../Product/Product';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const RecentProducts = ({recentProductsPromise}) => {
    const products=use(recentProductsPromise);
    const[showAllRecentProducts, setShowAllRecentProducts]=useState(false);
    const visibleProducts=showAllRecentProducts ? products : products.slice(0, 6);
    const handleSeeAllProducts=()=>{
        setShowAllRecentProducts(!showAllRecentProducts);
    }
    return (
        <div>

            {/* banner */}
           <div className="bg-gradient-to-br from-[#FFFDE7] via-[#FFF9C4] to-[#FFF3B0] py-20">
                <h2 className='text-5xl text-center leading-14 font-medium'>
                    Deal your <span className='text-yellow-500'>Products </span>
<br/> in a <span className='text-yellow-500'>Smart</span> way !
                </h2>
                <p className='text-gray-500 text-center py-4'>
                    SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!
                </p>
                <div className='flex justify-center gap-3'>
                    <button className='btn bg-yellow-400'>Watch All Products</button>
                    <button className='btn'>Post an Product</button>
                </div>
            </div>
           {/* products */}
           <div className='w-10/12 mx-auto mt-16'>

             <h2 className='text-4xl text-center font-medium mb-5'>Recent <span className='text-yellow-500'>Products</span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                visibleProducts.map(product=><Product 
                    key={product._id}
                    product={product}
                    ></Product>)
            }
            </div>
{/* see more and see less */}
           {
            products.length > 6 &&  <div className='flex justify-center mb-12 mt-4'>
                {
                    showAllRecentProducts ? <button onClick={handleSeeAllProducts} className='btn btn-warning'>See Less Products<FaArrowLeft></FaArrowLeft> </button> : <button onClick={handleSeeAllProducts} className='btn btn-warning'>See All Products<FaArrowRight></FaArrowRight> </button>
                }

            </div>
           }
           </div>
        </div>
    );
};

export default RecentProducts;