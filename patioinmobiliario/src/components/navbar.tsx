'use client';
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';

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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import AuthContext from '@/context/AuthContext';

import { IconCommand, IconLayoutGrid, IconLivePhoto, IconLogout2 } from '@tabler/icons-react';


export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const auth = useAuth();
    const { user } = useContext(AuthContext) ?? { user: null };

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

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleLogout = async () => {
        await auth?.logout();
    };

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
                            <Avatar className="w-8 h-8">
                                <AvatarImage />
                                <AvatarFallback>{user.email.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex gap-1" onClick={() => router.push('/dashboard')}>
                                <IconLivePhoto size={16} stroke={2} />
                                Dashboard
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-1">
                                <IconLayoutGrid size={16} stroke={2} />
                                Publicaciones
                            </DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
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