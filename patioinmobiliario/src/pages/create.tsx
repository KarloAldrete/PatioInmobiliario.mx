import React, { useEffect, useState, ReactNode } from "react";
import Image from "next/image";
import Layout from '../components/Layout';
import '../styles/form.css';


import left_carat from "../assets/icons/left-carat.svg";
import right_carat from "../assets/icons/right-carat.svg";
import sparkling from "../assets/icons/sparkling.svg";
import hearth from "../assets/icons/hearth.svg";
import cross from "../assets/icons/cross.svg";
import bed from "../assets/icons/bed.svg";
import bath from "../assets/icons/bathroom.svg";
import garage from "../assets/icons/garaje.svg";

import { toast } from 'react-toastify';

import Dropzone from 'dropzone';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { SelectChangeEvent } from '@mui/material';
import { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Buffer } from "buffer";

import upload from "../assets/images/upload.svg";

import citiesData from '../data/cities-data.json';



const StyledFormControl = styled(FormControl)`
label.Mui-focused,
label.Mui-selected {
    color: #FF2E63;
}

&:focus-within .MuiOutlinedInput-notchedOutline {
    border-color: #FF2E63;
}
`;

type City = {
    id: string;
    name: string;
    neighborhoods: string[];
};

interface Neighborhood {
    name: string;
}

interface DropzoneFile extends File {
    previewElement?: HTMLElement;
    previewTemplate?: HTMLElement;
    upload?: XMLHttpRequest;
    status?: string;
    accepted?: boolean;
    rejected?: boolean;
    processing?: boolean;
    file_id?: string; // Add the fileId property here
}

