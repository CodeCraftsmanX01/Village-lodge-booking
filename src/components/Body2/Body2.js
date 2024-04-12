import React, { useEffect, useState } from 'react'
import ItemsCarousel from 'react-items-carousel'
import './Body2.scss'

const Body2 = ({
    config = {},
    screenWidth
}) => {
    const { images, text } = config
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const noOfItems = 7
    const noOfCardsCheck = () => {
        if (screenWidth < 499) {
            return 1
        }
        if (screenWidth >= 500 && screenWidth <= 850)
            return 2
        else
            return 3
    }
    const noOfCards = noOfCardsCheck()

    useEffect(() => {
        const tick = () => setActiveItemIndex((activeItemIndex + 1) % (noOfItems - noOfCards + 1))
        const interval = setInterval(() => tick(), 3000)
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeItemIndex])

    return (
        <div className="body2 sectionPadding">
            <div className="upper middle">
                {text}
            </div>
            <div className="lower">
                <div className="imageSlideshow">
                    <ItemsCarousel
                        infiniteLoop
                        gutter={12}
                        numberOfCards={noOfCards}
                        activeItemIndex={activeItemIndex}
                        requestToChangeActive={setActiveItemIndex}
                        chevronWidth={60}
                    >
                        {
                            Object.keys(images).map((image, index) =>
                                <img key={`view${index + 1}`}
                                    loading="lazy"
                                    src={images[image]}
                                    alt={`room${index + 1}`}
                                    className='images' />)
                        }
                    </ItemsCarousel>
                </div>
            </div>
        </div>
    )
}


export default Body2