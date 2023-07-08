'use client';
import React, { useState } from "react";
import Image from "next/image";
import "@/styles/deals.css"

import clock from "@/public/clock.svg";
import carot from "@/public/carot.svg";
import phone from "@/public/phone.svg";

export default function Deals() {
    const [openListings, setOpenListings] = useState([false, false]);


    const handleOpen = (index: number) => {
        setOpenListings((prevOpenListings) => {
            const updatedOpenListings: Array<boolean> = [...prevOpenListings];
            updatedOpenListings[index] = !updatedOpenListings[index];
            return updatedOpenListings;
        });
    };


    return (
        <div className="dashboard-page">

            <div className="title">
                <h1>Acuerdos</h1>
                <span>Manten el orden de tus progresos</span>
            </div>

            <div className="content">

                <div className="content-header">

                    <div className="new-deals-header">

                        <div className="title">
                            <h2>Nuevos</h2>
                        </div>

                        <div className="revenue">
                            <h2>Ingresos previstos</h2>
                            <span>$135,000 MXN</span>
                        </div>

                    </div>

                    <div className="progress-deals-header">
                    </div>

                    <div className="finished-deals-header">
                    </div>

                </div>

                <div className="content-body">

                    <div className="new-deals-container">

                        <div className="listing">

                            <div className="listing-header">

                                <div className="date">
                                    <Image src={clock} alt="clock" width={16} height={16} />
                                    <span>12/12/2021</span>
                                    <span>2:14 PM</span>
                                </div>

                                <div
                                    className="carot"
                                    onClick={() => handleOpen(0)}
                                    style={{
                                        transform: openListings[0] ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: '0.2s'
                                    }}
                                >
                                    <Image src={carot} alt="carot" width={16} height={16} />
                                </div>

                            </div>

                            <div className="listing-body">

                                <div className="listing-body-top">

                                    <div className="info">
                                        <h2>Yahara Patricia</h2>

                                        <span>$4,500,000</span>
                                    </div>

                                    <div className="contact">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom" 
                                style={{
                                    height: openListings[0] ? '100px' : '0px',
                                    opacity: openListings[0] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[0] ? 'flex' : 'none',
                                    animation: openListings[0] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="listing-body-bottom-left">

                                    <div className="info">
                                        <h2>Yahara Patricia</h2>
                                    </div>

                                    <div className="contact">
                                        <p>664-202-8953</p>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="listing">

                            <div className="listing-header">

                                <div className="date">
                                    <Image src={clock} alt="clock" width={16} height={16} />
                                    <span>12/12/2021</span>
                                    <span>2:14 PM</span>
                                </div>

                                <div
                                    className="carot"
                                    onClick={() => handleOpen(1)}
                                    style={{
                                        transform: openListings[1] ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: '0.2s'
                                    }}
                                >
                                    <Image src={carot} alt="carot" width={16} height={16} />
                                </div>

                            </div>

                            <div className="listing-body">

                                <div className="listing-body-top">

                                    <div className="info">
                                        <h2>Yahara Patricia</h2>

                                        <span>$4,500,000</span>
                                    </div>

                                    <div className="contact">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="progress-deals-container">
                    </div>

                    <div className="finished-deals-container">
                    </div>

                </div>

            </div>

        </div>
    )
}