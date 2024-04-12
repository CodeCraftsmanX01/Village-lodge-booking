import React from 'react'
import './FullPageNavigation.scss'
const FullPageNavigation = ({
    open,
    closed,
    component
}) => {
    return (
        <div className="navigation">
            <input type="checkbox" className="navigation__checkbox" id="navi-toggle" />

            <label htmlFor="navi-toggle" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
            </label>

            {/* <div className="navigation__background">&nbsp;</div> */}

            <nav className="navigation__nav">
                <ul className="navigation__list">
                    {component}
                </ul>
            </nav>
        </div>
    )

}

export default FullPageNavigation