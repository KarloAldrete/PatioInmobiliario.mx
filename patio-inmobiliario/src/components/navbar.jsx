import React, { useEffect } from "react";
import Logo from "../images/LogoP.png";
import '../styles/navbar.css';

function Navbar() {

    function handleRedirect() {
            window.location.href = "/";
    }

    function handleForm() {
        window.location.href = "/create";
    }

    useEffect(() => {

        if (window.location.href.includes("/create")) {
            document.querySelector(".navbar_menu").style.display = "none";
        }

    }, []);

    return (

        <div className="navbar">

            <div className="navbar_container">

                <div className="navbar_logo">

                    <img src={Logo} alt="Logo" onClick={handleRedirect} style={{cursor: "pointer"}} />

                </div>

                <div className="navbar_menu">

                    <button onClick={handleForm}>Crear Anuncio</button>

                </div>

            </div>

        </div>

    );

}

export default Navbar;