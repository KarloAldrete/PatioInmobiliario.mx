'use client';
import React, { useEffect, useState } from 'react';
import { Select, Space, InputNumber, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const provinceData = [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Coahuila',
    'Colima',
    'Durango',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Estado de México',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas',
];

const cityData = {
    Aguascalientes: ['Aguascalientes', 'Calvillo', 'Rincón de Romos'],
    'Baja California': ['Tijuana', 'Mexicali', 'Ensenada'],
    'Baja California Sur': ['La Paz', 'Los Cabos', 'Ciudad Constitución'],
    Campeche: ['Campeche', 'Ciudad del Carmen', 'Escárcega'],
    Chiapas: ['Tuxtla Gutiérrez', 'Tapachula', 'San Cristóbal de las Casas'],
    Chihuahua: ['Chihuahua', 'Ciudad Juárez', 'Delicias'],
    Coahuila: ['Saltillo', 'Torreón', 'Monclova'],
    Colima: ['Colima', 'Manzanillo', 'Tecomán'],
    Durango: ['Durango', 'Gómez Palacio', 'Ciudad Lerdo'],
    Guanajuato: ['Guanajuato', 'León', 'Irapuato'],
    Guerrero: ['Acapulco', 'Chilpancingo', 'Iguala'],
    Hidalgo: ['Pachuca', 'Tulancingo', 'Tula'],
    Jalisco: ['Guadalajara', 'Zapopan', 'Tlaquepaque'],
    'Estado de México': ['Toluca', 'Ecatepec', 'Naucalpan'],
    Michoacán: ['Morelia', 'Uruapan', 'Lázaro Cárdenas'],
    Morelos: ['Cuernavaca', 'Cuautla', 'Jiutepec'],
    Nayarit: ['Tepic', 'Tecuala', 'Compostela'],
    'Nuevo León': ['Monterrey', 'Guadalupe', 'San Nicolás de los Garza'],
    Oaxaca: ['Oaxaca', 'Salina Cruz', 'Juchitán'],
    Puebla: ['Puebla', 'Tehuacán', 'Cholula'],
    Querétaro: ['Querétaro', 'San Juan del Río', 'El Marqués'],
    'Quintana Roo': ['Cancún', 'Playa del Carmen', 'Chetumal'],
    'San Luis Potosí': ['San Luis Potosí', 'Soledad de Graciano Sánchez', 'Matehuala'],
    Sinaloa: ['Culiacán', 'Mazatlán', 'LosMochis'],
    Sonora: ['Hermosillo', 'Ciudad Obregón', 'Nogales'],
    Tabasco: ['Villahermosa', 'Cárdenas', 'Comalcalco'],
    Tamaulipas: ['Tampico', 'Reynosa', 'Matamoros'],
    Tlaxcala: ['Tlaxcala', 'Apizaco', 'Huamantla'],
    Veracruz: ['Veracruz', 'Xalapa', 'Coatzacoalcos'],
    Yucatán: ['Mérida', 'Tizimín', 'Valladolid'],
    Zacatecas: ['Zacatecas', 'Guadalupe', 'Fresnillo'],
};

type CityName = keyof typeof cityData;

const plainOptions = ['Venta', 'Renta', 'Traspaso'];

export default function Basics({ onChange }) {
    let timeoutId: NodeJS.Timeout | null = null;
    const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);
    const [status, setStatus] = useState(null);

    const handleInputChange = ({ target: { value } }: RadioChangeEvent) => {
        setStatus(value);
        onChange({ status: value });
    };

    const handleProvinceChange = (value: CityName) => {
        setCities(cityData[value]);
        onChange({ state: value });
    };

    const onSecondCityChange = (value: CityName) => {
        setSecondCity(value);
        onChange({ city: value });
    };

    const handleCostChange = (value: any) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => {
            onChange({ cost: value });
            timeoutId = null;
        }, 500);
    };

    const handleCurrencyChange = (value: any) => {
        onChange({ currency: value });
    };

    const handleSquareMetersChange = (value: any) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => {
            onChange({ squareMeters: value });
            timeoutId = null;
        }, 500);
    };

    const handleConstructionSquareMetersChange = (value: any) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => {
            onChange({ constructionSquareMeters: value });
            timeoutId = null;
        }, 500);
    };

    const handleConstructionYearChange = (value: any) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => {
            onChange({ constructionYear: value });
            timeoutId = null;
        }, 500);
    };

    const handleBedroomsChange = (value: any) => {
        onChange({ bedrooms: value });
    };

    const handleBathroomsChange = (value: any) => {
        onChange({ bathrooms: value });
    };

    const handleGarageChange = (value: any) => {
        onChange({ garage: value });
    };

    return (
        <div className="module-container">

            <div className="module-title">
                <h2>Información básica</h2>
            </div>

            <div className="module-content">

                <div className='basics-first-section'>

                    <Space className='input-container'>
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            decimalSeparator=','
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                            controls={false}
                            className='input'
                            style={{ width: '100%' }}
                            placeholder='Precio de la propiedad'
                            onChange={handleCostChange}
                        />
                    </Space>

                    <Space className='select-container'>
                        <Select
                            defaultValue={'Moneda'}
                            options={
                                [
                                    { label: 'Pesos', value: 'MXN' },
                                    { label: 'Dólares', value: 'USD' },
                                ]
                            }
                            className='select'
                            style={{ width: '100%', height: '100%' }}
                            onChange={handleCurrencyChange}
                        />
                    </Space>

                    <Radio.Group options={plainOptions} onChange={handleInputChange} value={status} className='radio-container' />

                </div>

                <div className='basics-second-section'>

                    <Space className='select'>

                        <Select
                            defaultValue={'Ciudad'}
                            onChange={handleProvinceChange}
                            options={provinceData.map((province) => ({ label: province, value: province }))}
                            style={{ width: '100%' }}
                        />

                    </Space>

                    <Space className='select'>

                        <Select
                            defaultValue={'Selecciona una ciudad'}
                            value={secondCity}
                            onChange={onSecondCityChange}
                            options={cities.map((city) => ({ label: city, value: city }))}
                            style={{ width: '100%' }}
                        />

                    </Space>

                </div>

                <div className='basics-third-section'>

                    <Space className='input-container'>
                        <InputNumber
                            placeholder='Metros cuadrados de terreno'
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            decimalSeparator=','
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                            onChange={handleSquareMetersChange}
                            controls={false}
                            className='input'
                            style={{ width: '100%' }}
                        />
                    </Space>

                    <Space className='input-container'>
                        <InputNumber
                            placeholder='Metros cuadrados de construcción'
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            decimalSeparator=','
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                            onChange={handleConstructionSquareMetersChange}
                            controls={false}
                            className='input'
                            style={{ width: '100%' }}
                        />
                    </Space>

                    <Space className='input-container'>
                        <InputNumber
                            placeholder='Año de construcción'
                            onChange={handleConstructionYearChange}
                            controls={false}
                            className='input'
                            style={{ width: '100%' }}
                        />
                    </Space>


                </div>

                <div className='basics-fourth-section'>

                    <Space className='input-container'>
                        <Select
                            defaultValue={'Recámaras'}
                            options={
                                [
                                    { label: '1', value: '1' },
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                    { label: '4', value: '4' },
                                    { label: '5', value: '5' },
                                    { label: '6', value: '6' },
                                    { label: '7', value: '7' },
                                    { label: '8', value: '8' },
                                    { label: '9', value: '9' },
                                    { label: '10+', value: '10+' },
                                ]
                            }
                            className='select'
                            style={{ width: '100%', height: '100%' }}
                            onChange={handleBedroomsChange}
                        />
                    </Space>

                    <Space className='input-container'>
                        <Select
                            defaultValue={'Baños'}
                            options={
                                [
                                    { label: '1', value: '1' },
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                    { label: '4', value: '4' },
                                    { label: '5', value: '5' },
                                    { label: '6', value: '6' },
                                    { label: '7', value: '7' },
                                    { label: '8', value: '8' },
                                    { label: '9', value: '9' },
                                    { label: '10+', value: '10+' },
                                ]
                            }
                            className='select'
                            style={{ width: '100%', height: '100%' }}
                            onChange={handleBathroomsChange}
                        />
                    </Space>

                    <Space className='input-container'>
                        <Select
                            defaultValue={'Garaje'}
                            options={
                                [
                                    { label: '1', value: '1' },
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                    { label: '4', value: '4' },
                                    { label: '5', value: '5' },
                                    { label: '6', value: '6' },
                                    { label: '7', value: '7' },
                                    { label: '8', value: '8' },
                                    { label: '9', value: '9' },
                                    { label: '10+', value: '10+' },
                                ]
                            }
                            className='select'
                            style={{ width: '100%', height: '100%' }}
                            onChange={handleGarageChange}
                        />
                    </Space>

                </div>

            </div>

        </div>
    )
}