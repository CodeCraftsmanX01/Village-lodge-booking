import React from 'react'
import './Footer.scss'
import { icons } from '../../common/constants/defaults'

const Footer = ({
    config,
    history
}) => {
    const { name = '', requiredIcons = [], address = '' } = config
    const onClickHandler = (link) => {
        window.open(link)
    }
    return (
        <div className="Footer">
            <div className="Footer1">
                <span> <h1 className='Name'>{name}</h1> </span>
                <div className="socialLinks">
                    {
                        icons.filter(icon => requiredIcons.includes(icon.name)).map((item, index) =>
                            <span className='Icons' key={index} onClick={() => onClickHandler(item.link)} >{item.comp}</span>
                        )
                    }
                </div>
            </div>
            <div className="Footer2">
                <div className="address">
                    {address}
                </div>
                <div className="last">
                    <p>©2021 BRAHMAKAMAL</p>
                    <p>All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer