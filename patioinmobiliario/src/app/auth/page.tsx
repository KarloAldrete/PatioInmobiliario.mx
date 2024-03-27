'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

import { login, signup } from '@/utils/supabase/login';

export default function AuthPage() {
    const [authType, setAuthType] = useState<'login' | 'signup'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [fnames, setFnames] = useState('')
    const [lnames, setLnames] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(false)

    const handleAuthType = (type: 'login' | 'signup') => {
        setAuthType(type)
    }

    useEffect(() => {
        if (password === confirmation) {
            setPasswordsMatch(true)
        } else {
            setPasswordsMatch(false)
        }
    }, [password, confirmation])

    return (
        <div className="w-full flex flex-col items-center justify-start pb-10">

            <form
                className="w-full max-w-[384px] h-auto flex flex-col items-center justify-center pt-[80px] pb-[40px] cursor-default gap-3"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append('email', email);
                    formData.append('password', password);

                    if (authType === 'signup') {
                        formData.append('fnames', fnames);
                        formData.append('lnames', lnames);
                        formData.append('confirmation', confirmation);
                        await signup(formData);
                    } else {
                        await login(formData);
                    }
                }}
            >

                <div className="flex flex-col items-center justify-start gap-2">

                    <picture>
                        <img alt="icon" src="https://zwisgscdtedupflsdyel.supabase.co/storage/v1/object/sign/images/PatioIcon.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvUGF0aW9JY29uLnN2ZyIsImlhdCI6MTcwNzE3OTI0MCwiZXhwIjoyMDIyNTM5MjQwfQ.E8xFMOiswFED5BLMlXerHdxZX5gY2D24oBTtvJKDKCM&t=2024-02-06T00%3A27%3A18.961Z" />
                    </picture>

                    <div className="flex flex-col items-center justify-start gap-1">

                        <span className=" text-xl leading-6 font-bold text-black">{authType === 'signup' ? 'Bienvenido a Patio Inmobiliario' : 'Es genial tenerte de regreso'}</span>

                        <span className=" text-base leading-[14px] font-normal text-[#A0A0A0]">{authType === 'signup' ? 'Crea una cuenta para comenzar' : 'Inicia sesión para continuar'}</span>

                    </div>

                </div>

                {authType === 'signup' && (
                    <div className='flex flex-col items-start justify-start gap-3 pt-3'>
                        <div className='w-full max-w-[384px] flex flex-row gap-5'>
                            <div className="flex flex-col">
                                <Label htmlFor='fnames' className='text-sm'>Nombre</Label>
                                <Input type='text' id='fnames' placeholder='Juan Carlos' onChange={(e) => setFnames(e.target.value)} />
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor='lnames' className='text-sm'>Apellido</Label>
                                <Input type='text' id='lnames' placeholder='Perez' onChange={(e) => setLnames(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                <div className='w-full max-w-[384px] flex flex-col gap-3'>
                    <div className="flex flex-col">
                        <Label htmlFor='email' className='text-sm'>Correo Electrónico</Label>
                        <Input type='email' id='email' placeholder='ejemplo@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col">
                        <Label htmlFor='password' className='text-sm'>Contraseña</Label>
                        <Input type='password' id='password' placeholder='*********' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {authType === 'signup' && (
                        <div className="flex flex-col">
                            <Label htmlFor='confirmation' className='text-sm'>Confirmar Contraseña</Label>
                            <Input type='password' id='confirmation' placeholder='*********' onChange={(e) => setConfirmation(e.target.value)} />
                        </div>
                    )}
                </div>

                <div className='w-full flex flex-col items-center justify-start gap-2'>

                    <Button type='submit' className='w-full h-9 bg-black text-white text-sm font-semibold flex items-center justify-center p-2' disabled={authType === 'signup' && (!passwordsMatch || password === '')}>
                        {authType === 'signup' ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </Button>

                    <div className='w-full flex items-center justify-center my-2'>
                        <div className='flex-grow border-t border-[#A0A0A0]'></div>
                        <span className='px-4 text-black font-semibold text-sm'>otras opciones</span>
                        <div className='flex-grow border-t border-[#A0A0A0]'></div>
                    </div>

                    <Button type='button' className='w-full h-9 bg-white text-black text-sm font-semibold flex items-center justify-center p-2 border border-[#E5E7EB] gap-2'>
                        <picture>
                            <img alt='google' src='https://zwisgscdtedupflsdyel.supabase.co/storage/v1/object/sign/images/google.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZ29vZ2xlLnN2ZyIsImlhdCI6MTcwNzE4MTY0MSwiZXhwIjoyMDIyNTQxNjQxfQ.aW74ZCtYbNmwkMpVYp4UjNBozRKwEjhdu8l3CNjf11E&t=2024-02-06T01%3A07%3A19.837Z' />
                        </picture>
                        {authType === 'signup' ? 'Regístrate con Google' : 'Iniciar con Google'}
                    </Button>

                </div>

                <div className='w-full max-w-[384px] flex flex-row gap-2 items-center justify-center'>
                    {authType === 'signup' ? (
                        <>
                            <span className='text-sm text-black leading-5 font-normal'>¿Ya tienes una cuenta?</span>
                            <span className='text-black font-semibold text-sm cursor-pointer' onClick={() => handleAuthType('login')}>Inicia Sesión</span>
                        </>
                    ) : (
                        <>
                            <span className='text-sm text-black leading-5 font-normal'>¿No tienes una cuenta?</span>
                            <span className='text-black font-semibold text-sm cursor-pointer' onClick={() => handleAuthType('signup')}>Regístrate</span>
                        </>
                    )}
                </div>

            </form>

        </div>
    )
}