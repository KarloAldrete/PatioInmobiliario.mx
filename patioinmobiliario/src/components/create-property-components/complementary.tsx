'use client';
import React from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';

export default function Complementary({ onChange }) {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleKitchenChange = (value) => {
            onChange({ kitchen: value });
    };

    const handleWashroomChange = (value) => {
            onChange({ washroom: value });
    };

    const handleGasChange = (value) => {
            onChange({ gas: value });
    };

    const handleGardenChange = (value) => {
            onChange({ garden: value });
    };

    const handleJacuzziChange = (value) => {
            onChange({ jacuzzi: value });
    };

    const handlePoolChange = (value) => {
            onChange({ pool: value });
    };

    const handleAcChange = (value) => {
            onChange({ ac: value });
    };

    const handleGymChange = (value) => {
            onChange({ gym: value });
    };

    return (

        <div className="module-container">

            <div className="module-title">
                <h2>Información complementaria</h2>
            </div>

            <div className="module-content">

                <div className="complementary-first-section">

                    <div className="module-item">

                        <Space>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handleKitchenChange}
                            />
                            <span>Cocina</span>
                        </Space>

                        <Space>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handleWashroomChange}
                            />
                            <span>Cuarto de lavado</span>
                        </Space>

                    </div>

                    <div className="module-item">

                        <Space>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handleGasChange}
                            />
                            <span>Gas</span>
                        </Space>

                        <Space>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handleGardenChange}
                            />
                            <span>Jardin</span>
                        </Space>

                    </div>

                    <div className="module-item">

                        <Space>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handleJacuzziChange}
                            />
                            <span>Jacuzzi</span>
                        </Space>

                        <Space>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handlePoolChange}
                            />
                            <span>Piscina</span>
                        </Space>

                    </div>

                    <div className="module-item">

                        <Space>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handleAcChange}
                            />
                            <span>A/C</span>
                        </Space>

                        <Space>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handleGymChange}
                            />
                            <span>Gym</span>
                        </Space>

                    </div>

                </div>

            </div>

        </div>

    )
}