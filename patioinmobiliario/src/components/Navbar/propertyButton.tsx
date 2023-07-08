'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MenuOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space, Divider, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import { ConfigProvider } from 'antd';

import { LiaCogSolid } from 'react-icons/lia';
import { HiOutlineDocument } from 'react-icons/hi';
import { BiHelpCircle } from 'react-icons/bi';
import { LuLayoutDashboard } from 'react-icons/lu';




const { useToken } = theme;

export default function PropertyButton() {
    const router = useRouter();
    const { token } = useToken();

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };

    const menuStyle = {
        boxShadow: 'none',
    };

    const items: MenuProps['items'] = [
        {
            key: 'dashboard',
            label: (
                <div className='dashboard-container' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 4 }}>
                    <LuLayoutDashboard style={{ fontSize: 18 }} />
                    <p onClick={() => router.push('/dashboard')}>
                        Panel de control
                    </p>
                </div>
            ),
        },
        {
            key: 'account',
            label: (
                <div className='account-container' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 4 }}>
                    <LiaCogSolid style={{ fontSize: 18 }} />
                    <p onClick={() => router.push('/account')}>
                        Ajustes de cuenta
                    </p>
                </div>
            ),
        },
        {
            key: 'guide',
            label: (
                <div className='guide-container' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 4 }}>
                    <HiOutlineDocument style={{ fontSize: 18 }} />
                    <p onClick={() => router.push('/guide')}>
                        Guía de publicación
                    </p>
                </div>
            ),
        },
        {
            key: 'help',
            label: (
                <div className='help-container' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 4 }}>
                    <BiHelpCircle style={{ fontSize: 18 }} />
                    <p onClick={() => router.push('/help')}>
                        Centro de ayuda
                    </p>
                </div>
            ),
        },
    ];


    return (
        
        <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#FF2E63',
            }
        }}
    >

        <div className='icon-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}>

            <Dropdown

                menu={{ items }}

                dropdownRender={(menu) => (

                    <div style={contentStyle}>

                        {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}

                        <Divider style={{ margin: 0 }} />

                        <Space style={{ padding: 8 }}>

                            <div className='plan-container' style={{ width: '200px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4, borderRadius: 4, padding: 8 }}>

                                <div className='plan-title'>
                                    <h4>Plan Gratis</h4>

                                    <div className='plan-description'>
                                    <p>Visitante</p>
                                    </div>

                                </div>

                                <Button type="primary" className='upgrade-button'>
                                        Mejorar
                                    </Button>

                            </div>

                        </Space>

                        <Divider style={{ margin: 0 }} />

                        <Space style={{ padding: 8 }}>
                            <Button type="primary" onClick={() => router.push('/create-property')}>
                                Crear publicación
                            </Button>
                        </Space>

                    </div>
                )}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <MenuOutlined style={{ fontSize: 20 }} />
                    </Space>
                </a>
            </Dropdown>


        </div>

        </ConfigProvider>

    );
}