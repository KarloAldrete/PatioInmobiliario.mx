'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import UserContext from '@/context/UserContext';
import { createClient } from '@/utils/supabase/client';

type User = {
    email: string;
};

const supabase = createClient();

const AuthContext = createContext<{ user: User | null, logout: () => Promise<void> } | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await UserContext();
            if (data !== undefined && data?.user !== undefined) {
                setAuthUser(data?.user as unknown as User);
            } else {
                setAuthUser(null);
            }
        };

        fetchUser();
    }, []);

    const handleLogOut = async () => {
        await supabase.auth.signOut();
        setAuthUser(null);
    };

    return <AuthContext.Provider value={{ user: authUser, logout: handleLogOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;