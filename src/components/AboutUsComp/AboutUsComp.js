import React from 'react'
import './AboutUsComp.scss'
import { Mail } from './../../common/icons'

const AboutUsComp = () => {
    return (
        <div className="aboutUsComp leftSide">
            <h1 className='mainHeadings'>Contact Us</h1>
            <div className="Feedback">
                <div className="mailIcon">
                    <Mail />
                </div>
                <div className="detailsContainer">
                    <span className="detail">
                        <p className='head'>Phone</p>
                        <p className='info'>+91-9897020688, +91-9897030688</p>
                    </span>
                    <span className="detail">
                        <p className='head'>E-Mail</p>
                        <p className='info'>villagelodgeone@gmail.com</p>
                    </span>
                    <span className="detail">
                        <p className='head'>Address</p>
                        <p className='info'>Khazra 14-15 Daniyo ka Danda, Old Mussoorie Rd, Dehradun 248009 </p>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default AboutUsComp
