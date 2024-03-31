'use client';
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarImage } from "@/components/ui/avatar"

import AuthContext from '@/context/AuthContext';

import { IconCommand, IconFile, IconHome, IconLayoutGrid, IconLogout2, IconSettings, IconUserFilled } from '@tabler/icons-react';

type UserProfile = {
    avatar_url: string | null;
    created_at: string;
    current_properties: any | null;
    email: string;
    full_name: string;
    id: number;
    subscription_ends: string;
    subscription_start: string;
    subscription_status: boolean;
}


export default function Navbar() {
    const router = useRouter();
    const supabase = createClient();
    const [isOpen, setIsOpen] = useState(false);
    const auth = useAuth();
    const { user } = useContext(AuthContext) ?? { user: null };
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    useEffect(() => {

        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', user?.email);

            if (error) {
                console.error('Error fetching profile:', error);
                return;
            }

            console.log('Profile data:', data);
            setProfile(data?.[0]);
        };

        if (user) {
            fetchProfile();
        }

    }, [supabase, user]);

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleLogout = async () => {
        await auth?.logout();
    };

    console.log(profile?.subscription_ends);

    return (
        <nav className="w-full h-14 border-b border-[#E5E7EB] flex flex-row justify-between items-center px-8">

            <picture className="w-auto h-auto cursor-pointer" onClick={() => router.push("/")}>
                <img alt="logo" src="https://zwisgscdtedupflsdyel.supabase.co/storage/v1/object/sign/images/PatioLogo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvUGF0aW9Mb2dvLnN2ZyIsImlhdCI6MTcwNzE2NDA3MSwiZXhwIjoyMDIyNTI0MDcxfQ.k9oPbBDPvzNOBiuIoUJ3Aazw4MWaEuVB13WoBFOZQeU&t=2024-02-05T20%3A14%3A31.912Z" />
            </picture>

            <div className="flex flex-row gap-3 items-center justify-center">

                <Button className="w-auto border border-[#E5E7EB] h-8 flex flex-row items-center justify-start gap-8 py-[6px] pl-2 pr-1 hover:bg-[#E5E7EB] hover:text-white" onClick={handleOpen}>

                    <span className="text-sm leading-5 text-[#A0A0A0] font-medium">Buscar propiedades...</span>

                    <div className="bg-[#E5E7EB] flex flex-row items-center justify-center gap-[2px] w-auto p-1 rounded">

                        <IconCommand color="#A0A0A0" size={16} />

                        <span className="text-xs text-[#A0A0A0] font-semibold">K</span>

                    </div>

                </Button>


                {user ? (

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="w-8 h-8 flex items-center justify-center bg-black rounded-md">
                                <IconUserFilled className="text-white" />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className="pr-2mr-3 mr-12">
                                <Avatar className="w-8 h-8 flex items-center justify-center bg-black">
                                    <AvatarImage src={profile?.avatar_url || undefined} />
                                    <IconUserFilled className="text-white bg-black" />
                                </Avatar>
                                <div className="w-full h-full flex flex-col">
                                    <span className="text-sm leading-4">{profile?.full_name}</span>
                                    <span className="text-[12px] text-[#A0A0A0]">{profile?.email}</span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex gap-1" onClick={() => router.push('/dashboard')}>
                                <IconLayoutGrid size={16} stroke={2} />
                                Dashboard
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-1">
                                <IconHome size={16} stroke={2} />
                                Publicaciones
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-1">
                                <IconFile size={16} stroke={2} />
                                Guias
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-1">
                                <IconSettings size={16} stroke={2} />
                                Ajustes
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <div className="h-full py-2 px-2 flex flex-row items-center justify-start">

                                <div className="w-1/2 h-full flex flex-col">

                                    <span className="text-sm font-semibold text-black">{profile?.subscription_status ? "Suscripción Activa" : "Plan Gratuito"}</span>

                                    <span className="text-sm font-light">{profile?.current_properties?.length > 0 ? `${profile?.current_properties.length} publicaciones` : "Sin publicaciones"}</span>

                                </div>

                                <div className="w-1/2 flex items-center justify-end">
                                    {profile?.subscription_ends && profile?.subscription_status && new Date(profile.subscription_ends) > new Date() ? (
                                        <span className="text-sm h-[40px] flex items-end justify-end font-light p-0">
                                            Vence en {Math.ceil((new Date(profile.subscription_ends).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} dias
                                        </span>
                                    ) : (
                                        <Button className="font-semibold text-sm w-auto h-auto bg-black px-3 py-1 text-white">Actualizar</Button>
                                    )}
                                </div>

                            </div>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="flex gap-1" onClick={handleLogout}>
                                <IconLogout2 size={16} stroke={2} />
                                Cerrar Sesion
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                ) : (

                    <Button asChild className="w-auto h-8 bg-black text-white px-4 py-[6px] text-sm leading-5 font-semibold">
                        <Link href="/auth">
                            Acceder
                        </Link>
                    </Button>

                )}

                <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
                    <CommandInput placeholder="Buscar propiedades por ciudad..." />
                    <CommandList>
                        <CommandEmpty>No encontramos resultados</CommandEmpty>
                        <CommandGroup heading="Ciudades">
                            <CommandItem onClick={() => router.push("/search?city=guadalajara")}>
                                <span>GDL - Guadalajara</span>
                            </CommandItem>
                            <CommandItem>
                                <span>CDMX - Ciudad de México</span>
                            </CommandItem>
                            <CommandItem>
                                <span>MTY - Monterrey</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>

            </div>

        </nav>
    );
}