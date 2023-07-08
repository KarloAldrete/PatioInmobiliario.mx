'use client';
import React from "react";
import { Button, Space } from 'antd';

export default function Upload({ onSubmit, onChange }) {
    const handlePreview = () => {
        console.log("Vista previa");
    };

    const handleCreatePublication = () => {
        console.log("Crear publicación");
        onSubmit();
    };

    return (
        <div className="upload-container">
            <div className="module-title">
                <h2>Crear publicación</h2>
            </div>

            <div className="module-content">
                <Space className="preview-data">
                    <Button type="default" onClick={handlePreview} className="button">
                        Vista previa
                    </Button>
                </Space>

                <Space className="button-data">
                    <Button type="primary" onClick={handleCreatePublication} className="button">
                        Crear publicación
                    </Button>
                </Space>
            </div>
        </div>
    );
}

