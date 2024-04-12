import React, { useState } from 'react'
import './ImageGallery.scss'
import Carousel, { Modal, ModalGateway } from "react-images"

const ImageGallery = ({ imageObject }) => {
    const imageArray = Object.keys(imageObject).map(image => imageObject[image])
    const [currentImage, setCurrentImage] = useState(0)
    const [viewerIsOpen, setViewerIsOpen] = useState(false)

    const openLightbox = (index) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    };

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };
    return <div className='imageGallery'>
        <div className='imageContainer'>
            {
                imageArray.map((image, index) =>
                    <span>
                        <img
                            loading="lazy"
                            src={image.src}
                            alt={image.caption}
                            className='imageDisplay'
                            onClick={() => openLightbox(index)}
                        ></img>
                    </span>
                )
            }
        </div>

        <ModalGateway>
            {viewerIsOpen && <Modal onClose={closeLightbox}>
                <Carousel
                    currentIndex={currentImage}
                    views={imageArray}
                />
            </Modal>
            }
        </ModalGateway>
    </div>
}

export default ImageGallery