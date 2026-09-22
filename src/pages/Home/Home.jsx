import React, { Suspense } from 'react';
import RecentProducts from '../../components/RecentProducts/RecentProducts';

const recentProductsPromise=fetch('http://localhost:3000/latestproducts').then(res=>res.json());
const Home = () => {
    return (
        <div>
            <Suspense>
                <RecentProducts recentProductsPromise={recentProductsPromise}></RecentProducts>
            </Suspense>

        </div>
    );
};

export default Home;