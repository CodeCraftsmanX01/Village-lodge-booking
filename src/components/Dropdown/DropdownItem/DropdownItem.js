import React from 'react'
import './DropdownItem.scss'
const DropdownItem = ({
    handleDropdownItemCLick,
    itemInfo,
    index,
    selected
}) => {
    const { itemName, route, isDisabled } = itemInfo
    return (
        <div
            className={`dropdownItem ${selected === route ? 'activeItemDropdown' : ''} ${isDisabled ? 'disabled' : ''}`}
            onClick={(event) => !isDisabled && handleDropdownItemCLick(event, itemInfo, index)}>
            {itemName}
        </div>
    )
}

export default DropdownItem
