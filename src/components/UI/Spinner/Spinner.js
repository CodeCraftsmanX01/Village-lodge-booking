import React from 'react'
import './Spinner.scss'

const Spinner = ({
    color = 'white',
    fontSize = '1.2rem',
    text = '',
    textFontSize = '0.5rem' }) => {
    return (
        <div className='spinnerContainer'>
            <div className="loader"
                style={{
                    color: color,
                    fontSize: fontSize
                }} >

            </div>
            {text &&
                <span
                    className='spinnerText'
                    style={{ fontSize: textFontSize, color }}>
                    {text}
                </span>}
        </div>
    )
}

export default Spinner