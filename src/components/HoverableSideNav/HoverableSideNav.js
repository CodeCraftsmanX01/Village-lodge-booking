import React from 'react'
import { withRouter } from 'react-router'
import './HoverableSideNav.scss'
import SideNavItem from './SideNavItem/SideNavItem'

const HoverableSideNav = ({
    config,
    history,
    screenWidth
}) => {
    const onClickHandler = (link) => {
        history.push(link)
    }
    return screenWidth > 1300 && (
        <div className="hoverableSideNav">
            {
                config.map((item, index) =>
                    <SideNavItem
                        key={index}
                        itemConfig={item}
                        onClick={onClickHandler}
                        top={index} />
                )
            }
        </div>
    )
}

export default withRouter(HoverableSideNav)