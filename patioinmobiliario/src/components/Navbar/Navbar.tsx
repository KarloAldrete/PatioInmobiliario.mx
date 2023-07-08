import Image from 'next/image';

import Logo from '../../public/logo.svg';

import PropertyButton from './propertyButton';
import NewsModal from './newsModal';
import SearchModal from './search';

import { auth } from '@clerk/nextjs';
import UserProfile from './userProfile';


import '../../styles/navbar.css';

const Navbar = () => {
    const userId = auth().userId;

    return (

        <nav>

            <div className="navbar">

                <div className="first-section">

                    <Image src={Logo} alt="Logo" width={124} height={32} />

                </div>

                <div className="third-section">

                    <div className="icons">

                        <SearchModal />

                        <NewsModal />

                        <div className="user-icon" style={{ display: userId ? 'flex' : 'none' }}>

                            <PropertyButton />

                        </div>

                        <UserProfile />

                    </div>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;