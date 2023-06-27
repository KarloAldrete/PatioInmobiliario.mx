'use client';
import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { PiBathtubFill } from 'react-icons/pi';
import { FaBed } from 'react-icons/fa';
import { BsFillCarFrontFill } from 'react-icons/bs';
import Image from 'next/image';
import house from '../../images/testing.jpg';

type Property = {
    _id: string;
    location: string;
    status: string;
    price: number;
    currency: string;
    rooms: number;
    bathrooms: number;
    parking: number;
    area: number;
    description: string;
    images: string[];
};

export default function Properties() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProperties, setTotalProperties] = useState(0);
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch('/api/properties');
            const data = await response.json();
            setProperties(data.properties);
            setTotalProperties(properties.length);
        };

        fetchProperties();
    }, [properties.length]);

    const getPropertiesForCurrentPage = () => {
        const propertiesPerPage = 25;
        const indexOfLastProperty = currentPage * propertiesPerPage;
        const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
        const currentProperties = properties.slice(
            indexOfFirstProperty,
            indexOfLastProperty
        );

        return currentProperties;
    };

    const currentProperties = getPropertiesForCurrentPage();

    console.log(currentProperties);
    console.log(totalProperties);
    console.log(currentPage);

    return (
        <div className="home-container">
            <div className="properties-available">
                {currentProperties.map((property: Property) => (
                    <div className="property" key={property._id}>
                        <div className="property-image">
                            <Image src={house} priority={true} alt="house" />
                        </div>
                        <div className="property-info">
                            <div className="location">
                                <h3>{property.location}</h3>
                                <p>Tijuana, Baja California Norte</p>
                            </div>
                            <div className="status">
                                <div
                                    className="label"
                                    style={{
                                        backgroundColor:
                                            property.status === 'Venta' ? '#FA5F86' : '#7DBD80',
                                    }}
                                >
                                    <p>{property.status}</p>
                                </div>
                                <div className="details">
                                    <div className="item">
                                        <p>{property.rooms}</p>
                                        <FaBed className="bed-icon" />
                                    </div>
                                    <div className="item">
                                        <p>{property.bathrooms}</p>
                                        <PiBathtubFill className="bath-icon" />
                                    </div>
                                    <div className="item">
                                        <p>{property.parking}</p>
                                        <BsFillCarFrontFill className="car-icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="price">
                                <p>
                                    ${property.price.toLocaleString('en-US')} {property.currency}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <Pagination
                    current={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                    total={totalProperties}
                    pageSize={25}
                />
            </div>
        </div>
    );
}
