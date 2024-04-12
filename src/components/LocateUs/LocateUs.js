import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { ReactPhotoCollage } from 'react-photo-collage'
import DialogComp from '../DialogComp/DialogComp'
import './LocateUs.scss'

const LocateUs = ({
    config,
    screenWidth }) => {
    const { center, images, zoom, url, landmarkText = '', pickUpFacilityText = '', pickUpDropPrices = null } = config
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imageObject, setImageObject] = useState({
        width: '48vw',
        height: ['25vh', '25vh'],
        layout: [2, 3],
        photos: Object.keys(images).map(image => {
            return { source: images[image] }
        }),
        showNumOfRemainingPhotos: true
    })

    useEffect(() => {
        if (screenWidth < 650) {
            const mapDivSize = document.querySelector('.map').offsetWidth
            setImageObject({ ...imageObject, width: `${mapDivSize}px`, height: ['20vh', '20vh'] })
        } else if (screenWidth < 1300) {
            const mapDivSize = document.querySelector('.map').offsetWidth
            setImageObject({ ...imageObject, width: `${mapDivSize}px` })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth])

    const getPricesTable = (pickUpDropPrices) => {
        return pickUpDropPrices && <div className="formTableDescription">
            <table >
                <tbody>
                    <tr>
                        <th>From</th>
                        <th>Price</th>
                    </tr>
                    {
                        Object.keys(pickUpDropPrices).map(priceItem =>
                            <tr>
                                <td>{priceItem}</td>
                                <td> {pickUpDropPrices[priceItem]}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    }


    const onMarkerClick = () => {
        window.open(url)
    }
    return (
        <div className='locateUs sectionPadding'>
            <div className="upper">
                <h1 className='mainHeadings'>Locate Us</h1>
                <div className='upperBody'>
                    <p> Just click on the marker to get the exact location of The Village Lodge. Please ensure to have a look on the
                        images to get more details about your journey to village lodge.</p>
                    <p>{landmarkText} </p>
                    {
                        pickUpDropPrices && <p> {pickUpFacilityText} Please click&nbsp;
                            <span className='clickHereText' onClick={() => setIsDialogOpen(true)}>
                                here
                            </span>
                            &nbsp;to check the prices.</p>
                    }
                    <p> Feel free to contact us for any inquiry.</p>
                </div>
            </div>
            <div className='locateUsBody'>
                <div className='map'>
                    <MapContainer center={center} zoom={zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={center}
                            eventHandlers={{
                                click: (e) => {
                                    onMarkerClick()
                                }
                            }}
                            onMouseOver={(e) => {
                                e.target.openPopup();
                            }}
                            onMouseOut={(e) => {
                                e.target.closePopup();
                            }}>
                            <Popup>
                                The village lodge
                            </Popup>
                        </Marker>
                    </MapContainer >
                </div>
                <div className="photoGalleryHome ">
                    <ReactPhotoCollage {...imageObject} />
                </div>
                <DialogComp
                    isOpen={isDialogOpen}
                    handleClose={() => setIsDialogOpen(false)}
                    heading='Pickup/Drop prices'
                    body={pickUpDropPrices && getPricesTable(pickUpDropPrices)}
                    buttonName={"OK"}
                />
            </div>
        </div>
    )
}

export default LocateUs