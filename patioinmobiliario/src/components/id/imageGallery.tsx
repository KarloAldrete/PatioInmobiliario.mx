import { IconArrowBigLeftFilled, IconArrowBigRightFilled } from '@tabler/icons-react';
import { useState } from 'react';

type ImageGalleryProps = {
    images: { url: string }[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (imageIndex: number) => {
        setSelectedImage(imageIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const selectImage = (index: number) => {
        setSelectedImage(index);
    };

    const showPrevImage = () => {
        setSelectedImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const showNextImage = () => {
        setSelectedImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    const filteredImages = images.slice(0, 5);

    return (
        <div>

            <div className="flex gap-2 gallery">

                <div className='w-1/2 flex main-image-container'>
                    <picture className="flex-grow">
                        <img
                            src={filteredImages[0].url}
                            alt={''}
                            className="h-full w-full object-cover cursor-pointer rounded-l-md main-image"
                            onClick={() => openModal(0)}
                        />
                    </picture>
                </div>

                <div className="grid grid-cols-2 gap-2 w-1/2 secondary-images-container">
                    {filteredImages.slice(1, 5).map((image, index) => {
                        let borderRadiusClass = '';
                        switch (index) {
                            case 0:
                                borderRadiusClass = '';
                                break;
                            case 1:
                                borderRadiusClass = 'rounded-tr-md';
                                break;
                            case 2:
                                borderRadiusClass = '';
                                break;
                            case 3:
                                borderRadiusClass = 'rounded-br-md';
                                break;
                            default:
                                borderRadiusClass = '';
                        }
                        return (
                            <div key={index} className="w-full">
                                <picture className="h-full">
                                    <img
                                        src={image.url}
                                        alt={''}
                                        className={`w-full h-full object-cover cursor-pointer ${borderRadiusClass} secondary-image`}
                                        onClick={() => openModal(index + 1)}
                                    />
                                </picture>
                            </div>
                        );
                    })}
                </div>

            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-4 rounded-lg relative"
                        onClick={handleModalClick}
                    >
                        <div className="relative group">
                            <button
                                onClick={showPrevImage}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            ><IconArrowBigLeftFilled /></button>
                            <picture>
                                <img src={images[selectedImage].url} alt='' className="w-full h-auto rounded max-w-[1100px] max-h-[800px]" />
                            </picture>
                            <button
                                onClick={showNextImage}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            ><IconArrowBigRightFilled /></button>
                        </div>
                        <div className="flex justify-center gap-2 mt-2">
                            {images.map((image, index) => (
                                <picture key={index}>
                                    <img
                                        src={image.url}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-10 h-10 object-cover cursor-pointer ${index === selectedImage ? 'ring-2 ring-black rounded-sm' : ''}`}
                                        onClick={() => selectImage(index)}
                                    />
                                </picture>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ImageGallery;