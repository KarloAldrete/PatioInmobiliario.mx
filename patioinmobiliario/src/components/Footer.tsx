'use client'
import '../styles/footer.css';
import React from 'react';
import Image from 'next/image';

import logo from '../assets/images/Logop.svg'
import facebook from '../assets/icons/facebook.svg'
import instagram from '../assets/icons/instagram.svg'
import twitter from '../assets/icons/twitter.svg'

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="first-container">
                <div className="logo-container">
                    <Image src={logo} alt="logo" className="logo" width={150} height={150} />
                    <span>La llave maestra para vender propiedades</span>
                </div>
                <div className="extras-container">
                    <div className="content">
                        <span>Inicio de sesión</span>
                        <span>Precios</span>
                    </div>
                    <div className="content">
                        <span>Nosotros</span>
                        <span>Blog</span>
                    </div>
                    <div className="content">
                        <div className="social-media">
                            <Image src={facebook} alt="facebook" className="social-media-icon" width={24} height={24} />
                            <Image src={instagram} alt="instagram" className="social-media-icon" width={24} height={24} />
                            <Image src={twitter} alt="twitter" className="social-media-icon" width={24} height={24} />
                        </div>
                        <span>contacto@patioinmobiliario.com</span>
                    </div>
                </div>
            </div>
            <div className="second-container">
                <span>Copyright ©2023 Patio Inmobiliario, Inc. All rights reserved</span>
            </div>
        </footer>
    );
};

export default Footer;