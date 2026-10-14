import React, { Suspense } from 'react';
import RecentProducts from '../../components/RecentProducts/RecentProducts';

const recentProductsPromise=fetch(`${import.meta.env.VITE_API_URL}/latestproducts`).then(res=>res.json());
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