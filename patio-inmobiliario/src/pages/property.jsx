import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../styles/property.css';

function Property(props) {
    const property = props.location?.state?.property || {};
  
    return (
      <div className="App">
        <Navbar />
  
        <div className="property-container">
  
          <div className="property-images-module">
  
            <div className="title">
  
              <h1>{property.selectedCity}</h1>
  
            </div>
  
          </div>
  
        </div>
  
        <Footer />
      </div>
    );
  }

export default Property;
