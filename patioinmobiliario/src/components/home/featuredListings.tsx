'use client';
import { useEffect, useState } from "react";
import { createClient } from '@/utils/supabase/client';
import { IconBathFilled, IconBedFilled, IconParking } from "@tabler/icons-react";
import PropertyButton from "@/components/home/propertyButton";


type Property = {
    id: number;
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
}


export default function FeaturedListings() {
    const supabase = createClient();
    const [houses, setHouses] = useState<Property[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from('properties')
                .select('*')
                .limit(12)

            console.log(data)
            setHouses(data || []);
        };
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <div className="w-full max-w-[1320px] flex flex-wrap justify-center gap-5 px-[60px]">

            {houses.map((house, index) => (
                <div key={index} className="h-auto col-span-1 border border-[#E5E7EB] w-auto min-w-[280px] max-w-[285px] rounded-md p-1 flex flex-col items-start justify-start gap-2">

                    <picture>
                        <img className="w-auto min-h-[180px] rounded" style={{ aspectRatio: '16 / 9' }} alt='houses' src={house.images?.[0].url} />
                    </picture>

                    <div className="w-full h-full flex flex-col items-start justify-between gap-2 pb-1 px-1 cursor-default">

                        <div className="flex flex-col items-start justify-start w-full gap-1">

                            <div className="w-full h-auto flex flex-row items-center justify-between">

                                <span className=" text-sm leading-[22px] text-black font-medium">{house.city}</span>

                                <span className=" text-sm leading-[22px] text-black font-medium">{house.state}</span>

                            </div>

                            <span className="text-base leading-5 font-bold text-black">${house.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} {house.currency}</span>

                        </div>

                        <div className="w-full h-auto flex flex-col gap-2">

                            <span className="text-sm leading-5 font-normal text-[#858585] overflow-hidden text-ellipsis line-clamp-3">
                                {house.description}
                            </span>

                            <div className="w-full h-auto flex gap-4">

                                <div className="flex flex-row gap-1 items-center justify-start">

                                    <IconBedFilled size={24} />

                                    <span className="text-sm leading-5 text-black font-semibold">{house.bedRooms}</span>

                                </div>

                                <div className="flex flex-row gap-1 items-center justify-start">

                                    <IconBathFilled size={20} />

                                    <span className="text-sm leading-5 text-black font-semibold">{house.bathRooms}</span>

                                </div>

                                <div className="flex flex-row gap-1 items-center justify-start">

                                    <IconParking size={22} />

                                    <span className="text-sm leading-5 text-black font-semibold">{house.parkingLots}</span>

                                </div>

                            </div>

                        </div>

                        <PropertyButton property={(house.id).toString()} />

                    </div>

                </div>
            ))}

        </div>
    )
}