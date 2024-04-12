import React from 'react'
import './Error.scss'
import { ErrorIcon } from '../../common/icons'

const Error = () => {
    return (
        <div className="mainbox">
            <div className='errorCode'>
                <ErrorIcon  className="icon" fill='white' />
            </div>
            <div className="msg">
                <p>There was an issue while loading this page</p>
                <p>We do apologise on it's behalf.</p>
                <p>Let's refresh the page and try again.</p>
            </div>
        </div>
    )
}

export default Error