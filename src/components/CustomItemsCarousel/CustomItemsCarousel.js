import React, { useEffect } from 'react'
import './CustomItemsCarousel.scss'
import { cardBackgroundImageRenderer } from '../../common/styles'

const CustomItemsCarousel = ({
    isOpen = false,
    dataObject = {},
    screenWidth,
    selectedCategory = '',
    onCardClickHandler
}) => {
    const { isLive = false, places = [], comingSoonImage = '' } = dataObject

    useEffect(() => {
        window.scrollTo(0, document.querySelector('.header').clientHeight)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return (isOpen &&
        <div className="customItemsCarousel">
            <p className='mainHeadings'>{selectedCategory}</p>
            {
                isLive ?
                    <div className='itemList fadeInUp'>
                        {
                            places.map(place =>
                                <div className="card" style={!place['isLive'] ? { opacity: '0.5' } : {}} onClick={() => place['isLive'] && onCardClickHandler(place['placeName'])}>
                                    <div className="card__side card__side--front">
                                        <div className="card__picture " style={cardBackgroundImageRenderer(place.image, true)}>
                                            &nbsp;
                                        </div>
                                        <h4 className="card__heading">
                                            <span className="card__heading-span card__heading-span--1">{place['placeName']}</span>
                                        </h4>
                                        <div className="card__details">
                                            {place['isLive'] ? <p>{place['details']}</p> : <p>UNDER CONSTRUCTION</p>}
                                        </div>
                                    </div>
                                </div>)
                        }
                    </div>
                    :
                    <div className="image-wrapper fadeInUp"
                        style={cardBackgroundImageRenderer(comingSoonImage, true)}>
                        <h3 className='customText'>Coming Soon</h3>
                    </div>
            }
        </div>
    )
}

export default CustomItemsCarousel
