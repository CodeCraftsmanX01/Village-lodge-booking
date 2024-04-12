import React, { useState } from 'react'
import Header from './../../components/Header/Header'
import './Brahmakamal.scss'
import container from './../../common/utils/container'
import CustomItemsCarousel from '../../components/CustomItemsCarousel/CustomItemsCarousel'
import { setFullScreenLoader } from '../../common/actions/actions'

const Brahmakamal = ({
    appConfig = {},
    screenWidth,
    history,
    imageUrls,
    setFullScreenLoader
}) => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const homeConfig = appConfig['brahmakamal']
    const { header, navigationItems } = homeConfig
    const { backgroundImage } = imageUrls?.['data']
    const onButtonClick = (buttonType) => {
        setSelectedCategory(buttonType)
    }

    const onCardClickHandler = (selectedCard) => {
        history.push(`/home?viewLocation=${selectedCard}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const isItemCarouselOpen = selectedCategory !== ''

    const imageLoaded = () => {
        setFullScreenLoader(false)
    }

    return (
        <div className="brahmakamal pageLoad">
            <Header
                headerConfig={header}
                buttonClickHandler={onButtonClick}
                navigationItems={navigationItems}
                backgroundImage={backgroundImage}
                onImageLoad={imageLoaded} />
            <CustomItemsCarousel
                isOpen={isItemCarouselOpen}
                dataObject={isItemCarouselOpen && homeConfig[selectedCategory]}
                screenWidth={screenWidth}
                selectedCategory={selectedCategory}
                onCardClickHandler={onCardClickHandler}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    appConfig: state.villageLodge.config,
    screenWidth: state.villageLodge.screenWidth,
    imageUrls: state.villageLodge.imageUrls
})

const mapDispatchToProps = {
    setFullScreenLoader: setFullScreenLoader
}

export default container(Brahmakamal, mapStateToProps, mapDispatchToProps)
