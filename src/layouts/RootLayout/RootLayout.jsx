import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
         <header>
             <h2> Root Layout </h2>
          <Navbar></Navbar>
         </header>
         <main>
            <Outlet></Outlet>
         </main>
         <footer>
            <Footer></Footer>
         </footer>
        </div>
    );
};

export default RootLayout;