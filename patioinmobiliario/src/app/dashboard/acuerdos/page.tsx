'use client';
import React, { useState } from "react";
import Image from "next/image";
import "@/styles/deals.css"

import clock from "@/public/clock.svg";
import carot from "@/public/carot.svg";
import phone from "@/public/phone.svg";
import check from "@/public/check.svg";

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

                <div className="title-left">
                    <h1>Acuerdos</h1>
                    <span>Manten el orden de tus progresos</span>
                </div>

                <div className="title-right">
                    <button>Nuevo Acuerdo</button>
                </div>

            </div>

            <div className="content">

                <div className="content-header">

                    <div className="new-deals-header">

                        <div className="title">
                            <h2>Potenciales</h2>
                        </div>

                        <div className="revenue">
                            <h2>Ingresos previstos</h2>
                            <span>$135,000 MXN</span>
                        </div>

                    </div>

                    <div className="progress-deals-header">

                        <div className="title">
                            <h2>En Progreso</h2>
                        </div>

                        <div className="revenue">
                            <h2>Ingresos previstos</h2>
                            <span>$285,750 MXN</span>
                        </div>

                    </div>

                    <div className="finished-deals-header">

                        <div className="title">
                            <h2>Concluidos</h2>
                        </div>

                        <div className="revenue">
                            <h2>Ingresos obtenidos</h2>
                            <span>$435,000 MXN</span>
                        </div>

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

                                        <span style={{ display: openListings[0] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[0] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[0] ? 'auto' : '0px',
                                    opacity: openListings[0] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[0] ? 'flex' : 'none',
                                    animation: openListings[0] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[0] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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

                                        <span style={{ display: openListings[1] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[1] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[1] ? 'auto' : '0px',
                                    opacity: openListings[1] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[1] ? 'flex' : 'none',
                                    animation: openListings[1] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[1] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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
                                    onClick={() => handleOpen(2)}
                                    style={{
                                        transform: openListings[2] ? 'rotate(180deg)' : 'rotate(0deg)',
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

                                        <span style={{ display: openListings[2] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[2] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[2] ? 'auto' : '0px',
                                    opacity: openListings[2] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[2] ? 'flex' : 'none',
                                    animation: openListings[2] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[2] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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

                                        <span style={{ display: openListings[0] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[0] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[0] ? 'auto' : '0px',
                                    opacity: openListings[0] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[0] ? 'flex' : 'none',
                                    animation: openListings[0] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[0] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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

                                        <span style={{ display: openListings[1] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[1] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[1] ? 'auto' : '0px',
                                    opacity: openListings[1] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[1] ? 'flex' : 'none',
                                    animation: openListings[1] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[1] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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
                                    onClick={() => handleOpen(2)}
                                    style={{
                                        transform: openListings[2] ? 'rotate(180deg)' : 'rotate(0deg)',
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

                                        <span style={{ display: openListings[2] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[2] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[2] ? 'auto' : '0px',
                                    opacity: openListings[2] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[2] ? 'flex' : 'none',
                                    animation: openListings[2] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[2] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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

                                        <span style={{ display: openListings[0] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[0] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[0] ? 'auto' : '0px',
                                    opacity: openListings[0] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[0] ? 'flex' : 'none',
                                    animation: openListings[0] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[0] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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

                                        <span style={{ display: openListings[1] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[1] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[1] ? 'auto' : '0px',
                                    opacity: openListings[1] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[1] ? 'flex' : 'none',
                                    animation: openListings[1] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[1] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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
                                    onClick={() => handleOpen(2)}
                                    style={{
                                        transform: openListings[2] ? 'rotate(180deg)' : 'rotate(0deg)',
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

                                        <span style={{ display: openListings[2] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[2] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[2] ? 'auto' : '0px',
                                    opacity: openListings[2] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[2] ? 'flex' : 'none',
                                    animation: openListings[2] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[2] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="progress-deals-container">

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

                                        <span style={{ display: openListings[0] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[0] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[0] ? 'auto' : '0px',
                                    opacity: openListings[0] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[0] ? 'flex' : 'none',
                                    animation: openListings[0] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[0] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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

                                        <span style={{ display: openListings[1] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[1] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[1] ? 'auto' : '0px',
                                    opacity: openListings[1] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[1] ? 'flex' : 'none',
                                    animation: openListings[1] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[1] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
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
                                    onClick={() => handleOpen(2)}
                                    style={{
                                        transform: openListings[2] ? 'rotate(180deg)' : 'rotate(0deg)',
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

                                        <span style={{ display: openListings[2] ? 'none' : 'flex' }}>$4,500,000</span>
                                    </div>

                                    <div className="contact" style={{ display: openListings[2] ? 'none' : 'flex' }}>
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>664-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="listing-body-bottom"
                                style={{
                                    height: openListings[2] ? 'auto' : '0px',
                                    opacity: openListings[2] ? '1' : '0',
                                    transition: '0.2s',
                                    display: openListings[2] ? 'flex' : 'none',
                                    animation: openListings[2] ? 'fade-in 0.2s' : 'fade-out 0.2s'
                                }}
                            >

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Propiedad</span>
                                    </div>

                                    <div className="info-right">
                                        <span id="property">_ID28990129</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Costo Total</span>
                                    </div>

                                    <div className="info-right">
                                        <span>$4,500,000</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Etapa</span>
                                    </div>

                                    <div className="info-right">
                                        <span>Procesando Documentos</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Duracion</span>
                                    </div>

                                    <div className="info-right">
                                        <span>27 dias</span>
                                    </div>

                                </div>

                                <div className="info">

                                    <div className="info-left">
                                        <Image src={phone} alt="clock" width={12} height={12} />
                                        <span>Contacto</span>
                                    </div>

                                    <div className="info-right">
                                        <span>(664)-202-8953</span>
                                    </div>

                                </div>

                            </div>

                            <div className="progress-bar" style={{ display: openListings[2] ? 'flex' : 'none' }}>
                                <span> Tiempo restante:</span>
                                <div className="bar" style={{ width: '100%', height: '8px', backgroundColor: '#EFF0F3', borderRadius: '4px' }} >
                                    <div className="progress" style={{ width: '50%', height: '8px', backgroundColor: '#FF2E63', borderRadius: '4px' }}></div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="finished-deals-container">

                        <div className="listing">

                            <div className="listing-header">

                                <div className="date">
                                    <Image src={check} alt="clock" width={16} height={16} />
                                    <span>24/07/2023</span>
                                    <span>4:18 PM</span>
                                </div>

                            </div>

                            <div className="listing-body">

                                <div className="listing-body-top">

                                    <div className="info">
                                        <h2>Yahara Patricia</h2>

                                        <span>$135,000</span>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="listing">

                            <div className="listing-header">

                                <div className="date">
                                    <Image src={check} alt="clock" width={16} height={16} />
                                    <span>24/07/2023</span>
                                    <span>4:18 PM</span>
                                </div>

                            </div>

                            <div className="listing-body">

                                <div className="listing-body-top">

                                    <div className="info">
                                        <h2>Alfredo Gutierrez</h2>

                                        <span>$200,000</span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}