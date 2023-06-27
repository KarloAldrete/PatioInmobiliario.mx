'use client';
import React, { useState } from 'react';

import { Tooltip } from 'antd';
import { BiNews } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const NewsModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return (

        <div className='icon-container'>

            <Tooltip title="Noticias" placement="bottom">
                <BiNews className="icon" onClick={handleModalOpen} style={{ color: `${isModalOpen ? '#FF2E63' : 'black'}` }} />
            </Tooltip>

            <div className={isModalOpen ? "news-modal open" : "news-modal"}>

                <div className='modal'>

                    <div className="first-row">

                        <h1>Noticias & Actualizaciones</h1>

                        <MdClose className="close-icon" onClick={handleModalClose} />

                    </div>

                </div>

            </div>

        </div>


    );
}

export default NewsModal;