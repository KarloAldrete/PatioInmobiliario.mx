'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import '../styles/navbar.css';
import { Tooltip } from 'antd';

import Logo from '../public/logo.svg';

import { FaUserCircle } from 'react-icons/fa';
import { BiCog } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import { BiNews } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const Navbar: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const handleModalToggle = (modalName: string) => {
        setIsOpen(!isOpen);
        setActiveModal(modalName);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setActiveModal(null);
    };

    return (

        <nav>

            <div className="first-section">

                <Image src={Logo} alt="Logo" onClick={() => router.push('/')} style={{ cursor: 'pointer' }} />

            </div>

            <div className={isOpen ? "modals-section open" : "modals-section"}>

                <div className="modals">

                    <div className={activeModal === 'settings' ? "settings-modal open" : "settings-modal"}>

                        <div className="first-row">

                            <h1>Configuración</h1>

                            <MdClose className="close-icon" onClick={handleCloseModal} />

                        </div>

                    </div>

                    <div className={activeModal === 'profile' ? "profile-modal open" : "profile-modal"}>

                        <div className="first-row">

                            <h1>Perfil</h1>

                            <MdClose className="close-icon" onClick={handleCloseModal} />

                        </div>

                    </div>

                </div>

            </div>

            <div className="third-section">
                <div className="icons">
                    <Tooltip title="Buscar" placement="bottom">
                        <BiSearch className="search-icon" />
                    </Tooltip>
                    <Tooltip title="Noticias" placement="bottom">
                        <BiNews className="news-icon" onClick={() => router.push('/news')} />
                    </Tooltip>
                    <Tooltip title="Configuración" placement="bottom">
                        <BiCog className="config-icon" onClick={() => handleModalToggle('settings')} />
                    </Tooltip>
                    <Tooltip title="Perfil" placement="bottom">
                        <FaUserCircle className="user-icon" onClick={() => handleModalToggle('profile')} />
                    </Tooltip>
                </div>
            </div>

        </nav>

    );
};

export default Navbar;
