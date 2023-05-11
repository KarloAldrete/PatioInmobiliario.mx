import React, { useState } from 'react';
import Modal from 'react-modal';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Layout from '../../components/Layout';
import '../../styles/property.css';

import bedrooms from '../../assets/icons/bedroom.svg';
import bathroom from "../../assets/icons/bathrooms.svg";
import parking from "../../assets/icons/parking.svg";
import kitchen from "../../assets/icons/kitchen.svg";
import washer from "../../assets/icons/washer.svg";
import gym from "../../assets/icons/gym.svg";
import pool from "../../assets/icons/pool.svg";
import jacuzzi from "../../assets/icons/jacuzzi.svg";
import house from "../../assets/icons/house.svg";
import square from "../../assets/icons/square.svg";
import build from "../../assets/icons/build.svg";
import mxn from "../../assets/icons/mxn.svg";
import usd from "../../assets/icons/usd.svg";
import user from "../../assets/icons/user.svg";
import phone from "../../assets/icons/cellphone.svg";
import email from "../../assets/icons/email.svg";

type Property = {
  _id: string;
  propCost: string;
  selectedNeighborhood: string;
  selectedCity: string;
  status: string;
  propBedrooms: number;
  propBathrooms: number;
  propParking: number;
  propKitchen: boolean;
  propWasher: boolean;
  propGym: boolean;
  propPool: boolean;
  propJacuzzi: boolean;
  propMConstruction: number;
  propTerrain: number;
  propYear: number;
  imageList: { data: object }[];
  description: string;
  propName: string;
  propPhone: string;
  propEmail: string;
  currency: string;
};

type PropertyPageProps = {
  property: Property;
};

