import React from 'react'
import './Notice.scss'

const Notice = ({
    prices,
}) => {
    const roomTarrif = prices?.data?.roomPrices || {}
    return (
        <div className='notice'>
            <h3>Things to know before you start</h3>
            <ul>
                <li>Presently we are providing rooms for minimum 4 days, 3 nights</li>
                <li>Room rent per day is decided based on the time period selected.</li>
                <li>Tarrif are as follows
                    <ul style={{ paddingLeft: "2rem" }}>
                        {
                            Object.keys(roomTarrif).map(tarrif =>
                                <li >{tarrif}: ₹ {roomTarrif[tarrif]}/-</li>
                            )
                        }
                    </ul>
                </li>
                <li>Click on CHECK AVAILABILITY after selecting booking period to know which tarrif applies.</li>
            </ul>
        </div>
    )
}


export default Notice
