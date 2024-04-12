import React from 'react'
import NavigationPanel from './../NavigationPanel/NavigationPanel'
import Button from './../UI/Button/Button'
import './Header.scss'

const headerStyles = {
    home: 'parallaxHeader',
    aboutUs: 'parallaxAbout',
    registration: 'parallaxRegistration',
    locateUs: 'parallaxAbout'
}

const Header = ({
    headerConfig,
    buttonClickHandler,
    backgroundImage = '',
    navigationItems = '',
    view,
    onImageLoad
}) => {

    const {
        headerText = '',
        bodyText = '',
        buttons = [],
        renderedFrom = 'home' } = headerConfig

    return (
        <div className="header">
            <div className={`${headerStyles[renderedFrom]} commonBackground`}
                style={{ backgroundImage: `url(${backgroundImage})` }}>
                <img
                    style={{ display: 'none' }}
                    src={backgroundImage}
                    alt=""
                    onLoad={onImageLoad} />
                <div className="background">
                    <NavigationPanel
                        items={navigationItems}
                        view={view}
                    />
                    <div className="headerText">
                        <div className="text-center middle">
                            <div className="text">
                                <p className='head'>{headerText}</p>
                                <p className='info'>{bodyText}</p>
                            </div>
                            <div className='headerButtons'>
                                {
                                    buttons.map(button =>
                                        <Button onClickEvent={() => buttonClickHandler(button)} >
                                            {button}
                                        </Button>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
