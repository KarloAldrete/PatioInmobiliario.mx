import React from "react";
import '../styles/footer.css'

import logo from '../images/logo.png'
import facebook from '../images/facebook.svg'
import instagram from '../images/instagram.svg'
import twitter from '../images/twitter.svg'

const Footer = () => {

    return (
        <footer className="footer">

            <div className="first-container">

                <div className="logo-container">

                    <img src={logo} alt="logo" className="logo" />

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

                            <img src={facebook} alt="facebook" className="social-media-icon" />

                            <img src={instagram} alt="instagram" className="social-media-icon" />

                            <img src={twitter} alt="twitter" className="social-media-icon" />

                        </div>

                        <span>contacto@patioinmobiliario.com</span>
                    </div>

                </div>

            </div>

            <div className="second-container">

                <span>Copyright @2023 Patio Inmobiliario, Inc. All rights reserved</span>

            </div>

        </footer>
    );
};

export default Footer;