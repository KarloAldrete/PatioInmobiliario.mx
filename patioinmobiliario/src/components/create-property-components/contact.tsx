'use client';
import React from "react";
import { Input, Space, Checkbox } from 'antd';

export default function Contact({ onChange }) {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleNameChange = ( event: any ) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => {
            onChange({ name: event.target.value });
            timeoutId = null;
        }, 500);
    };

    const handleEmailChange = ( event: any ) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => {
            onChange({ email: event.target.value });
            timeoutId = null;
        }, 500);
    };

    const handlePhoneChange = ( event: any ) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        timeoutId = setTimeout(() => {
            onChange({ phone: event.target.value });
            timeoutId = null;
        }, 500);
    };

    const handleWhatsappChange = ( event: any ) => {
        onChange({ whatsapp: event.target.checked });
    };

    return (
        <div className="module-container">

            <div className="module-title">
                <h2>Datos de Contacto</h2>
            </div>

            <div className="module-content">

                <div className="contact-first-section">

                    <Space className="personal-data">
                        <Input placeholder="Nombre" className="input" required onChange={handleNameChange} />
                    </Space>

                    <Space className="personal-data">
                        <Input placeholder="Correo Electrónico" className="input" type="email" required onChange={handleEmailChange} />
                    </Space>

                    <Space className="phone-data">
                        <Input placeholder="Teléfono" className="input-phone" required onChange={handlePhoneChange} />
                    </Space>

                    <Space className="checkbox-data">
                        <Checkbox onChange={handleWhatsappChange} className="checkbox">WhatsApp</Checkbox>
                    </Space>

                </div>

            </div>

        </div>
    )
}