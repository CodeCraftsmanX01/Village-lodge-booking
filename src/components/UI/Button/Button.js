import React from 'react'
import Spinner from './../Spinner/Spinner'

const Button = ({
    children,
    onClickEvent,
    isDisabled = false,
    buttonLong = false,
    isLoading = false
}) => {

    return (
        <button onClick={onClickEvent}
            disabled={isDisabled}
            className={`btn btn-brown ${isDisabled ? '' : 'btn-enabled'} ${buttonLong ? 'btn-long' : ''}`}>
            <span style={{ display: 'flex', justifyContent: 'center' }}>
                {isLoading ? <Spinner fontSize={'0.9em'} />
                    : children}
            </span>
        </button>
    )
}

export default Button


