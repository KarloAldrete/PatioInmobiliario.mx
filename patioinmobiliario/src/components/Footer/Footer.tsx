import React from "react";
import Image from "next/image";
import "../../styles/footer.css";

import bLogo from "@/public/bLogo.svg";
import fb from "@/public/fb.svg";
import ig from "@/public/ig.svg";
import tw from "@/public/tw.svg";


export default function Footer() {
    return (
        <div className="footer">

            <div className="left-side">

                <div className="logo">
                    <Image src={bLogo} alt="logo" />
                </div>

                <div className="slogan">
                    <p>La llave maestra para vender propiedades</p>
                </div>

            </div>

            <div className="right-side">

                <div className="footer-items">
                    <a href="/pricing">Precios</a>
                    <a href="/about">Nosotros</a>
                </div>

                <div className="footer-items">
                    <a href="/blog">Blog</a>
                    <a href="/faqs">FAQs</a>
                </div>

                <div className="footer-items">

                    <div className="social-media">
                        <Image src={fb} alt="facebook" />
                        <Image src={ig} alt="instagram" />
                        <Image src={tw} alt="twitter" />
                    </div>

                    <div className="contact">
                        <p>
                            <a href="mailto:contacto@patioinmobiliario.com">
                                contacto@patioinmobiliario.com
                            </a>
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}