import React from 'react'
import './SideNavItem.scss'
import { icons } from '../../../common/constants/defaults'

const SideNavItem = ({
    itemConfig,
    onClick,
    top
}) => {
    const { itemName = '', itemIcon = '', route = '' } = itemConfig
    const icon = icons.find(icon => icon.name === itemIcon)
    return (
        <div className="sideNavItem"
            style={{ top: `${(top * 8) + 30}%` }}
            onClick={() => onClick(route)}>
            <span className='sideNavItem_icon'>{icon?.['comp']}</span>
            <span className='sideNavItem_text'>{itemName}</span>
        </div>
    )
}

export default SideNavItem