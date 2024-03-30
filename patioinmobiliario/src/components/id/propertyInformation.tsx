'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';
import CustomGallery from '@/components/id/imageGallery';
import { IconBarbell, IconBath, IconBed, IconBlender, IconChartBubble, IconParking, IconPool, IconShirt, IconShovel, IconSquareHalf, IconWall } from '@tabler/icons-react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";


type Property = {
    id: string;
    created_at: string;
    images: { url: string; }[];
    city: string;
    state: string;
    price: number;
    currency: string;
    description: string;
    bedRooms: number;
    bathRooms: number;
    parkingLots: number;
    complementaryInformation: {
        ac: boolean;
        garden: boolean;
        gas: boolean;
        gym: boolean;
        jacuzzi: boolean;
        kitchen: boolean;
        pool: boolean;
        washroom: boolean;
    };
    constructionDimension: number;
    terrainDimension: number;
    type: string;
    yearBuild: number;
}

export default function Information() {
    const supabase = createClient();
    const pathname = usePathname();
    const id = pathname.split('/propiedades/')[1];
    const [house, setHouse] = useState<Property | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from('properties')
                .select('*')
                .eq('id', id)

            setHouse(data?.[0])
        };
        fetchData();
    }, [id, supabase]);

    if (!house) {
        return (
            <div className=''>
                <h2>Fetching Data</h2>
            </div>
        )
    }

    const splitDetails = () => {
        const mainDetails = [
            { icon: <IconBed />, text: `${house.bedRooms} habitaciones` },
            { icon: <IconBath />, text: `${house.bathRooms} baños completos` },
            { icon: <IconParking />, text: `${house.parkingLots} estacionamientos` },
            { icon: <IconWall />, text: `${house.constructionDimension} m² de construccion` },
            { icon: <IconSquareHalf />, text: `${house.terrainDimension} m² de terreno` },
            { icon: <IconShovel />, text: `${house.yearBuild} año de construccion` },
        ];

        const complementaryDetails = [
            { icon: <IconBlender />, text: 'Cocina', condition: house.complementaryInformation.kitchen },
            { icon: <IconBarbell />, text: 'Gimnasio', condition: house.complementaryInformation.gym },
            { icon: <IconShirt />, text: 'Cuarto de lavado', condition: house.complementaryInformation.washroom },
            { icon: <IconPool />, text: 'Piscina', condition: house.complementaryInformation.pool },
            { icon: <IconChartBubble />, text: 'Jacuzzi', condition: house.complementaryInformation.jacuzzi },
        ].filter(detail => detail.condition);

        const combinedDetails = [...mainDetails, ...complementaryDetails];

        const half = Math.ceil(combinedDetails.length / 2);
        return {
            left: combinedDetails.slice(0, half),
            right: combinedDetails.slice(half),
        };
    };

    const { left, right } = splitDetails();

    return (
        <div className='w-full max-w-[1320px] h-auto flex flex-col items-center justify-center py-[40px] cursor-default gap-5'>

            <div className='border border-[#E5E7EB] w-full rounded-lg p-4 flex flex-col items-center justify-start gap-4'>

                <div className='w-full h-auto flex items-center justify-between gap-[2px]'>

                    <span className='text-black font-bold text-[20px] leading-6'>Imágenes</span>

                    <div className='flex gap-2 text-[#858585] text-base font-normal leading-5'>

                        <span>{house.city}, {house.state}</span>

                    </div>

                </div>

                <CustomGallery images={house.images} />

            </div>

            <div className='w-full h-auto flex items-start justify-start gap-5'>

                <div className='w-8/12 flex flex-col gap-5 items-start justify-start'>

                    <div className='border border-[#E5E7EB] w-full p-4 flex flex-col items-start justify-start gap-4 rounded-md'>

                        <span className='text-black font-bold text-base leading-6'>Detalles de la propiedad</span>

                        <div className='w-full h-auto flex items-start justify-start gap-5'>

                            <div className='w-6/12 flex flex-col gap-5 items-start justify-start'>
                                {left.map((detail, index) => (
                                    <div key={index} className='flex flex-row items-center gap-2 text-[#858585] text-base font-normal leading-5 w-full max-w-[356px]'>
                                        {detail.icon}
                                        <span>{detail.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className='w-6/12 flex flex-col gap-5 items-start justify-start'>
                                {right.map((detail, index) => (
                                    <div key={index} className='flex flex-row items-center gap-2 text-[#858585] text-base font-normal leading-5 w-full max-w-[356px]'>
                                        {detail.icon}
                                        <span>{detail.text}</span>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                    <div className='border border-[#E5E7EB] w-full h-auto p-4 rounded-md flex flex-row items-center justify-between'>

                        <span className='text-black font-bold text-base leading-6'>Ubicación y lugares de interés</span>



                    </div>

                </div>

                <div className='w-4/12 flex flex-col gap-5 items-start justify-start'>

                    <div className='border border-[#E5E7EB] w-full h-auto p-4 rounded-md flex flex-row items-center justify-between'>

                        <span className='text-black font-bold text-base leading-6'>{house.type.charAt(0).toUpperCase() + house.type.slice(1)}</span>

                        <span className='text-[#858585] font-normal text-base leading-5'>{(house.price).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} {house.currency}</span>

                    </div>

                    <div className='border border-[#E5E7EB] w-full h-auto p-4 rounded-md flex flex-col items-start justify-start gap-2'>

                        <span className='text-black font-bold text-base leading-6'>Descripción</span>

                        <span className='text-[#858585] font-normal text-base leading-5'>{house.description}</span>

                    </div>

                    <div className='w-full h-auto p-2 bg-black rounded flex items-center justify-center cursor-pointer'>

                        <span className='text-white text-base leading-5 font-semibold'>Agendar una visita</span>

                    </div>

                </div>

            </div>

        </div>
    )

}