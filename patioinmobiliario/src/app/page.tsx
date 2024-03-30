import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeaturedListings from "@/components/home/featuredListings";
import { Suspense } from "react";


export default function Page() {

  return (
    <div className="w-full flex flex-col items-center justify-start pb-10">

      <div className="w-full max-w-[1320px] h-auto flex flex-col items-center justify-center pt-[80px] pb-[40px] cursor-default gap-2">

        <div className="flex flex-col items-center justify-center gap-2">

          <h1 className=" text-black font-bold text-6xl leading-[80px]">Encuentra tu proximo hogar</h1>

          <span className=" text-xl leading-5 font-medium text-[#A0A0A0]">Diseños unicos, espacios que inspiran. Tu próximo inmueble te espera.</span>

        </div>

        <div className="flex flex-row items-center justify-center gap-4 py-5">

          <Button asChild className="bg-black max-h-[36px] hover:bg-opacity-80 flex items-center justify-center px-4 py-2 rounded-md text-white font-semibold text-base leading-5 transition duration-300 ease-in-out">
            <Link href="/creacion">
              Crear anuncio
            </Link>
          </Button>

          <Button asChild className="bg-transparent max-h-[36px] border border-[#E5E7EB] hover:border-black flex items-center justify-center px-4 py-2 rounded-md text-black font-semibold text-base leading-5 transition duration-300 ease-in-out">
            <Link href="/contacto">
              Contactanos
            </Link>
          </Button>

        </div>

      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedListings />
      </Suspense>

    </div>
  );
};