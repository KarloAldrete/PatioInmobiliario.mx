'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Tooltip } from 'antd';
import { BiSearch } from 'react-icons/bi';

const SearchModal: React.FC = () => {
    const route = useRouter();
    const [isRoute, setIsRoute] = useState(false);

    useEffect(() => {
        if (window.location.pathname === '/') {
            setIsRoute(true);
        } else {
            setIsRoute(false);
        }
    }, []);

    return (
        <Tooltip title="Buscar" placement="bottom">
            <BiSearch className="search-icon" onClick={() => route.push('/')} style={{ color: `${isRoute ? '#FF2E63' : 'black'}` }} />
        </Tooltip>
    )
}

export default SearchModal;