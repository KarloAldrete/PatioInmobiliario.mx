import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../styles/property.css';

import { useParams } from "react-router-dom";
import io from "socket.io-client";

import bedrooms from "../images/bedroom.svg";
import bathroom from "../images/bathrooms.svg";
import parking from "../images/parking.svg";
import kitchen from "../images/kitchen.svg";
import washer from "../images/washer.svg";
import gym from "../images/gym.svg";
import pool from "../images/pool.svg";
import jacuzzi from "../images/jacuzzi.svg";
import house from "../images/house.svg";
import square from "../images/square.svg";
import build from "../images/build.svg";

import mxn from "../images/mxn.svg";
import usd from "../images/usd.svg";

const socket = io("http://localhost:4000/home");

function Property() {
  const [propertyInfo, setPropertyInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {

    socket.emit("property-details", { id });

    socket.on("property-details", (data) => {
      console.log(data);
      setPropertyInfo(data);
    });


  }, [id, socket]);

  return (
    <div className="App">
      <Navbar />

      <div className="property-container">

        <div className="property-images-module">

          <div className="title">

            <h3>{propertyInfo?.selectedCity}</h3>

            <h1>{propertyInfo?.selectedNeighborhood}</h1>

          </div>

          <div className="images">

            <div className="main-image" style={{
              backgroundImage: `url(${propertyInfo?.imageList[0].data})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}>
            </div>

            <div className="secondary-images">

              <div className="image is-loading"></div>
              <div className="image is-loading"></div>
              <div className="image is-loading"></div>
              <div className="image is-loading"></div>
            </div>

          </div>

        </div>

        <div className="property-details-modules">

          <div className="left-side">

            <div className="location-module">

              <div className="title">

                <h1><strong>Ubicación</strong> y lugares de interés</h1>

                <div className="description">
                  <p>Descubre los puntos clave cercanos a la propiedad</p>
                </div>

              </div>

              <div className="map is-loading">
              </div>

            </div>

            <div className="details-module">

              <div className="title">

                <h1><strong>Detalles</strong> de la propiedad</h1>

              </div>

              <div className="details">

                <div className={propertyInfo?.propBedrooms === 0 ? "detail hide" : "detail"}>

                  <img src={bedrooms} alt="bedrooms" />

                  <span>{propertyInfo?.propBedrooms} Recámaras</span>

                </div>

                <div className={propertyInfo?.propBathrooms === 0 ? "detail hide" : "detail"}>

                  <img src={bathroom} alt="bathroom" />

                  <span>{propertyInfo?.propBathrooms} Baños</span>

                </div>

                <div className={propertyInfo?.propParking === 0 ? "detail hide" : "detail"}>

                  <img src={parking} alt="parking" />

                  <span>{propertyInfo?.propParking} Estacionamientos</span>

                </div>

                <div className={propertyInfo?.propKitchen === false ? "detail hide" : "detail"}>

                  <img src={kitchen} alt="kitchen" />

                  <span>{propertyInfo?.propKitchen} Cocina</span>

                </div>

                <div className={propertyInfo?.propWasher === false ? "detail hide" : "detail"}>

                  <img src={washer} alt="washer" />

                  <span>{propertyInfo?.propWasher} Lavadora</span>

                </div>

                <div className={propertyInfo?.propGym === false ? "detail hide" : "detail"}>

                  <img src={gym} alt="gym" />

                  <span>{propertyInfo?.propGym} Gimnasio</span>

                </div>

                <div className={propertyInfo?.propPool === false ? "detail hide" : "detail"}>

                  <img src={pool} alt="pool" />

                  <span>{propertyInfo?.propPool} Alberca</span>

                </div>

                <div className={propertyInfo?.propJacuzzi === false ? "detail hide" : "detail"}>

                  <img src={jacuzzi} alt="jacuzzi" />

                  <span>{propertyInfo?.propJacuzzi} Jacuzzi</span>

                </div>

                <div className={propertyInfo?.propMConstruction === 0 ? "detail hide" : "detail"}>

                  <img src={house} alt="house" />

                  <span>{propertyInfo?.propMConstruction} m­­²</span>

                </div>

                <div className={propertyInfo?.propTerrain === 0 ? "detail hide" : "detail"}>

                  <img src={square} alt="square" />

                  <span>{propertyInfo?.propTerrain} m²</span>

                </div>

                <div className={propertyInfo?.propYear === 0 ? "detail hide" : "detail"}>

                  <img src={build} alt="build" />

                  <span>Año de construcción {propertyInfo?.propYear}</span>

                </div>

              </div>

            </div>

          </div>

          <div className="right-side">

            <div className="price-module">

              <div className="title">

                <h1><strong>Costo</strong> de propiedad</h1>

              </div>

              <div className="price">

                <h1>${propertyInfo?.propCost}</h1>

                <img src={propertyInfo?.currency === "MXN" ? mxn : usd} alt="currency" />

              </div>
            </div>

            <div className="description-module">

              <div className="title">

                <h1><strong>Descripción</strong> de la propiedad</h1>

              </div>

              <div className="description">
                {propertyInfo?.description.split('.').map((sentence, index) => (
                  <React.Fragment key={index}>
                    {sentence.trim()}
                    <br /><br />
                  </React.Fragment>
                ))}
              </div>


            </div>

            <div className="contact-module">

              <div className="title">

                <h1><strong>Contacto</strong></h1>

              </div>

              <div className="contact">

                <div className="name">

                  <p>{propertyInfo?.propName}</p>

                </div>

                <div className="email">

                  <p>{propertyInfo?.propEmail}</p>

                </div>

                <div className="phone">

                  <p>{propertyInfo?.propPhone}</p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Property;
