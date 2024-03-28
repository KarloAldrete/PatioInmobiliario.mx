import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeaturedListings from "@/components/home/featuredListings";
import { Suspense } from "react";


export default function Page() {

  // const houses = [
  //   {
  //     image: [
  //       {
  //         url: "https://res.akamaized.net/domain/image/upload/t_web/v1629867843/65A_Champion_St_Brighton_VIC_1_bunjuj.jpg",
  //       }
  //     ],
  //     city: "San Francisco",
  //     estate: "California",
  //     price: 1000000,
  //     currency: "USD",
  //     description: "Cozy 3 bedroom house in a quiet neighborhood. This charming home offers a spacious living area, a modern kitchen, and a beautiful backyard perfect for family gatherings.",
  //     bedRooms: 3,
  //     bathRooms: 2,
  //     parkingLots: 2,
  //     id: "link1"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       }
  //     ],
  //     city: "Austin",
  //     estate: "Texas",
  //     price: 750000,
  //     currency: "USD",
  //     description: "Spacious 4 bedroom estate with large backyard, ideal for entertaining. Features include an open floor plan, gourmet kitchen, and a luxurious master suite with a walk-in closet.",
  //     bedRooms: 4,
  //     bathRooms: 3,
  //     parkingLots: 3,
  //     id: "link2"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       }
  //     ],
  //     city: "Seattle",
  //     estate: "Washington",
  //     price: 1200000,
  //     currency: "USD",
  //     description: "Modern 5 bedroom house with ocean view. Enjoy breathtaking sunsets from the expansive deck. Includes a chef's kitchen, hardwood floors, and a master suite with a spa-like bathroom.",
  //     bedRooms: 5,
  //     bathRooms: 4,
  //     parkingLots: 4,
  //     id: "link3"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D",
  //       }
  //     ],
  //     city: "Chicago",
  //     estate: "Illinois",
  //     price: 900000,
  //     currency: "USD",
  //     description: "Historic 3 bedroom townhouse in city center, close to shops and restaurants. Features original hardwood floors, a renovated kitchen, and a private rooftop deck with city views.",
  //     bedRooms: 3,
  //     bathRooms: 2,
  //     parkingLots: 2,
  //     id: "link4"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww",
  //       }
  //     ],
  //     city: "Miami",
  //     estate: "Florida",
  //     price: 650000,
  //     currency: "USD",
  //     description: "Charming 2 bedroom cottage with garden. This lovely home offers a cozy living space, updated kitchen, and a serene outdoor area with lush landscaping and room for a pool.",
  //     bedRooms: 2,
  //     bathRooms: 1,
  //     parkingLots: 1,
  //     id: "link5"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww",
  //       }
  //     ],
  //     city: "New York",
  //     estate: "New York",
  //     price: 1500000,
  //     currency: "USD",
  //     description: "Luxurious 6 bedroom penthouse in Manhattan with panoramic city views. Features high-end finishes, floor-to-ceiling windows, and exclusive access to building amenities.",
  //     bedRooms: 6,
  //     bathRooms: 5,
  //     parkingLots: 6,
  //     id: "link6"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww",
  //       }
  //     ],
  //     city: "Los Angeles",
  //     estate: "California",
  //     price: 800000,
  //     currency: "USD",
  //     description: "Stylish 4 bedroom house with pool in a sought-after neighborhood. Perfect for entertaining, with a modern kitchen, open living spaces, and a beautiful outdoor area.",
  //     bedRooms: 4,
  //     bathRooms: 3,
  //     parkingLots: 3,
  //     id: "link7"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww",
  //       }
  //     ],
  //     city: "Denver",
  //     estate: "Colorado",
  //     price: 1100000,
  //     currency: "USD",
  //     description: "Eco-friendly 3 bedroom house with solar panels. This energy-efficient home features a spacious layout, modern amenities, and a large backyard with a deck and mountain views.",
  //     bedRooms: 3,
  //     bathRooms: 2,
  //     parkingLots: 2,
  //     id: "link8"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww",
  //       }
  //     ],
  //     city: "Boston",
  //     estate: "Massachusetts",
  //     price: 950000,
  //     currency: "USD",
  //     description: "Quaint 2 bedroom apartment in historic district, close to parks and cafes. Offers a blend of classic charm and modern updates, with a spacious living area and a renovated kitchen.",
  //     bedRooms: 2,
  //     bathRooms: 1,
  //     parkingLots: 1,
  //     id: "link9"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww",
  //       }
  //     ],
  //     city: "San Diego",
  //     estate: "California",
  //     price: 1300000,
  //     currency: "USD",
  //     description: "Spacious 5 bedroom family home with large yard, perfect for outdoor activities. Features a gourmet kitchen, a home office, and a master suite with a large walk-in closet and ensuite bath.",
  //     bedRooms: 5,
  //     bathRooms: 4,
  //     parkingLots: 4,
  //     id: "link10"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1509600110300-21b9d5fedeb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww",
  //       }
  //     ],
  //     city: "Portland",
  //     estate: "Oregon",
  //     price: 850000,
  //     currency: "USD",
  //     description: "Beautiful 4 bedroom craftsman in a peaceful neighborhood. This home combines classic architecture with modern updates, featuring a large kitchen, a cozy fireplace, and a private backyard oasis.",
  //     bedRooms: 4,
  //     bathRooms: 3,
  //     parkingLots: 2,
  //     id: "link11"
  //   },
  //   {
  //     image: [
  //       {
  //         url: "https://images.unsplash.com/photo-1581974206939-b42731ea9dc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww",
  //       }
  //     ],
  //     city: "Philadelphia",
  //     estate: "Pennsylvania",
  //     price: 700000,
  //     currency: "USD",
  //     description: "Renovated 3 bedroom row home with a blend of historical charm and contemporary design. Located in a vibrant community, it offers an open floor plan, rooftop deck, and luxurious finishes throughout.",
  //     bedRooms: 3,
  //     bathRooms: 2,
  //     parkingLots: 1,
  //     id: "link12"
  //   }
  // ];

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