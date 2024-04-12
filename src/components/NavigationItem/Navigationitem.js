import React, { useState } from 'react'
import './Navigationitem.scss'
import { setView } from './../../common/actions/lodge.actions'
import container from './../../common/utils/container'
import DropdownList from '../Dropdown/DropdownList/DropdownList'
import { ArrowUp, ArrowDown } from '../../common/icons'

const Navigationitem = (
  { itemName,
    itemType,
    menuItems,
    route,
    history,
    location: { pathname, search },
    view,
    setView,
    calledFrom = '' }) => {

  const [isOpen, setIsOpen] = useState(false)

  // const handleClick = (event) => {
  //   setIsOpen(true)
  // }
  const handleDropdownItemCLick = (event, key, index) => {
    setView(key.route)
    history.push(`/home`)
  }
  const handleButtonClick = (receivedRoute) => {
    if (receivedRoute === '/home') {
      setView('brahmakamal')
    }
    history.push(receivedRoute + search)
  }

  let itemElement = null
  switch (itemType) {
    case ('normal'):
      itemElement = <li className="navigation__item" onClick={() => handleButtonClick(route)} >
        <button className="navigation__link">{itemName}</button>
      </li>
      break
    case ('special'):
      itemElement = <li className="navigation__item" onClick={() => handleButtonClick(route)} >
        <button className="navigation__link navigation__link__special">{itemName}</button>
      </li>
      break
    case ('withDropdown'):
      itemElement =
        <span className='navigationitem'>
          <li className="navigation__item"
            //onClick={handleClick}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <button className="navigation__link">{itemName}
              {isOpen ?
                <ArrowUp style={{ width: '17px', height: '17px', marginLeft: '1rem' }} className='arrow' /> :
                <ArrowDown style={{ width: '17px', height: '17px', marginLeft: '1rem' }} className='arrow' />}
            </button>

          </li>
          <DropdownList
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            data={menuItems}
            selected={view}
            handleDropdownItemCLick={handleDropdownItemCLick}
          />
        </span>
      break
    default:

  }

  return itemElement
}

const mapStateToProps = (state) => ({
  view: state.villageLodge.view
})

const mapDispatchToProps = {
  setView
}

export default container(Navigationitem, mapStateToProps, mapDispatchToProps)
