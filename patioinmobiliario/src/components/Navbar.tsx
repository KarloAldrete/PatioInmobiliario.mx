
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../assets/images/logo.svg';
import '../styles/navbar.css';

const Navbar: React.FC = () => {

    return (
        <div className="navbar">
            <div className="navbar_container">
                <div className="navbar_logo">
                    <Link href="/" legacyBehavior>
                            <Image src={Logo} className='logo' alt="Logo" width={100} height={100} />
                    </Link>
                </div>
                <div className="navbar_menu">
                    <Link href="/create" legacyBehavior>
                        <button className="navbar_menu_link">Crear Publicacion</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;