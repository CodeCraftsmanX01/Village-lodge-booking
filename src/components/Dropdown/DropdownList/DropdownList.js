import React from 'react'
import './DropdownList.scss'
import DropdownItem from '../DropdownItem/DropdownItem'
const DropdownList = ({
    isOpen,
    setIsOpen,
    data,
    selected,
    handleDropdownItemCLick
}) => {
    // useEffect(() => {
    //     document.body.addEventListener('click', (event) => {
    //         if (event.target.closest(".dropdownListVisible")|| event.target.closest(".dropdownListHidden")) return
    //         setIsOpen(false)
    //     })
    // }, [])
    return (
        <div className={`${isOpen ? `dropdownListVisible` : `dropdownListHidden`}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <div className='dropdownListInner'>
                {data.map((option, index) => (
                    <DropdownItem
                        key={index}
                        selected={selected}
                        handleDropdownItemCLick={handleDropdownItemCLick}
                        itemInfo={option}
                    />
                ))}
            </div>
        </div >
    )
}

export default DropdownList
