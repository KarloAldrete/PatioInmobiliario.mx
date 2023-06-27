import Image from 'next/image';

import Logo from '../../public/logo.svg';

import CogModal from './cogModal';
import NewsModal from './newsModal';
import SearchModal from './search';
// import { BiMenuAltRight } from 'react-icons/bi'

// import { auth } from '@clerk/nextjs';
import UserProfile from './userProfile';


import '../../styles/navbar.css';

const Navbar = () => {
    // const userId = auth().userId;

    // console.log(userId);

    return (

        <nav>

            <div className="navbar">

                <div className="first-section">

                    <Image src={Logo} alt="Logo" />

                </div>

                <div className="third-section">

                    <div className="icons">

                        <SearchModal />

                        <NewsModal />

                        <CogModal />

                        <UserProfile />

                    </div>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;