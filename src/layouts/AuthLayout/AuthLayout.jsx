import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
        <header>
<Navbar></Navbar>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        </div>
    );
};

export default AuthLayout;