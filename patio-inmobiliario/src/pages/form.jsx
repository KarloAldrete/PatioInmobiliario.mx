import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../styles/form.css';


import left_carat from "../images/left-carat.svg";
import right_carat from "../images/right-carat.svg";
import sparkling from "../images/sparkling.svg";
import hearth from "../images/hearth.svg";
import cross from "../images/cross.svg"
import bed from "../images/bed.svg";
import bath from "../images/bathroom.svg";
import garage from "../images/garaje.svg";

import { toast } from 'react-toastify';

import Dropzone from "dropzone";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Buffer } from "buffer";

import upload from "../images/upload.png";

import citiesData from '../data/cities-data.json';

import io from "socket.io-client";



const StyledFormControl = styled(FormControl)`
label.Mui-focused,
label.Mui-selected {
    color: #FF2E63;
}

&:focus-within .MuiOutlinedInput-notchedOutline {
    border-color: #FF2E63;
}
`;

function Form() {
    const socket = io("http://localhost:4000/create");
    const [fileList, setFileList] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
    const [propCost, setPropCost] = useState('');
    const [propMConstruction, setPropMConstruction] = useState('');
    const [propTerrain, setPropTerrain] = useState('');
    const [propYear, setPropYear] = useState('');
    const [currency, setCurrency] = useState('');
    const [propBedrooms, setPropBedrooms] = useState(0);
    const [propBathrooms, setPropBathrooms] = useState(0);
    const [propParking, setPropParking] = useState(0);
    const [descriptionStyle, setDescriptionStyle] = useState('');
    const [descriptionLenght, setDescriptionLenght] = useState('');
    const [descriptionEmojis, setDescriptionEmojis] = useState('');
    const [description, setDescription] = useState('');
    const [propName, setPropName] = useState('');
    const [propEmail, setPropEmail] = useState('');
    const [propPhone, setPropPhone] = useState('');

    function handlePropCostChange(event) {
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

    function handlePropConstructionChange(event) {
        const value = event.target.value;
        setPropMConstruction(value);
    }

    function handleTerrainChange(event) {
        const value = event.target.value;
        setPropTerrain(value);
    }

    function handlePropNameChange(event) {
        const value = event.target.value;
        setPropName(value);
    }

    function handlePropEmailChange(event) {
        const value = event.target.value;
        setPropEmail(value);
    }

    function handlePropPhoneChange(event) {
        const value = event.target.value;
        const formattedValue = formatPhoneNumber(value);
        setPropPhone(formattedValue);
    }

    function formatPhoneNumber(phoneNumberString) {
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

    function handlePhoneInput(event) {
        let value = event.target.value;
        const formattedValue = formatPhoneNumber(value);
        if (formattedValue !== null) {
            setPropPhone(formattedValue);
        }
    }

    function handleChange(event) {
        setCurrency(event.target.value);
    }

    function handleDescription(event) {
        const value = event.target.value;
        setDescription(value);
    }

    const handleStyleChange = (event) => {
        setDescriptionStyle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescriptionLenght(event.target.value);
    };

    const handleEmojisChange = (event) => {
        setDescriptionEmojis(event.target.value);
    };

    const handleYearChange = (event) => {
        const value = event.target.value;
        setPropYear(value);
    }

    const handleCityChange = (event, newValue) => {
        setSelectedCity(newValue);
        if (newValue) {
            const selectedCityData = citiesData.cities.find(city => city.id === newValue.id);
            const neighborhoodsWithNames = selectedCityData.neighborhoods.map(neighborhood => {
                const neighborhoodName = neighborhood.split(',')[0];
                return {
                    id: neighborhood,
                    name: neighborhoodName,
                };
            });
            setNeighborhoods(neighborhoodsWithNames);
        } else {
            setNeighborhoods([]);
            console.log('No hay colonias');
        }
    };

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
        document.querySelector('.card_container').classList.toggle('inactive');
        toggleBodyScroll();
    };

    const toggleBodyScroll = () => {
        const body = document.querySelector('body');
        if (body.style.overflow === 'hidden') {
            body.style.overflow = 'auto';
        } else {
            body.style.overflow = 'hidden';
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

        myDropzone.on("addedfile", function (file) {
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
                <img src="${URL.createObjectURL(file)}">
                <span class="close-btn" data-dz-remove>×</span>
              `;
                if (isFirstImage) {
                    document.getElementById("card-image").style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
                    isFirstImage = false;
                }
            } else {
                imageWrapper.innerHTML = `
                <p>${file.name}</p>
                <span class="close-btn" data-dz-remove>×</span>
              `;
            }

            previewElement.appendChild(imageWrapper);

            document.querySelector(".photos_preview").appendChild(previewElement);

            imageWrapper.querySelector(".close-btn").addEventListener("click", () => {
                myDropzone.removeFile(file);
            });

            updateFileList("add", file);

            document.querySelector(".dz-preview").remove();
        });

        myDropzone.on("removedfile", function (file) {
            const fileId = file.fileId;
            const previewElement = document.querySelector(
                `.dz-preview[data-file-id="${fileId}"]`
            );

            if (previewElement) {
                previewElement.parentNode.removeChild(previewElement);
            }

            updateFileList(fileList.filter((f) => f !== file));
        });

        const appContainer = document.getElementById("appContainer");
        const formContainer = document.getElementById("formContainer");
        const cardPreview = document.getElementById("cardPreview");

        function moveCardPreviewToBottom() {
            cardPreview.classList.add("card_preview_animation");
            formContainer.appendChild(cardPreview);
            setTimeout(() => cardPreview.classList.remove("card_preview_animation"), 300);
        }

        function moveCardPreviewToTop() {
            cardPreview.classList.add("card_preview_animation");
            formContainer.prepend(cardPreview);
            setTimeout(() => cardPreview.classList.remove("card_preview_animation"), 300);
        }

        window.addEventListener("scroll", () => {
            const windowHeight = window.innerHeight;
            const appContainerHeight = appContainer.offsetHeight;

            // Verifica si el usuario ha llegado a la mitad del área de desplazamiento en el contenedor App
            if (window.scrollY + windowHeight / 2 >= appContainerHeight / 2) {
                moveCardPreviewToBottom();
            } else {
                moveCardPreviewToTop();
            }
        });

    }, []);

    const updateFileList = (action, file) => {
        let updatedFileList;
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

    async function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const uploadForm = async (e) => {
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
            selectedCity: selectedCity.name,
            selectedNeighborhood: selectedNeighborhood.name,
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

        socket.emit("createProperty", newProperty, (response) => {
            if (response.ok) {
                toast.success("Publicación creada exitosamente", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.error("Error al crear la publicación", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        });
    };

    return (

        <div className="App" id="appContainer">
            <Navbar />

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

                                <img src={upload} alt="upload" />

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
                            getOptionLabel={(option) => option.name || ""}
                            onChange={(event, newValue) => {
                                setSelectedNeighborhood(newValue);
                            }}
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
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                                    {option.name}
                                </Box>
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

                                <button className="minus" onClick={handleBedroomsMinus}><img src={left_carat} alt="left_carat" /></button>

                                <span>{propBedrooms}</span>

                                <button className="plus" onClick={handleBedroomsPlus}><img src={right_carat} alt="right_carat" /></button>

                            </div>

                        </div>

                        <div className="number-selector">

                            <span>Estacionamientos</span>

                            <div className="selector">

                                <button className="minus" onClick={handleParkingMinus}><img src={left_carat} alt="left_carat" /></button>

                                <span>{propParking}</span>

                                <button className="plus" onClick={handleParkingPlus}><img src={right_carat} alt="right_carat" /></button>

                            </div>

                        </div>

                        <div className="number-selector">

                            <span>Baños</span>

                            <div className="selector">

                                <button className="minus" onClick={handleBathroomsMinus}><img src={left_carat} alt="left_carat" /></button>

                                <span>{propBathrooms}</span>

                                <button className="plus" onClick={handleBathroomsPlus}><img src={right_carat} alt="right_carat" /></button>

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

                        <Box sx={{ minWidth: 238 }} className="box">
                            <StyledFormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" className={descriptionLenght ? 'Mui-selected' : ''}>Longitud</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Longitud"
                                    value={descriptionLenght}
                                    onChange={handleDescriptionChange}
                                >
                                    <MenuItem value={"Corta"}>Corta</MenuItem>
                                    <MenuItem value={"Moderada"}>Moderada</MenuItem>
                                    <MenuItem value={"Extensa"}>Extensa</MenuItem>
                                </Select>
                            </StyledFormControl>
                        </Box>

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

                        <button className="add-prompt"><img src={sparkling} alt="add" />Generar descripción</button>

                    </div>

                    <div className="input-group">
                        <textarea type="text" className="input" id="description" required value={description} onChange={handleDescription} />
                        <label className={description ? 'user-label active' : 'user-label'} htmlFor="propCost">Descripción:</label>
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

                    <img src={cross} alt="cross" className="cross" onClick={handleCardPreview} />

                    <div className="card">

                        <div className="card_image">

                            <img src={hearth} alt="hearth" />

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

                                        <img src={bed} alt="bed" />

                                        <span>0</span>

                                    </div>

                                    <div className="icon">

                                        <img src={bath} alt="bath" />

                                        <span>0</span>

                                    </div>

                                    <div className="icon">

                                        <img src={garage} alt="car" />

                                        <span>0</span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card_image" id="card-image">

                            <img src={hearth} alt="hearth" />

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

                                        <img src={bed} alt="bed" />

                                        <span>{propBedrooms ? propBedrooms : '0'}</span>

                                    </div>

                                    <div className="icon">

                                        <img src={bath} alt="bath" />

                                        <span>{propBathrooms ? propBathrooms : '0'}</span>

                                    </div>

                                    <div className="icon">

                                        <img src={garage} alt="car" />

                                        <span>{propParking ? propParking : '0'}</span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card">

                        <div className="card_image">

                            <img src={hearth} alt="hearth" />

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

                                        <img src={bed} alt="bed" />

                                        <span>0</span>

                                    </div>

                                    <div className="icon">

                                        <img src={bath} alt="bath" />

                                        <span>0</span>

                                    </div>

                                    <div className="icon">

                                        <img src={garage} alt="car" />

                                        <span>0</span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </div>

    );

}

export default Form;