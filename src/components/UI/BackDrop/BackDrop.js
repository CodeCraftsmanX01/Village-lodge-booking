import React, { useEffect } from 'react'
import Spinner from '../Spinner/Spinner'
import './Backdrop.scss'

const Backdrop = ({ show, showSpinner, spinnerText = '' }) => {

    return (
        < div className={`backdrop ${show ? 'backdropShow' : 'backdropHide'}`}>
            {
                show && showSpinner && <div className='backdropChildren' >
                    <Spinner
                        fontSize='16rem'
                        textFontSize='3rem'
                        text={spinnerText} />
                </div>
            }
        </div >
    )
}

export default Backdrop