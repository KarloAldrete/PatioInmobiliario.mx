
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../assets/images/logo.svg';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
    useEffect(() => {
        const navbarMenu = document.querySelector<HTMLDivElement>(".navbar_menu");
        try {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 100) {
                    navbarMenu?.classList.add("navbar_black");
                } else navbarMenu?.classList.remove("navbar_black");
            });
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <div className="navbar">
            <div className="navbar_container">
                <div className="navbar_logo">
                    <Link href="/" legacyBehavior>
                        <a>
                            <Image src={Logo} alt="Logo" width={100} height={100} />
                        </a>
                    </Link>
                </div>
                <div className="navbar_menu">
                    <Link href="/create" legacyBehavior>
                        <a className="navbar_menu_link">Inicio</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;