'use client';
import React, { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../app/globals.css';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {

    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
            />
        </>
    );
};

export default Layout;
