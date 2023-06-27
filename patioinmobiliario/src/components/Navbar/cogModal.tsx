'use client';
import React, { useState } from 'react';

import { Tooltip } from 'antd';
import { BiCog } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const CogModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return (

        <div className='icon-container'>

            <Tooltip title="Configuración" placement="bottom">
                <BiCog className="icon" onClick={handleModalOpen} style={{ color: `${isModalOpen ? '#FF2E63' : 'black'}` }} />
            </Tooltip>

            <div className={isModalOpen ? "settings-modal open" : "settings-modal"}>

                <div className='modal'>

                    <div className="first-row">

                        <h1>Configuración</h1>

                        <MdClose className="close-icon" onClick={handleModalClose} />

                    </div>

                </div>

            </div>

        </div>


    );
}

export default CogModal;