import React, { useEffect, useState } from 'react'
import './Body1.scss'
import Button from './../UI/Button/Button'

const Body1 = ({
    config,
    history,
    search = ''
}) => {
    const { background, images, text } = config
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const noOfItems = 7
    const noOfCards = 1
    useEffect(() => {
        const tick = () => setActiveItemIndex((activeItemIndex + 1) % (noOfItems - noOfCards + 1))
        const interval = setInterval(() => tick(), 2000)
        return () => clearInterval(interval)
    }, [activeItemIndex])

    const onButtonClick = () => {
        history.push('/gallery' + search)
    }

    const getImages = (images) => {
        const imgArray = []
        const firstSevenImages = Object.keys(images)
        for (let i = 0; i < 7; i++) {
            imgArray.push(<img key={`view${i + 1}`}
                loading="lazy"
                src={images[firstSevenImages[i]].src}
                alt={images[firstSevenImages[i]].caption}
                className={`composition__photo composition__photo--p${i + 1}`} />)

        }
        return imgArray
    }

    return (
        <div className="body1">
            <div className="image-wrapper"
                style={{ backgroundImage: `url(${background})` }}>
                <h3 className='customText'>RELAX. TAKE IN THE VIEW.</h3>
            </div>
            <div className='details'>
                <div className="left leftSide">
                    <span className='leftContainer'>
                        {text}
                        <Button onClickEvent={onButtonClick}>
                            View Gallery
                        </Button>
                    </span>
                </div>
                <div className="right composition">
                    {
                        getImages(images)
                    }
                </div>
            </div>
        </div>
    )
}

export default Body1
