import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import '../styles/home.css';

import io from "socket.io-client";

import img from '../images/1.png';


function Home() {
    const socket = io("http://localhost:4000/");

    useEffect(() => {
        socket.on("loadProperties", (properties) => {
            console.log(properties);
        });
    }, []);

    return (

        <div className="App">

            <Navbar />

            <div className="cards_container">

                <div className="card">

                    <div className="card_image" style={{backgroundImage: `url(${img})`}}>

                        <div className="left-arrow">
                            <i className='bx bxs-left-arrow'></i>
                        </div>

                        <div className="right-arrow">
                            <i className='bx bxs-right-arrow'></i>
                        </div>

                    </div>

                    <div className="card_info">

                        <div className="card_price">
                            <p>$750,000 USD</p>
                        </div>

                        <div className="card_address">

                            <div className="card_address_street">
                                <p>Otay Modulos</p>
                            </div>

                            <div className="card_address_city">
                                <p>Tijuana</p>
                            </div>

                        </div>

                        <div className="card_description">

                            <div className="card_description_status">
                                <p>Venta</p>
                            </div>

                            <div className="card_description_icons">

                                <div className="bedrooms">

                                    <i className='bx bxs-bed'></i>

                                    <p>3</p>

                                </div>

                                <div className="bathrooms">

                                    <i className='bx bxs-bath'></i>

                                    <p>2</p>

                                </div>

                                <div className="garage">

                                    <i className='bx bxs-car'></i>

                                    <p>2</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Home;