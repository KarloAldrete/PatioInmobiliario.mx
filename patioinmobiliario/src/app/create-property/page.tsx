'use client';
import React, { useState } from "react";
import '../../styles/propertyForm.css'
import { ConfigProvider } from 'antd';

import Uploader from "@/components/create-property-components/uploadInput";
import Basics from "@/components/create-property-components/basics";
import Complementary from "@/components/create-property-components/complementary";
import Contact from "@/components/create-property-components/contact";
import Upload from "@/components/create-property-components/upload";



interface FormState {
    uploaderData: any[];
    basicsData: any[];
    complementaryData: any[];
    contactData: any[];
}



const PublicationForm = () => {
    const [formState, setFormState] = useState<FormState>({
        uploaderData: [],
        basicsData: [],
        complementaryData: [],
        contactData: []
    });

    const handleUploaderDataChange = (data) => {
        setFormState({ ...formState, uploaderData: data });
    };

    const handleBasicsDataChange = (data) => {
        setFormState((prevState) => ({
            ...prevState,
            basicsData: [...prevState.basicsData, data]
        }));
    };

    const handleComplementaryDataChange = (data) => {
        setFormState((prevState) => ({
            ...prevState,
            complementaryData: [...prevState.complementaryData, data]
        }));
    };

    const handleContactDataChange = (data) => {
        setFormState((prevState) => ({
            ...prevState,
            contactData: [...prevState.contactData, data]
        }));
    };

    const handleUpload = () => {
        console.log(formState);
    };


    return (
        <div className="page-container">
            <title>Patio Inm... | Crear anuncio</title>

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#FF2E63',
                    }
                }}
            >

                <Uploader onChange={handleUploaderDataChange} />

                <Basics onChange={handleBasicsDataChange} />

                <Complementary onChange={handleComplementaryDataChange} />

                <Contact onChange={handleContactDataChange} />

                <Upload onSubmit={handleUpload} onChange={handleUploaderDataChange} />

            </ConfigProvider>

        </div>
    )
}

export default PublicationForm;