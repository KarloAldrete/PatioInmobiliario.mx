import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "../styles/home.css";
import { Link } from "react-router-dom";

import io from "socket.io-client";

function Home() {
  const socket = io("http://localhost:4000/home");
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.on("loadProperties", (properties) => {
      setProperties(properties);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="cards_container">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          properties.map((property) => (
            <Link key={property._id} to={`/propiedades/${property._id}`} className='link-no-underline'>
              <div className="card">
                <div
                  className="card_image"
                  style={{
                    backgroundImage: `url(${property.imageList[0].data})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="left-arrow">
                    <i className="bx bxs-left-arrow"></i>
                  </div>
                  <div className="right-arrow">
                    <i className="bx bxs-right-arrow"></i>
                  </div>
                </div>
                <div className="card_info">
                  <div className="card_price">
                    <p>{property.propCost} USD</p>
                  </div>
                  <div className="card_address">
                    <div className="card_address_street">
                      <p>{property.selectedNeighborhood}</p>
                    </div>
                    <div className="card_address_city">
                      <p>{property.selectedCity}</p>
                    </div>
                  </div>
                  <div className="card_description">
                    <div className="card_description_status">
                      <p>{property.status}</p>
                    </div>
                    <div className="card_description_icons">
                      <div className="bedrooms">
                        <i className="bx bxs-bed"></i>
                        <p>{property.propBedrooms}</p>
                      </div>
                      <div className="bathrooms">
                        <i className="bx bxs-bath"></i>
                        <p>{property.propBathrooms}</p>
                      </div>
                      <div className="garage">
                        <i className="bx bxs-car"></i>
                        <p>{property.propParking}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