const PropertyPage = ({ property }: PropertyPageProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openModal = (imageIndex: React.SetStateAction<number>) => {
    setCurrentImage(imageIndex);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % property.imageList.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + property.imageList.length) % property.imageList.length);
  };

  return (
    <Layout>
      <div className="App">

        <div className="property-container">

          <div className="property-images-module">

            <div className="title">

              <h3>{property?.selectedCity}</h3>

              <h1>{property?.selectedNeighborhood}</h1>

            </div>

            <div className="images">

              <div className="main-image" style={{
                backgroundImage: `url(${property?.imageList[0].data})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }} onClick={() => openModal(0)}>
              </div>

              <div className="secondary-images">
                <div className={`image ${property ? '' : 'is-loading'}`} style={property ? { backgroundImage: `url(${property?.imageList[1]?.data})`, backgroundPosition: 'center', backgroundSize: 'cover' } : { backgroundImage: `transparent` }} onClick={() => openModal(1)}></div>
                <div className={`image ${property ? '' : 'is-loading'}`} style={property ? { backgroundImage: `url(${property?.imageList[2]?.data})`, backgroundPosition: 'center', backgroundSize: 'cover' } : { backgroundImage: `transparent` }} onClick={() => openModal(2)}></div>
                <div className={`image ${property ? '' : 'is-loading'}`} style={property ? { backgroundImage: `url(${property?.imageList[3]?.data})`, backgroundPosition: 'center', backgroundSize: 'cover' } : { backgroundImage: `transparent` }} onClick={() => openModal(3)}></div>
                <div className={`image ${property ? '' : 'is-loading'}`} style={property ? { backgroundImage: `url(${property?.imageList[4]?.data})`, backgroundPosition: 'center', backgroundSize: 'cover' } : { backgroundImage: `transparent` }} onClick={() => openModal(4)}></div>
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

                  <div className={property?.propBedrooms === 0 ? "detail hide" : "detail"}>

                    <Image src={bedrooms} alt="bedrooms" />

                    <span>{property?.propBedrooms} Recámaras</span>

                  </div>

                  <div className={property?.propBathrooms === 0 ? "detail hide" : "detail"}>

                    <Image src={bathroom} alt="bathroom" />

                    <span>{property?.propBathrooms} Baños</span>

                  </div>

                  <div className={property?.propParking === 0 ? "detail hide" : "detail"}>

                    <Image src={parking} alt="parking" />

                    <span>{property?.propParking} Estacionamientos</span>

                  </div>

                  <div className={property?.propKitchen === false ? "detail hide" : "detail"}>

                    <Image src={kitchen} alt="kitchen" />

                    <span>{property?.propKitchen} Cocina</span>

                  </div>

                  <div className={property?.propWasher === false ? "detail hide" : "detail"}>

                    <Image src={washer} alt="washer" />

                    <span>{property?.propWasher} Lavadora</span>

                  </div>

                  <div className={property?.propGym === false ? "detail hide" : "detail"}>

                    <Image src={gym} alt="gym" />

                    <span>{property?.propGym} Gimnasio</span>

                  </div>

                  <div className={property?.propPool === false ? "detail hide" : "detail"}>

                    <Image src={pool} alt="pool" />

                    <span>{property?.propPool} Alberca</span>

                  </div>

                  <div className={property?.propJacuzzi === false ? "detail hide" : "detail"}>

                    <Image src={jacuzzi} alt="jacuzzi" />

                    <span>{property?.propJacuzzi} Jacuzzi</span>

                  </div>

                  <div className={property?.propMConstruction === 0 ? "detail hide" : "detail"}>

                    <Image src={house} alt="house" />

                    <span>{property?.propMConstruction} m­­²</span>

                  </div>

                  <div className={property?.propTerrain === 0 ? "detail hide" : "detail"}>

                    <Image src={square} alt="square" />

                    <span>{property?.propTerrain} m²</span>

                  </div>

                  <div className={property?.propYear === 0 ? "detail hide" : "detail"}>

                    <Image src={build} alt="build" />

                    <span>Año de construcción {property?.propYear}</span>

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

                  <h1>${property?.propCost}</h1>

                  <Image src={property?.currency === "MXN" ? mxn : usd} alt="currency" />

                </div>
              </div>

              <div className="description-module">

                <div className="title">

                  <h1><strong>Descripción</strong> de la propiedad</h1>

                </div>

                <div className="description">
                  {property?.description.split('.').map((sentence: string, index: number) => (
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

                  <div className="item">

                    <Image src={user} alt="user" />

                    <p>{property?.propName}</p>

                  </div>

                  <div className="item">

                    <Image src={phone} alt="phone" />

                    <p>{property?.propPhone}</p>

                  </div>

                  <div className="item">

                    <Image src={email} alt="email" />

                    <p>{property?.propEmail}</p>

                  </div>

                </div>

              </div>

              <div className="get-info-module">

                <div className="title">

                  <h1>Recibe más información</h1>

                </div>

                <div className="form">
                </div>

                <div className="terms-and-conditions">

                  <input type="checkbox" className="checkbox" />

                  <p>Acepto <a>términos y condiciones generales</a> y la <a>política de tratamiento de datos</a>.</p>

                </div>

                <div className="submit">

                  <button className="button is-primary">Hablar con asesor</button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            color: 'lightsteelblue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '1240px',
            height: '520px',
            margin: 'auto',
            position: 'relative',
            overflow: 'hidden',
          }
        }}
      >
        <button onClick={closeModal} style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}>Cerrar</button>
        <button onClick={prevImage} style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
        }}>Anterior</button>
        <img src={property?.imageList[currentImage]?.data} alt="Property" style={{
          maxWidth: '100%', // Aseguramos que la imagen no exceda el tamaño del contenido
          maxHeight: '100%',
        }} />
        <button onClick={nextImage} style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
        }}>Siguiente</button>
      </Modal>
    </Layout>
  );
};


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { db } = await connectToDatabase();

  const id = context.params?.id;
  if (!id) {
    return {
      notFound: true,
    };
  }

  const data = await db.collection("properties").findOne({ _id: new ObjectId(id as string) });

  if (!data) {
    return {
      notFound: true,
    };
  }

  const property = JSON.parse(JSON.stringify(data));

  return {
    props: { property },
  };
};


export default PropertyPage;