function Create() {

    const [fileList, setFileList] = useState<any[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [selectedNeighborhood, setSelectedNeighborhood] = React.useState<string | null>(null);
    const [propCost, setPropCost] = useState<string>('');
    const [propMConstruction, setPropMConstruction] = useState<string>('');
    const [propTerrain, setPropTerrain] = useState<string>('');
    const [propYear, setPropYear] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');
    const [propBedrooms, setPropBedrooms] = useState<number>(0);
    const [propBathrooms, setPropBathrooms] = useState<number>(0);
    const [propParking, setPropParking] = useState<number>(0);
    const [descriptionStyle, setDescriptionStyle] = useState<string>('');
    const [descriptionLength, setDescriptionLength] = useState<string>('');
    const [descriptionEmojis, setDescriptionEmojis] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [propName, setPropName] = useState<string>('');
    const [propEmail, setPropEmail] = useState<string>('');
    const [propPhone, setPropPhone] = useState<string>('');

    const handlePropCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^\d.-]/g, "");

        const parts = value.split(".");

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        if (parts.length > 1) {
            parts[1] = parts[1].replace(/,/g, '');
        }

        const valueFormatted = parts.join(".");

        if (!isNaN(Number(valueFormatted.replace(/,/g, '')))) {
            event.target.value = valueFormatted;
            setPropCost(valueFormatted);
        }
    }

    const handlePropConstructionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPropMConstruction(value);
    }

    const handleTerrainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPropTerrain(value);
    }

    const handlePropNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPropName(value);
    }

    const handlePropEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPropEmail(value);
    }

    const handlePropPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const formattedValue = formatPhoneNumber(value);
        setPropPhone(formattedValue ?? '');
    }

    const formatPhoneNumber = (phoneNumberString: string) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
        if (match) {
            let formattedNumber = '(' + match[1] + ') ';
            if (match[2]) {
                formattedNumber += match[2] + '-';
            }
            formattedNumber += match[3];
            return formattedNumber;
        }
        return null;
    }

    const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        const formattedValue = formatPhoneNumber(value);
        if (formattedValue !== null) {
            setPropPhone(formattedValue);
        }
    }

    const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
        setCurrency(event.target.value);
    };

    const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleStyleChange = (event: SelectChangeEvent<string>) => {
        setDescriptionStyle(event.target?.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionLength(event.target.value);
    };

    const handleEmojisChange = (event: SelectChangeEvent<string>) => {
        setDescriptionEmojis(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPropYear(value);
    };

    const handleCityChange = (event: React.SyntheticEvent, value: City | null, reason: AutocompleteChangeReason) => {
        if (reason === "selectOption") {
          setSelectedCity(value);
          console.log(value);
          setSelectedNeighborhood(null);
        } else if (reason === "clear") {
          setSelectedCity(null);
          setSelectedNeighborhood(null);
        }
      };

      const handleNeighborhoodChange = (
        event: React.SyntheticEvent,
        value: string | null,
        reason: AutocompleteChangeReason
      ) => {
        if (reason === "selectOption") {
          setSelectedNeighborhood(value);
        } else if (reason === "clear") {
          setSelectedNeighborhood(null);
        }
      };

    const neighborhoods = selectedCity?.neighborhoods ?? [];

    const handleBedroomsMinus = () => {
        if (propBedrooms > 0) {
            setPropBedrooms(propBedrooms - 1);
        }
    };

    const handleBedroomsPlus = () => {
        setPropBedrooms(propBedrooms + 1);
    };

    const handleBathroomsMinus = () => {
        if (propBathrooms > 0) {
            setPropBathrooms(propBathrooms - 1);
        }
    };

    const handleBathroomsPlus = () => {
        setPropBathrooms(propBathrooms + 1);
    };

    const handleParkingMinus = () => {
        if (propParking > 0) {
            setPropParking(propParking - 1);
        }
    };

    const handleParkingPlus = () => {
        setPropParking(propParking + 1);
    };

    const handleCardPreview = () => {
        const cardContainer = document.querySelector('.card_container');
        if (cardContainer) {
            cardContainer.classList.toggle('inactive');
            toggleBodyScroll();
        }
    };

    const toggleBodyScroll = () => {
        const body = document.querySelector('body');
        if (body) {
            if (body.style.overflow === 'hidden') {
                body.style.overflow = 'auto';
            } else {
                body.style.overflow = 'hidden';
            }
        }
    };

    useEffect(() => {

        const myDropzone = new Dropzone("#my-awesome-dropzone", {
            autoProcessQueue: false,
            dictDefaultMessage:
                "Arrastra y suelta los archivos aquí para cargarlos",
            dictFallbackMessage:
                "Tu navegador no admite la carga de archivos por arrastrar y soltar.",
            dictInvalidFileType: "No puedes subir archivos de este tipo.",
            dictFileTooBig:
                "El archivo es demasiado grande ({{filesize}}MiB). Tamaño máximo de archivo: {{maxFilesize}}MiB.",
            dictResponseError: "Servidor {{statusCode}} code.",
            dictCancelUpload: "Cancelar carga",
            dictCancelUploadConfirmation:
                "¿Estás seguro de que quieres cancelar esta carga?",
            dictRemoveFile: "Eliminar archivo",
            dictMaxFilesExceeded: "No puedes subir más archivos.",
            maxFiles: 50,
        });

        let isFirstImage = true;

        myDropzone.on("addedfile", function (file: DropzoneFile) {
            const fileId = Math.random().toString(36).substr(2, 9);
            file.fileId = fileId;

            var previewElement = document.createElement("div");
            previewElement.classList.add("dz-preview");
            previewElement.dataset.fileId = fileId;

            var imageWrapper = document.createElement("div");
            imageWrapper.classList.add("image-wrapper");

            if (
                file.type.startsWith("image/") &&
                URL.createObjectURL &&
                typeof file.slice === "function"
            ) {
                imageWrapper.innerHTML = `
                <Image src="${URL.createObjectURL(file)}">
                <span class="close-btn" data-dz-remove>×</span>
              `;

                if (isFirstImage) {
                    const cardImageElement = document.getElementById("card-image");
                    if (cardImageElement) {
                        cardImageElement.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
                    }
                    isFirstImage = false;
                }
            } else {
                imageWrapper.innerHTML = `
                <p>${file.name}</p>
                <span class="close-btn" data-dz-remove>×</span>
              `;
            }

            previewElement.appendChild(imageWrapper);

            const previewContainer = document.querySelector(".photos_preview");
            if (previewContainer) {
                previewContainer.appendChild(previewElement);
            }

            const closeBtn = imageWrapper.querySelector(".close-btn");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    myDropzone.removeFile(file);
                });
            }

            updateFileList("add", file);

            const firstPreview = document.querySelector(".dz-preview");
            if (firstPreview) {
                firstPreview.remove();
            }
        });


        myDropzone.on("removedfile", function (file: DropzoneFile) {
            const fileId = file.file_id;
            const previewElement = document.querySelector(`.dz-preview[data-file-id="${fileId}"]`);
            if (previewElement && previewElement.parentNode) {
                previewElement.parentNode.removeChild(previewElement);
            }
            updateFileList("remove", file);
        });


    });

    const updateFileList = (action: string, file: any) => {
        let updatedFileList = [...fileList]; // Inicializamos la variable con un valor predeterminado

        if (action === "add") {
            const customName = `${fileList.length}.jpg`;
            const newFile = {
                _file: file,
                fileId: file.fileId,
                customName: customName,
                type: file.type,
                size: file.size,
            };
            updatedFileList = [...fileList, newFile];
        } else if (action === "remove") {
            updatedFileList = fileList.filter((f) => f.fileId !== file.fileId);
        }

        const sortedFileList = updatedFileList
            .slice()
            .sort((a, b) => a.fileId.localeCompare(b.fileId));
        sortedFileList.forEach((f, index) => {
            f.customName = `${index}.jpg`;
        });

        setFileList(sortedFileList);
    };


    async function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    resolve(event.target.result as string);
                } else {
                    reject(new Error('No se pudo leer el archivo'));
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }



    const uploadForm = async (e: any) => {
        e.preventDefault();

        toast.info("Publicando...", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        const imageList = await Promise.all(
            fileList.map(async (f) => {
                const base64Image = await fileToBase64(f._file);
                return {
                    name: f.customName,
                    type: f.type,
                    size: f.size,
                    data: base64Image,
                };
            })
        );

        console.log(imageList);

        const newProperty = {
            propCost,
            description,
            selectedCity: selectedCity ? selectedCity.name : '',
            selectedNeighborhood: selectedNeighborhood ? selectedNeighborhood.name : '',
            propBedrooms,
            propBathrooms,
            propParking,
            propMConstruction,
            currency,
            propTerrain,
            propYear,
            propName,
            propEmail,
            propPhone,
            imageList,
        };

    };

    return (

        <Layout>

            <div className="App" id="appContainer">

                <div className="form_container" id="formContainer">

                    <div className="card_preview" id="cardPreview">

                        <div className="title">

                            <h1>Crear publicacion</h1>

                        </div>

                        <div className="buttons">

                            <button onClick={handleCardPreview}>Previsualizar</button>

                            <button onClick={uploadForm}>Publicar</button>

                        </div>

                    </div>

                    <div className="card_photos">

                        <div className="title">

                            <h1>Fotografías</h1>

                        </div>

                        <div className="photos_input">

                            <form action="/file-upload" className="dropzone" id="my-awesome-dropzone">

                                <div className="dz-message">

                                    <Image src={upload} alt="upload" />

                                    <div className="text">

                                        <span>JPG, PNG o GIF (Max 5MB)</span>

                                    </div>

                                </div>

                            </form>

                        </div>

                        <div className="photos_preview">
                        </div>

                    </div>

                    <div className="card_basic_info">

                        <div className="title">

                            <h1>Información basica</h1>

                        </div>

                        <div className="first-row">

                            <div className="input-group">
                                <input type="text" pattern="\d{1,3}(,\d{3})*(\.\d+)?" className="input" id="propCost" value={propCost} onChange={handlePropCostChange} required />
                                <label className={propCost ? 'user-label active' : 'user-label'} htmlFor="propCost">Costo de propiedad:</label>
                            </div>

                            <div className="semi-group">

                                <Box sx={{ minWidth: 148 }}>
                                    <StyledFormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" className={currency ? 'Mui-selected' : ''}>Moneda</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Moneda"
                                            value={currency}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"MXN"}>Pesos</MenuItem>
                                            <MenuItem value={"USD"}>Dólares</MenuItem>
                                        </Select>
                                    </StyledFormControl>
                                </Box>

                                <div className="semi-input-group">

                                    <input type="number" className="semi-input" id="propMConstruction" value={propMConstruction} onChange={handlePropConstructionChange} required />

                                    <label className={propMConstruction ? 'user-label active' : 'user-label'} htmlFor="propMConstruction">Mts² de constr:</label>

                                </div>

                            </div>

                            <div className="input-group">

                                <input type="number" className="input" id="propTerrain" value={propTerrain} onChange={handleTerrainChange} required />

                                <label className={propTerrain ? 'user-label active' : 'user-label'} htmlFor="propTerrain">Mts² de terreno:</label>

                            </div>

                        </div>

                        <div className="second-row">

                            <Autocomplete
                                sx={{ width: 314 }}
                                id="city-selector"
                                options={citiesData.cities}
                                getOptionLabel={(option) => option.name}
                                onChange={handleCityChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Ciudad"
                                        InputLabelProps={{
                                            style: {
                                                color: selectedCity ? "#FF2E63" : "#9e9e9e"
                                            }
                                        }}
                                    />
                                )}
                            />

