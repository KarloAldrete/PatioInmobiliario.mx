import React, { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import { connectToDatabase } from '../utils/mongodb';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/home.css';

import bed from '../assets/icons/card-bed.svg';
import bath from '../assets/icons/card-bath.svg';
import garage from '../assets/icons/card-garage.svg';

type HomeProps = {
  properties: Property[];
};

type Property = {
  _id: string;
  propCost: string;
  selectedNeighborhood: string;
  selectedCity: string;
  status: string;
  propBedrooms: number;
  propBathrooms: number;
  propParking: number;
  imageList: { data: string }[];
  currency: string;
};

const Home = ({ properties }: HomeProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Layout>
      <title>Patio Inmobiliario</title>
    <div className="App">
      <div className="cards_container">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          properties.map((property) => (
            <Link key={property._id} href={`/propiedades/${property._id}`} className='link-no-underline'>
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
                    <p>{property.propCost} {property.currency}</p>
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
                        <Image src={bed} alt="bed" />
                        <p>{property.propBedrooms}</p>
                      </div>
                      <div className="bathrooms">
                        <Image src={bath} alt="bath" />
                        <p>{property.propBathrooms}</p>
                      </div>
                      <div className="garage">
                        <Image src={garage} alt="garage" />
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
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { db } = await connectToDatabase();
  const data = await db.collection('properties').find({}).limit(20).toArray();
  const properties = JSON.parse(JSON.stringify(data));
  return {
    props: { properties },
  };
};

export default Home;
