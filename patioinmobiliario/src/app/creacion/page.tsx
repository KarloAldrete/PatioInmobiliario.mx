'use client';
import { Button } from "@/components/ui/button";
import { useEffect, useState, ChangeEvent, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { IconBathFilled, IconBedFilled, IconChevronLeft, IconChevronRight, IconParking } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createClient } from '@/utils/supabase/client';
import AuthContext from "@/context/AuthContext";


type CitiesByState = {
  [key: string]: string[];
};

type ImageData = {
  url: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
};


export default function Page() {
  const { user } = useContext(AuthContext) ?? { user: null };
  const [currentStep, setCurrentStep] = useState(0);
  const [currentCity, setCurrentCity] = useState("Ciudad");
  const [currentZone, setCurrentZone] = useState("Ubicación");
  const [currentType, setCurrentType] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentDescription, setCurrentDescription] = useState("Una descripcion acerca de lo increible que es esta propiedad y las amenidades a su alrededor...");
  const [currentImages, setCurrentImages] = useState<ImageData[]>([]);
  const [currentFeatureImage, setCurrentFeatureImage] = useState(null as string | null);
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [currentTerrain, setCurrentTerrain] = useState(0);
  const [currentConstruction, setCurrentConstruction] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [currentRooms, setCurrentRooms] = useState(0);
  const [currentBathrooms, setCurrentBathrooms] = useState(0);
  const [currentParkings, setCurrentParkings] = useState(0);
  const [cities, setCities] = useState([] as string[]);
  const [isKitchenOn, setIsKitchenOn] = useState(false);
  const [isWashroomOn, setIsWashroomOn] = useState(false);
  const [isGasOn, setIsGasOn] = useState(false);
  const [isGardenOn, setIsGardenOn] = useState(false);
  const [isJacuzziOn, setIsJacuzziOn] = useState(false);
  const [isPoolOn, setIsPoolOn] = useState(false);
  const [isAcOn, setIsAcOn] = useState(false);
  const [isGymOn, setIsGymOn] = useState(false);
  const supabase = createClient();





  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        file: file
      }));
      setCurrentImages(currentImages => [...currentImages, ...fileArray]);
    }
  };

  const triggerFileInputClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleRemoveImage = (index: number) => {
    setCurrentImages(currentImages => currentImages.filter((_, i) => i !== index));
  };

  const handleRoomChange = (change: number) => {
    setCurrentRooms(currentRooms + change);
  };

  const handleBathroomChange = (change: number) => {
    setCurrentBathrooms(currentBathrooms + change);
  };

  const handleParkingChange = (change: number) => {
    setCurrentParkings(currentParkings + change);
  };

  const handleStateChange = (state: any) => {
    const cities = citiesByState[state] || [];
    setCities(cities);
  };

  const handleFinish = async () => {

    try {

      const bucketCheck = await supabase
        .storage
        .from('properties')
        .list(`${user?.email}`, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        })

      console.log("Bucket check results:", bucketCheck);

      if (bucketCheck.data?.[0].name == '.emptyFolderPlaceholder') {

        const uploadPromises = currentImages.map((image) => {
          const filePath = `${user?.email}/1/${image.name}`;

          return supabase.storage.from('properties').upload(filePath, image.file, {
            cacheControl: '3600',
            upsert: false,
          });

        });

        const uploadResults = await Promise.all(uploadPromises);

        console.log(uploadResults);

        setTimeout(async () => {

          const doubleCheck = await supabase
            .storage
            .from('properties')
            .list(`${user?.email}/1`, {
              limit: 100,
              offset: 0,
            })

          const supabaseImages = doubleCheck.data;

          const imageUrls = supabaseImages?.map((image) => {
            return supabase.storage.from(`properties/${user?.email}`).getPublicUrl(`1/${image.name}`);
          });

          imageUrls?.map((image) => {
            console.log(image.data.publicUrl);
          })

        }, 2000);

      } else {

        const newIndex = parseInt(bucketCheck.data?.[0].name || '1') + 1;

        const uploadPromises = currentImages.map((image) => {
          const filePath = `${user?.email}/${newIndex}/${image.name}`;

          return supabase.storage.from('properties').upload(filePath, image.file, {
            cacheControl: '3600',
            upsert: false,
          });

        });

        const uploadResults = await Promise.all(uploadPromises);

        console.log(uploadResults);

        setTimeout(async () => {
          const doubleCheck = await supabase
            .storage
            .from('properties')
            .list(`${user?.email}/${newIndex}`, {
              limit: 100,
              offset: 0,
            })

          const supabaseImages = doubleCheck.data;

          const imageUrls = supabaseImages?.map((image) => {
            return supabase.storage.from(`properties/${user?.email}`).getPublicUrl(`${newIndex}/${image.name}`);
          }) || []; // Ensure imageUrls is always an array

          // Assuming handleInsert expects a JSON object for images, convert imageUrls to JSON
          const imageUrlsJson = JSON.stringify(imageUrls.map(imageUrl => ({ url: imageUrl.data.publicUrl })));

          const complementaryInformation = {
            kitchen: isKitchenOn,
            washroom: isWashroomOn,
            gas: isGasOn,
            garden: isGardenOn,
            jacuzzi: isJacuzziOn,
            pool: isPoolOn,
            ac: isAcOn,
            gym: isGymOn
          };

          handleInsert(JSON.parse(imageUrlsJson), currentCity, currentZone, currentPrice, currentCurrency, currentDescription, currentRooms, currentBathrooms, currentParkings, currentType, currentTerrain, currentConstruction, currentYear, complementaryInformation);

        }, 2000);

      }

    } catch (error) {

      console.error('Error uploading images:', error);

    };

  };

  async function handleInsert(images: any, city: string, state: string, price: number, currency: string, description: string, bedRooms: number, bathRooms: number, parkingLots: number, type: string, terrainDimension: number, constructionDimension: number, yearBuild: number, complementaryInformation: { kitchen: boolean; washroom: boolean; gas: boolean; garden: boolean; jacuzzi: boolean; pool: boolean; ac: boolean; gym: boolean; }) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert({
          images: images,
          city: city,
          state: state,
          price: price,
          currency: currency,
          description: description,
          bedRooms: bedRooms,
          bathRooms: bathRooms,
          parkingLots: parkingLots,
          type: type,
          terrainDimension: terrainDimension,
          constructionDimension: constructionDimension,
          yearBuild: yearBuild,
          complementaryInformation: complementaryInformation,
        })

      console.log(data);
      if (error) throw error;
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }





  useEffect(() => {
    if (currentRooms < 0) {
      setCurrentRooms(0);
    };
    if (currentBathrooms < 0) {
      setCurrentBathrooms(0);
    };
    if (currentParkings < 0) {
      setCurrentParkings(0);
    };
  }, [currentStep, currentRooms, currentBathrooms, currentParkings]);

  useEffect(() => {
    if (currentImages.length > 0) {
      setCurrentFeatureImage(currentImages[0].url);
    }
  }, [currentImages]);

  const citiesByState: CitiesByState = {
    Aguascalientes: [
      "Aguascalientes",
      "Jesus Maria",
    ],
    "Baja California": [
      "Tijuana",
      "Mexicali",
      "Ensenada",
      "Rosarito",
      "Tecate",
    ],
    "Baja California Sur": [
      "La Paz",
      "Los Cabos",
      "Comondu",
      "Mulege",
      "Loreto",
    ],
    Campeche: [
      "Campeche",
      "Carmen",
      "Champoton",
      "Hecelchakan",
      "Hopelchen",
      "Palizada",
      "Tenabo",
      "Escarcega",
      "Calakmul",
      "Candelaria",
    ],
    Chiapas: [
      "Tuxtla Gutierrez",
      "Tapachula",
      "San Cristobal",
      "Palenque",
      "Comitan",
      "Villaflores",
      "Tonalá",
      "Chiapa de Corzo",
      "Ocosingo",
      "Las Margaritas",
      "Pichucalco",
      "Cintalapa",
      "Simojovel",
      "Frontera Comalapa",
      "Yajalon",
      "Tila",
      "Tumbala",
      "Benemerito de las Americas",
      "Ostuacan",
      "Amatan",
      "Chilon",
      "Escuintla",
      "Jaltenango",
      "Maravilla Tenejapa",
      "Pueblo Nuevo Solistahuacan",
      "Reforma",
      "Sabanilla",
      "Sitala",
      "Socoltenango",
      "Solosuchiapa",
      "Tenejapa",
      "Tuxtla Chico",
      "Villa Corzo",
      "Zinacantan",
      "Acala",
      "Aldama",
      "Altamirano",
      "Ametepec",
      "Angel Albino Corzo",
      "Arriaga",
      "Bejucal de Ocampo",
      "Bella Vista",
      "Berriozabal",
      "Bochil",
      "Cacahoatan",
      "Catazaja",
      "Chalchihuitan",
      "Chamula",
      "Chanal",
      "Chapultenango",
      "Chenalho",
      "Chiapilla",
      "Chicoasen",
      "Chicomuselo",
      "Coapilla",
      "Comitan de Dominguez",
      "Copainala",
      "El Bosque",
      "El Porvenir",
      "Francisco Leon",
      "Huehuetan",
      "Huitiupan",
      "Huixtla",
      "Ixhuatan",
      "Ixtacomitan",
      "Ixtapa",
      "Ixtapangajoya",
      "Jiquipilas",
      "Jitotol",
      "Juarez",
      "La Concordia",
      "La Grandeza",
      "La Independencia",
      "La Libertad",
      "La Trinitaria",
      "Larrainzar",
      "Mapastepec",
      "Marquelia",
      "Mazapa de Madero",
      "Mazatan",
      "Metapa",
    ].filter((value, index, self) => self.indexOf(value) === index), // Remove duplicates
    Chihuahua: [
      "Chihuahua",
      "Juarez",
      "Delicias",
      "Cuauhtemoc",
      "Hidalgo del Parral",
      "Nuevo Casas Grandes",
      "Camargo",
      "Jimenez",
      "Ojinaga",
    ],
    // Added missing states and cities
    Durango: [
      "Durango",
      "Gomez Palacio",
      "Lerdo",
      "Pueblo Nuevo",
      "El Oro",
    ],
    Guanajuato: [
      "León",
      "Irapuato",
      "Celaya",
      "Salamanca",
      "Guanajuato",
      "Dolores Hidalgo",
      "San Miguel de Allende",
      "Acámbaro",
      "Silao",
      "Pénjamo",
      "San Francisco del Rincón",
      "Valle de Santiago",
      "Salvatierra",
      "Cortazar",
      "Uriangato",
      "Santa Cruz de Juventino Rosas",
      "San Luis de la Paz",
      "Yuriria",
      "Apaseo el Grande",
      "Cuerámaro",
      "Purísima del Rincón",
      "Romita",
      "San Diego de la Unión",
      "San Felipe",
      "Tarandacuao",
      "Tarimoro",
      "Villagrán",
      "Atarjea",
      "Comonfort",
      "Coroneo",
      "Doctor Mora",
      "Huanímaro",
      "Jaral del Progreso",
      "Jerécuaro",
      "Manuel Doblado",
      "Moroleón",
      "Ocampo",
      "Pueblo Nuevo",
      "San José Iturbide",
      "Santa Catarina",
      "Tierra Blanca",
      "Victoria",
    ].filter((value, index, self) => self.indexOf(value) === index), // Remove duplicates
    Guerrero: [
      "Acapulco",
      "Chilpancingo",
      "Iguala",
      "Taxco",
      "Zihuatanejo",
      "Ciudad Altamirano",
      "Chilapa",
      "Tlapa",
      "Arcelia",
      "Ayutla",
      "Coyuca de Benitez",
      "Cruz Grande",
      "Huitzuco",
      "Marquelia",
      "Ometepec",
      "Petatlan",
      "Tecpan",
      "Tixtla",
      "Tlapehuala",
      "Xochihuehuetlan",
    ],
    Hidalgo: [
      "Pachuca",
      "Tulancingo",
      "Tizayuca",
      "Huejutla",
      "Ixmiquilpan",
      "Actopan",
      "Apan",
      "Atotonilco el Grande",
      "Tlahuelilpan",
      "Tula",
      "Zacualtipan",
      "Tepeapulco",
      "Tepeji",
      "Zimapán",
      "Tlaxcoapan",
      "Tlaxiaca",
      "Tezontepec",
      "Tetepango",
    ]
  };





  return (
    <div className="w-full h-full flex flex-col items-center justify-start pb-10 px-[60px]">

      <div className="w-full max-w-[1320px] h-auto flex flex-col items-start justify-start py-10 cursor-default gap-1">

        <span className="text-2xl leading-7 font-bold text-black">Publica un inmueble</span>

        <span className=" text-base leading-5 text-[#A0A0A0] font-normal">Aqui puedes agregar propiedades a tus listados</span>

      </div>

      <div className="w-full max-w-[1320px] h-full flex flex-row justify-start items-start gap-5">

        <div className="rounded w-8/12 h-screen max-h-[480px] flex flex-col">

          {currentStep === 0 && (
            <div className={`${currentImages.length > 0 ? "h-auto" : "h-full"} border border-[#E5E7EB] rounded-md p-3 flex flex-col items-start justify-start gap-3`}>

              <span className="text-base leading-5 font-semibold text-[#A0A0A0]">Imagenes</span>

              {currentImages.length > 0 ? (
                <div className="h-auto flex flex-wrap gap-3 items-start justify-start">

                  {currentImages.map((image, index) => (
                    <div key={index} className="w-[130px] h-[130px] relative bg-[#F4F4F5] rounded group">
                      <picture>
                        <img className="w-full h-full rounded object-cover" alt={`img-${index}`} src={image.url} />
                      </picture>
                      <button
                        className="absolute top-0 right-0 left-0 bottom-0 bg-black rounded bg-opacity-50 text-white font-bold p-1 rounded-bl opacity-0 group-hover:opacity-100"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}

                </div>
              ) : (
                <div className="w-full h-full text-center py-5 flex items-center justify-center">
                  <span className="text-sm text-gray-500">No hay imágenes para mostrar. Por favor, agrega algunas.</span>
                </div>
              )}

              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <Button className="bg-black rounded h-auto max-h-[32px] w-full text-white font-semibold" onClick={triggerFileInputClick}>
                Agregar Imagenes
              </Button>

            </div>
          )}

          {currentStep === 1 && (
            <div className="w-full flex flex-col items-start justify-start gap-5">

              <div className="w-full border border-[#E5E7EB] h-auto rounded-md p-3 flex flex-col items-start justify-start gap-3">

                <span className="text-base leading-5 font-semibold text-[#A0A0A0]">Informacion Basica</span>

                <div className="w-full flex justify-between gap-5 items-end">

                  <div className="flex flex-col w-full">
                    <Label htmlFor='price' className='text-sm'>Precio</Label>
                    <Input value={currentPrice > 0 ? currentPrice : ''} className="h-10 w-full" type='number' id='price' placeholder='1,250,000' onChange={(e) => setCurrentPrice(e.target.value ? +parseInt(e.target.value) : 0)} />
                  </div>

                  <div className="flex flex-col w-full">
                    <Label htmlFor='currency' className='text-sm'>Moneda</Label>
                    <Select value={currentCurrency} onValueChange={(value) => setCurrentCurrency(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="MXN">Pesos Mexicanos</SelectItem>
                          <SelectItem value="USD">Dolares Americanos</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col">

                    <Label htmlFor='type' className='text-sm'>Tipo</Label>
                    <div className="flex w-full h-10 rounded-md border border-[#E5E7EB]">
                      <RadioGroup defaultValue="comfortable" className="h-10 flex gap-5 px-3" value={currentType} onValueChange={(value) => setCurrentType(value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="venta" id="venta" />
                          <Label htmlFor="venta" className="font-normal">Venta</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="renta" id="renta" />
                          <Label htmlFor="renta" className="font-normal">Renta</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="traspaso" id="traspaso" />
                          <Label htmlFor="traspaso" className="font-normal">Traspaso</Label>
                        </div>
                      </RadioGroup>
                    </div>

                  </div>

                </div>

                <div className="w-full flex justify-between gap-5 items-end">

                  <div className="flex flex-col w-full">
                    <Label htmlFor='zone' className='text-sm'>Estado</Label>
                    <Select value={currentZone} onValueChange={(value) => { setCurrentZone(value); handleStateChange(value); }}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Aguascalientes">Aguascalientes</SelectItem>
                          <SelectItem value="Baja California">Baja California</SelectItem>
                          <SelectItem value="Baja California Sur">Baja California Sur</SelectItem>
                          <SelectItem value="Campeche">Campeche</SelectItem>
                          <SelectItem value="Chiapas">Chiapas</SelectItem>
                          <SelectItem value="Chihuahua">Chihuahua</SelectItem>
                          <SelectItem value="Coahuila">Coahuila</SelectItem>
                          <SelectItem value="Colima">Colima</SelectItem>
                          <SelectItem value="Durango">Durango</SelectItem>
                          <SelectItem value="Estado de Mexico">Estado de Mexico</SelectItem>
                          <SelectItem value="Guanajuato">Guanajuato</SelectItem>
                          <SelectItem value="Guerrero">Guerrero</SelectItem>
                          <SelectItem value="Hidalgo">Hidalgo</SelectItem>
                          <SelectItem value="Jalisco">Jalisco</SelectItem>
                          <SelectItem value="Michoacan">Michoacan</SelectItem>
                          <SelectItem value="Morelos">Morelos</SelectItem>
                          <SelectItem value="Nayarit">Nayarit</SelectItem>
                          <SelectItem value="Nuevo Leon">Nuevo Leon</SelectItem>
                          <SelectItem value="Oaxaca">Oaxaca</SelectItem>
                          <SelectItem value="Puebla">Puebla</SelectItem>
                          <SelectItem value="Queretaro">Queretaro</SelectItem>
                          <SelectItem value="Quintana Roo">Quintana Roo</SelectItem>
                          <SelectItem value="San Luis Potosi">San Luis Potosi</SelectItem>
                          <SelectItem value="Sinaloa">Sinaloa</SelectItem>
                          <SelectItem value="Sonora">Sonora</SelectItem>
                          <SelectItem value="Tabasco">Tabasco</SelectItem>
                          <SelectItem value="Tamaulipas">Tamaulipas</SelectItem>
                          <SelectItem value="Tlaxcala">Tlaxcala</SelectItem>
                          <SelectItem value="Veracruz">Veracruz</SelectItem>
                          <SelectItem value="Yucatan">Yucatan</SelectItem>
                          <SelectItem value="Zacatecas">Zacatecas</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col w-full">
                    <Label htmlFor='city' className='text-sm'>Ciudad</Label>
                    <Select value={currentCity} onValueChange={(value) => setCurrentCity(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                </div>

                <div className="w-full flex justify-between gap-5 items-end">

                  <div className="flex flex-col w-full">
                    <Label htmlFor='terrain' className='text-sm'>Dimensiones del terreno</Label>
                    <Input value={currentTerrain > 0 ? currentTerrain : ''} className="h-10 w-full" type='number' id='terrain' placeholder='200' onChange={(e) => setCurrentTerrain(parseInt(e.target.value))} />
                  </div>

                  <div className="flex flex-col w-full">
                    <Label htmlFor='construction' className='text-sm'>Dimensiones de construccion</Label>
                    <Input value={currentConstruction > 0 ? currentConstruction : ''} className="h-10 w-full" type='number' id='construction' placeholder='300' onChange={(e) => setCurrentConstruction(parseInt(e.target.value))} />
                  </div>

                  <div className="flex flex-col w-full">
                    <Label htmlFor='year' className='text-sm'>Año de construccion</Label>
                    <Input value={currentYear > 0 ? currentYear : ''} className="h-10 w-full" type='number' id='year' placeholder='2015' onChange={(e) => setCurrentYear(parseInt(e.target.value))} />
                  </div>

                </div>

                <div className="w-full flex justify-between gap-5 items-end">

                  <div className="flex flex-row w-full h-10 bg-[#E5E7EB] rounded-md items-center justify-between px-3 py-2 gap-3">

                    <span className='text-sm font-medium'>Habitaciones</span>

                    <div className="h-full w-auto flex flex-row items-center justify-center gap-3">

                      <Button className="bg-white p-0 w-7 h-full flex items-center justify-center" onClick={() => handleRoomChange(- 1)}>
                        <IconChevronLeft color="#000000" size={16} />
                      </Button>

                      <span className="text-sm leading-5 font-normal text-black">{currentRooms}</span>

                      <Button className="bg-white p-0 w-7 h-full flex items-center justify-center" onClick={() => handleRoomChange(+ 1)}>
                        <IconChevronRight color="#000000" size={16} />
                      </Button>

                    </div>

                  </div>

                  <div className="flex flex-row w-full h-10 bg-[#E5E7EB] rounded-md items-center justify-between px-3 py-2 gap-3">

                    <span className='text-sm font-medium'>Baños</span>

                    <div className="h-full w-auto flex flex-row items-center justify-center gap-3">

                      <Button className="bg-white p-0 w-7 h-full flex items-center justify-center" onClick={() => handleBathroomChange(- 1)}>
                        <IconChevronLeft color="#000000" size={16} />
                      </Button>

                      <span className="text-sm leading-5 font-normal text-black">{currentBathrooms}</span>

                      <Button className="bg-white p-0 w-7 h-full flex items-center justify-center" onClick={() => handleBathroomChange(+ 1)}>
                        <IconChevronRight color="#000000" size={16} />
                      </Button>

                    </div>

                  </div>

                  <div className="flex flex-row w-full h-10 bg-[#E5E7EB] rounded-md items-center justify-between px-3 py-2 gap-3">

                    <span className='text-sm font-medium'>Estacionamientos</span>

                    <div className="h-full w-auto flex flex-row items-center justify-center gap-3">

                      <Button className="bg-white p-0 w-7 h-full flex items-center justify-center" onClick={() => handleParkingChange(- 1)}>
                        <IconChevronLeft color="#000000" size={16} />
                      </Button>

                      <span className="text-sm leading-5 font-normal text-black">{currentParkings}</span>

                      <Button className="bg-white p-0 w-7 h-full flex items-center justify-center" onClick={() => handleParkingChange(+ 1)}>
                        <IconChevronRight color="#000000" size={16} />
                      </Button>

                    </div>

                  </div>

                </div>

              </div>

              <div className="w-full border border-[#E5E7EB] h-auto rounded-md p-3 flex flex-col items-start justify-start gap-3">

                <span className="text-base leading-5 font-semibold text-[#A0A0A0]">Informacion Complementaria</span>

                <div className="w-full h-auto flex flex-col gap-5">

                  <div className="w-full flex flex-row gap-[100px]">

                    <div className="flex flex-col gap-2 items-start justify-start">

                      <div className="flex flex-row items-center justify-start gap-2">

                        <Switch id="kitchen" checked={isKitchenOn} onCheckedChange={() => setIsKitchenOn(!isKitchenOn)} />

                        <Label htmlFor='kitchen' className='text-sm'>Cocina</Label>

                      </div>

                      <div className="flex flex-row items-center justify-start gap-2">

                        <Switch id="washroom" checked={isWashroomOn} onCheckedChange={() => setIsWashroomOn(!isWashroomOn)} />

                        <Label htmlFor='washroom' className='text-sm'>Cuarto de lavado</Label>

                      </div>

                    </div>

                    <div className="flex flex-col gap-2 items-start justify-start">

                      <div className="flex flex-row items-center justify-start gap-2">

                        <Switch id="gas" checked={isGasOn} onCheckedChange={() => setIsGasOn(!isGasOn)} />

                        <Label htmlFor='gas' className='text-sm'>Gas</Label>

                      </div>

                      <div className="flex flex-row items-center justify-start gap-2">

                        <Switch id="garden" checked={isGardenOn} onCheckedChange={() => setIsGardenOn(!isGardenOn)} />

                        <Label htmlFor='garden' className='text-sm'>Jardin</Label>

                      </div>

                    </div>

                    <div className="flex flex-col gap-2 items-start justify-start">

                      <div className="flex flex-row items-center justify-start gap-2">

                        <Switch id="jacuzzi" checked={isJacuzziOn} onCheckedChange={() => setIsJacuzziOn(!isJacuzziOn)} />

                        <Label htmlFor='jacuzzi' className='text-sm'>Jacuzzi</Label>

                      </div>

                      <div className="flex flex-row items-center justify-start gap-2">

                        <Switch id="pool" checked={isPoolOn} onCheckedChange={() => setIsPoolOn(!isPoolOn)} />

                        <Label htmlFor='pool' className='text-sm'>Piscina</Label>

                      </div>

                    </div>

                    <div className="flex flex-col gap-2 items-start justify-start">

                      <div className="flex flex-row items-center justify-start gap-2">

                        <Switch id="ac" checked={isAcOn} onCheckedChange={() => setIsAcOn(!isAcOn)} />

                        <Label htmlFor='ac' className='text-sm'>A/C</Label>

                      </div>

                      <div className="flex flex-row items-center justify-start gap-2">

                        <Switch id="gym" checked={isGymOn} onCheckedChange={() => setIsGymOn(!isGymOn)} />

                        <Label htmlFor='gym' className='text-sm'>Gimnasio</Label>

                      </div>

                    </div>

                  </div>

                  <div className="w-full min-h-10">

                    <Label htmlFor='description' className='text-sm'>Descripcion</Label>
                    <Textarea value={currentDescription} className="h-10 w-full" id='description' placeholder='Una descripcion acerca de lo increible que es esta propiedad y las amenidades a su alrededor...' onChange={(e) => setCurrentDescription(e.target.value)} />

                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

        <div className="rounded w-4/12 flex flex-col items-center justify-start p-3 gap-5 cursor-default">

          <div className="max-w-[315px] h-5 w-full flex justify-between items-center">

            <span className="text-base leading-5 font-semibold text-[#A0A0A0]">Vista Previa</span>

          </div>

          <div className="w-full col-span-1 border border-[#E5E7EB] max-w-[315px] h-auto rounded-md p-1 flex flex-col items-start justify-start gap-2">

            {currentFeatureImage ? (

              <picture>
                <img className="w-full rounded object-contain" alt="img" src={currentFeatureImage} />
              </picture>

            ) : (

              <div className="w-full h-[180px] bg-[#F4F4F5] rounded" />

            )}

            <div className="w-full h-auto flex flex-col items-start justify-between gap-2 pb-1 px-1 cursor-default">

              <div className="flex flex-col items-start justify-start w-full gap-1">

                <div className="w-full h-auto flex flex-row items-center justify-between">

                  <span className=" text-sm leading-[22px] text-black font-medium">{currentCity}</span>

                  <span className=" text-sm leading-[22px] text-black font-medium">{currentZone}</span>

                </div>

                <span className="text-base leading-5 font-bold text-black">${isNaN(currentPrice) ? 0 : currentPrice.toLocaleString('en-US')} {currentCurrency} </span>

              </div>

              <div className="w-full h-auto">

                <span className="text-sm leading-5 font-normal text-[#858585] overflow-hidden text-ellipsis line-clamp-3">
                  {currentDescription}
                </span>

              </div>

              <div className="flex flex-row items-center justify-start gap-4">

                {currentRooms > 0 &&

                  <div className="flex flex-row items-center justify-center gap-1">

                    <IconBedFilled size={20} color="#000000" />

                    <span className="font-medium text-sm leading-5 text-black w-[12px] text-center">{currentRooms}</span>

                  </div>

                }

                {currentBathrooms > 0 &&

                  <div className="flex flex-row items-center justify-center gap-1">

                    <IconBathFilled size={20} color="#000000" />

                    <span className="font-medium text-sm leading-5 text-black w-[12px] text-center">{currentBathrooms}</span>

                  </div>

                }

                {currentParkings > 0 &&

                  <div className="flex flex-row items-center justify-center gap-1">

                    <IconParking size={20} color="#000000" />

                    <span className="font-medium text-sm leading-5 text-black w-[12px] text-center">{currentParkings}</span>

                  </div>

                }

              </div>

              <Button className="w-full h-8 bg-[#F4F4F5] rounded border border-[#E5E7EB] text-[#A0A0A0] font-semibold text-sm leading hover:bg-black hover:text-white hover:border-transparent" disabled>
                Ver detalles
              </Button>

            </div>

          </div>

          <div className="w-full max-w-[315px] h-8 flex flex-row items-center justify-center gap-3">

            {currentStep >= 1 && (
              <Button className="bg-white rounded h-full w-full text-black font-medium border border-[#E5E7EB] cursor-pointer hover:bg-black hover:text-white" onClick={handlePreviousStep}>
                Anterior
              </Button>
            )}

            {currentStep >= 1 ? (
              <Button className="bg-black rounded h-full w-full text-white font-semibold" onClick={handleFinish}>
                Finalizar
              </Button>
            ) : (
              <Button className="bg-black rounded h-full w-full text-white font-semibold" onClick={handleNextStep}>
                Siguiente
              </Button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};