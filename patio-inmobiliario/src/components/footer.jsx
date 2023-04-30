import React from "react";
import '../styles/footer.css'

import logo from '../images/logo.svg'
import facebook from '../images/facebook.svg'
import instagram from '../images/instagram.svg'
import twitter from '../images/twitter.svg'

const Footer = () => {

    return (
        <footer className="footer">

            <div className="footer_container">

                <div className="footer_container_logo">

                    <img src={logo} alt="logo" />

                </div>

                <div className="footer_container_info">

                    <p>© 2023 Patio Inmobiliario</p>

                </div>

                <div className="footer_container_social">

                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                        <img src={facebook} alt="facebook" />
                    </a>

                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <img src={instagram} alt="instagram" />
                    </a>

                    <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                        <img src={twitter} alt="twitter" />
                    </a>

                </div>

            </div>

        </footer>
    );
};

export default Footer;