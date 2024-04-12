import React, { Fragment, useEffect, useState } from 'react'
import './NavigationPanel.scss'
import Navigationitem from './../NavigationItem/Navigationitem'
import { mainLogo } from './../Images/logo'
import FullPageNavigation from './../UI/FullPageNavigation/FullPageNavigation'
import container from './../../common/utils/container'
import { navigationItemsGenerator, noNavigationBarComponent } from './../../common/constants/defaults'

const NavigationPanel = ({
    screenWidth,
    items = '',
    location: { pathname },
    view
}) => {
    const [drawerToggle, setDrawerToggle] = useState(false)
    const [selectedItemConfig, setSelectedItemConfig] = useState([])
    const sideDrawerClosedHandler = () => {
        setDrawerToggle(false)
    }

    useEffect(() => {
        setSelectedItemConfig(navigationItemsGenerator(view, screenWidth, items))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, screenWidth])

    const navBar = selectedItemConfig.map((button, index) =>
        <Navigationitem key={button.itemName}
            itemName={button.itemName}
            itemType={button.itemType}
            menuItems={button.menuItems}
            route={button.route}
            calledFrom={drawerToggle ? 'SideBar' : ''} />
    )

    return (
        <nav className="navigationPanel">
            <div className="navigationLogo">
                <img loading="lazy" src={mainLogo} alt="logo" className="logo" />
            </div>
            {
                selectedItemConfig.length > 0 && <Fragment>
                    {screenWidth <= 1300 || noNavigationBarComponent.some(path => pathname.includes(path)) ?
                        <FullPageNavigation
                            open={drawerToggle}
                            closed={sideDrawerClosedHandler}
                            component={navBar} /> :
                        <div className='navigationItems'>
                            {navBar}
                        </div>}
                </Fragment>
            }

        </nav>
    )
}

const mapStateToProps = (state) => ({
    screenWidth: state.villageLodge.screenWidth,
})
const mapDispatchToProps = {
}


export default container(NavigationPanel, mapStateToProps, mapDispatchToProps)
