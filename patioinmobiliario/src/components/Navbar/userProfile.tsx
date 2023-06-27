'use client';
import {
    SignedIn,
    SignedOut,
    UserButton,
    useClerk
} from "@clerk/nextjs";
import { Tooltip } from 'antd';
import { FaRegUserCircle } from 'react-icons/fa';

export default function UserProfile() {
    const { openSignUp } = useClerk();


    return (
        <div className="icon-container">
            <SignedIn>
                <Tooltip title="Perfil" placement="bottom">
                    <UserButton />
                </Tooltip>
            </SignedIn>
            <SignedOut>
                <Tooltip title="Cuenta" placement="bottom">
                    <FaRegUserCircle className="icon" onClick={() => openSignUp()} />
                </Tooltip>
            </SignedOut>
        </div>
    );
}