<Autocomplete
  sx={{ width: 314 }}
  id="neighborhood-selector"
  options={neighborhoods}
    getOptionLabel={(option : any) => option.name}
    onChange={handleNeighborhoodChange}
    renderInput={(params) => (
        <TextField
            {...params}
            label="Colonia"
            InputLabelProps={{
                style: {
                    color: selectedNeighborhood ? "#FF2E63" : "#9e9e9e"
                }
            }}
        />
    )}
/>


                            <div className="input-group">

                                <input type="number" className="input" id="propYear" value={propYear} onChange={handleYearChange} required />

                                <label className={propYear ? 'user-label active' : 'user-label'} htmlFor="propYear">Año de construcción:</label>

                            </div>

                        </div>

                        <div className="third-row">

                            <div className="number-selector">

                                <span>Recamaras</span>

                                <div className="selector">

                                    <button className="minus" onClick={handleBedroomsMinus}><Image src={left_carat} alt="left_carat" /></button>

                                    <span>{propBedrooms}</span>

                                    <button className="plus" onClick={handleBedroomsPlus}><Image src={right_carat} alt="right_carat" /></button>

                                </div>

                            </div>

                            <div className="number-selector">

                                <span>Estacionamientos</span>

                                <div className="selector">

                                    <button className="minus" onClick={handleParkingMinus}><Image src={left_carat} alt="left_carat" /></button>

                                    <span>{propParking}</span>

                                    <button className="plus" onClick={handleParkingPlus}><Image src={right_carat} alt="right_carat" /></button>

                                </div>

                            </div>

                            <div className="number-selector">

                                <span>Baños</span>

                                <div className="selector">

                                    <button className="minus" onClick={handleBathroomsMinus}><Image src={left_carat} alt="left_carat" /></button>

                                    <span>{propBathrooms}</span>

                                    <button className="plus" onClick={handleBathroomsPlus}><Image src={right_carat} alt="right_carat" /></button>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card_complementary_info">

                        <div className="title">

                            <h1>Información complementaria</h1>

                        </div>

                        <div className="inputs-container">

                            <div className="container">

                                <div className="item">

                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>

                                    <span>Cocina</span>

                                </div>

                                <div className="item">

                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>

                                    <span>Cuarto de lavado</span>

                                </div>

                            </div>

                            <div className="container">

                                <div className="item">

                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>

                                    <span>Gas</span>

                                </div>

                                <div className="item">

                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>

                                    <span>Jardin</span>

                                </div>

                            </div>

                            <div className="container">

                                <div className="item">

                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>

                                    <span>Jacuzzi</span>

                                </div>

                                <div className="item">

                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>

                                    <span>Piscina</span>

                                </div>

                            </div>

                            <div className="container">

                                <div className="item">

                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>

                                    <span>A/C</span>

                                </div>

                                <div className="item">

                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>

                                    <span>Gym</span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card_description">

                        <div className="title">

                            <h1>Descripción de la propiedad</h1>

                        </div>

                        <div className="prompts-group">

                            <Box sx={{ minWidth: 238 }} className="box">
                                <StyledFormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" className={descriptionStyle ? 'Mui-selected' : ''}>Estilo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Estilo"
                                        value={descriptionStyle}
                                        onChange={handleStyleChange}
                                    >
                                        <MenuItem value={"Corporativo"}>Corporativo</MenuItem>
                                        <MenuItem value={"Casual"}>Casual</MenuItem>
                                        <MenuItem value={"Creativo"}>Creativo</MenuItem>
                                    </Select>
                                </StyledFormControl>
                            </Box>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Longitud"
                                value={descriptionLength}
                                onChange={(event: SelectChangeEvent<string>, child: ReactNode) => {
                                    setDescriptionLength(event.target.value);
                                }}
                            >
                                <MenuItem value={"Corta"}>Corta</MenuItem>
                                <MenuItem value={"Moderada"}>Moderada</MenuItem>
                                <MenuItem value={"Extensa"}>Extensa</MenuItem>
                            </Select>


                            <Box sx={{ minWidth: 238 }} className="box">
                                <StyledFormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" className={descriptionEmojis ? 'Mui-selected' : ''}>Uso de emoticonos</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Uso de emoticonos"
                                        value={descriptionEmojis}
                                        onChange={handleEmojisChange}
                                    >
                                        <MenuItem value={"Ninguno"}>Ninguno</MenuItem>
                                        <MenuItem value={"Reducido"}>Reducido</MenuItem>
                                        <MenuItem value={"Moderado"}>Moderado</MenuItem>
                                        <MenuItem value={"Alto"}>Alto</MenuItem>
                                    </Select>
                                </StyledFormControl>
                            </Box>

                            <button className="add-prompt"><Image src={sparkling} alt="add" />Generar descripción</button>

                        </div>

                        <div className="input-group">
                            <textarea className="input" id="description" required value={description} onChange={handleDescription} />
                            <label className={description ? 'user-label active' : 'user-label'} htmlFor="description">Descripción:</label>
                        </div>


                    </div>

                    <div className="card_contact">

                        <div className="title">

                            <h1>Información de contacto</h1>

                        </div>

                        <div className="inputs-container">

                            <div className="input-group">
                                <input type="text" pattern="\d{1,3}(,\d{3})*(\.\d+)?" className="input" id="propName" value={propName} onChange={handlePropNameChange} required />
                                <label className={propName ? 'user-label active' : 'user-label'} htmlFor="propName">Nombre:</label>
                            </div>

                            <div className="input-group">
                                <input type="text" pattern="\d{1,3}(,\d{3})*(\.\d+)?" className="input" id="propEmail" value={propEmail} onChange={handlePropEmailChange} required />
                                <label className={propEmail ? 'user-label active' : 'user-label'} htmlFor="propEmail">Correo electrónico:</label>
                            </div>

                            <div className="input-group">
                                <input type="text" className="input" id="propPhone" value={propPhone} onChange={handlePropPhoneChange} onInput={handlePhoneInput} required />

                                <label className={propPhone ? 'user-label active' : 'user-label'} htmlFor="propPhone">Telefono:</label>
                            </div>

                            <div className="checkbox-container">

                                <input type="checkbox" id="terms" name="terms" value="terms" required />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card_container inactive">

                    <div className="showcase">

                        <Image src={cross} alt="cross" className="cross" onClick={handleCardPreview} />

                        <div className="card">

                            <div className="card_image">

                                <Image src={hearth} alt="hearth" />

                            </div>

                            <div className="card_info">

                                <div className="price">

                                    <h1>$0</h1>

                                </div>

                                <div className="location">

                                    <h1>Colonia</h1>

                                    <h1>Ciudad</h1>

                                </div>

                                <div className="description">

                                    <div className="status">

                                        <h1>Venta</h1>

                                    </div>

                                    <div className="icons">

                                        <div className="icon">

                                            <Image src={bed} alt="bed" />

                                            <span>0</span>

                                        </div>

                                        <div className="icon">

                                            <Image src={bath} alt="bath" />

                                            <span>0</span>

                                        </div>

                                        <div className="icon">

                                            <Image src={garage} alt="car" />

                                            <span>0</span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="card">

                            <div className="card_image" id="card-image">

                                <Image src={hearth} alt="hearth" />

                            </div>

                            <div className="card_info">

                                <div className="price">

                                    <h1>{(propCost ? '$' + propCost : '$0') + (currency ? ' ' + currency : '')}</h1>

                                </div>

                                <div className="location">

                                    <h1>{selectedNeighborhood ? selectedNeighborhood.name : ''}</h1>

                                    <h1>{selectedCity ? selectedCity.name : ''}</h1>

                                </div>

                                <div className="description">

                                    <div className="status">

                                        <h1>Venta</h1>

                                    </div>

                                    <div className="icons">

                                        <div className="icon">

                                            <Image src={bed} alt="bed" />

                                            <span>{propBedrooms ? propBedrooms : '0'}</span>

                                        </div>

                                        <div className="icon">

                                            <Image src={bath} alt="bath" />

                                            <span>{propBathrooms ? propBathrooms : '0'}</span>

                                        </div>

                                        <div className="icon">

                                            <Image src={garage} alt="car" />

                                            <span>{propParking ? propParking : '0'}</span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="card">

                            <div className="card_image">

                                <Image src={hearth} alt="hearth" />

                            </div>

                            <div className="card_info">

                                <div className="price">

                                    <h1>$0</h1>

                                </div>

                                <div className="location">

                                    <h1>Colonia</h1>

                                    <h1>Ciudad</h1>

                                </div>

                                <div className="description">

                                    <div className="status">

                                        <h1>Venta</h1>

                                    </div>

                                    <div className="icons">

                                        <div className="icon">

                                            <Image src={bed} alt="bed" />

                                            <span>0</span>

                                        </div>

                                        <div className="icon">

                                            <Image src={bath} alt="bath" />

                                            <span>0</span>

                                        </div>

                                        <div className="icon">

                                            <Image src={garage} alt="car" />

                                            <span>0</span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


            </div>

        </Layout>

    );

}

export default Create;