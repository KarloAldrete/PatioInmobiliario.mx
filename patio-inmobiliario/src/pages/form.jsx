import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import '../styles/form.css';

import Dropzone from "dropzone";

import upload from "../images/upload.png";

function Form() {

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
        });

        myDropzone.on("addedfile", function (file) {
            const fileId = Date.now();
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
        });

    }, []);

    return (

        <div className="App">
            <Navbar />

            <div className="form_container">

                <div className="card_preview">

                    <div className="title">

                        <h1>Crear publicacion</h1>

                    </div>

                    <div className="buttons">

                        <button>Previsualizar</button>

                        <button>Publicar</button>

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

                                    <h3>Arrastra y suelta los archivos aquí para cargarlos</h3>

                                    <span>JPG, PNG, o GIF (Max 5MB)</span>

                                </div>

                            </div>

                        </form>

                    </div>

                    <div className="photos_preview">
                    </div>

                </div>

                <div className="card_basic_info">

                    <div className="title">

                        <h1>Informacion basica</h1>

                    </div>

                    <div className="first-row">

                        <div className="input">

                            

                        </div>

                    </div>

                    <div className="second-row">
                    </div>

                    <div className="third-row">
                    </div>

                </div>

                <div className="card_complementary_info">
                </div>

                <div className="card_description">
                </div>

                <div className="card_contact">
                </div>

            </div>

        </div>

    );

}

export default Form;