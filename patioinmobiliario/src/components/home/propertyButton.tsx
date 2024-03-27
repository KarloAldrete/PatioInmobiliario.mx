'use client';
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function PropertyButton({property}: {property: string}) {
    const router = useRouter();

    return (
        <Button className="w-full h-8 bg-[#F4F4F5] rounded border border-[#E5E7EB] text-[#A0A0A0] font-semibold text-sm leading hover:bg-black hover:text-white hover:border-transparent" onClick={() => router.push(`propiedades/${property}`)}>
            Ver detalles
        </Button>
    );

};