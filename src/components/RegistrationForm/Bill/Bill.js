import React from 'react'
import Button from '../../UI/Button/Button'
import moment from 'moment'
import './style.scss'
import { Info } from '../../../common/icons'
const Bill = ({
    data,
    priceData,
    onClickHandler = null,
    setIsDialogOpen = null,
    componentRef = null,
    renderedFrom = '',
    isButtonLoading = false
}) => {
    const numberOfDays = moment(data.departure).diff(moment(data.arrival), 'days')
    return (
        <div className={renderedFrom === 'payment' ? 'backgroundImageAnimation' : ''}>
            <div ref={componentRef} className="bill">{
                renderedFrom === 'payment' &&
                <p className='smallText'>* Please keep this handy at the time of check in</p>
            }
                <div className="registrationFormInner">
                    <h1 className='mainHeadings'>The Village Lodge</h1>
                    <h1 className='mainHeadings fontSizeReducer'>Summary</h1>
                    <span className='idAndDate'>
                        <span className='textCenter'>
                            <p className='headingBolder'>BOOKING ID</p>
                            <p>{data.bookingNo}</p>
                        </span>
                        <span className='textCenter'>
                            <p className='headingBolder'>Date OF BOOKING</p>
                            <p>{moment().format('DD/MM/YYYY')}</p>
                        </span>
                    </span>
                    <div className='basicUserInfo'>
                        <div className='basicUserBookingInfo1'>
                            <span className='item'>
                                <p className='headingBolder'>BOOKED By : <span className='tabelDataResult'>{data.name}</span></p>
                            </span>
                            <span className='item'>
                                <p className='headingBolder'>MOBILE : <span className='tabelDataResult'>{data.phoneNo}</span></p>
                            </span>
                            <span className='item'>
                                <p className='headingBolder'>EMAIL : <span className='tabelDataResult infoWordBreak'>{data.email}</span></p>
                            </span>
                        </div>
                        <div className='basicUserBookingInfo2'>
                            <span className='item'>
                                <p className='headingBolder'>ARRIVAL : <span className='tabelDataResult'>{moment(data.arrival).format('DD/MM/YYYY')}</span></p>
                            </span >
                            <span className='item'>
                                <p className='headingBolder'>DEPARTURE : <span className='tabelDataResult'>{moment(data.departure).format('DD/MM/YYYY')}</span></p>
                            </span>
                            <span className='item'>
                                <p className='headingBolder'>NUMBER OF GUESTS : <span className='tabelDataResult'>{data.noOfGuests}</span></p>
                            </span>
                            <span className='item'>
                                <p className='headingBolder'>NUNMBER OF ROOMS : <span className='tabelDataResult'>{data.noOfRooms}</span></p>
                            </span>
                        </div>
                        <div className='basicUserBookingInfo1'>
                            <span className='item'>
                                <p className='headingBolder'>SPECIAL REQUEST : <span className='tabelDataResult'>{`${data.specialRequest || 'No'}`}</span></p>
                            </span>
                        </div>
                    </div>
                    <div className="formTable">
                        <table >
                            <tbody>
                                <tr>
                                    <th>ITEM</th>
                                    <th>
                                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>DESCRIPTION
                                            {setIsDialogOpen && <span title='Click for more info'
                                                onClick={() => setIsDialogOpen(true)}>
                                                <Info style={{ width: '29px', height: '35px', padding: '6px 0px 0px 7px' }} className='tooltipAnimation' />
                                            </span>}
                                        </span>
                                    </th>
                                    <th>AMOUNT</th>
                                </tr>
                                <tr>
                                    <td>ROOM COST</td>
                                    <td>{priceData.ROOM} X {numberOfDays} </td>
                                    <td className='tabelDataResult'>{data.roomCost || 0}</td>
                                </tr>
                                <tr>
                                    <td>MEAL</td>
                                    <td>{numberOfDays}  X {data.noOfGuests}  X {priceData.MEAL} </td>
                                    <td className='tabelDataResult'>{data.mealCost || 0}</td>
                                </tr>
                                <tr>
                                    <td>TRIPS COST</td>
                                    <td>{'(' + priceData.GYPSY + ' + ' + priceData.PARK_FEES + ' + ' + priceData.GUIDE_FEES + ')'}  X {numberOfDays}</td>
                                    <td className='tabelDataResult'>{data.tripToParkCost || 0}</td>
                                </tr>
                                <tr>
                                    <td>EXTRA BED</td>
                                    <td>{priceData.EXTRA_BED} X {data.noOfExtraBed || 0} </td>
                                    <td className='tabelDataResult'>{data.extraBedCost || 0}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className='textCenter'>SUB TOTAL</td>
                                    <td className='tabelDataResult'>{data.estimatedCost || 0}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className='textCenter'>GST X SUB TOTAL</td>
                                    <td className='tabelDataResult'>{data.estimatedTax || 0}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className='textCenter'>TOTAL</td>
                                    <td className='tabelDataResult'>{data.totalCost || 0}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {onClickHandler ? <div className='reserveButton' >
                        <Button onClickEvent={onClickHandler}
                            isLoading={isButtonLoading}
                            buttonLong>
                            CHECKOUT
                        </Button>
                    </div> :
                        <h1 className='mainHeadings'>Payment Status: <span className='successText'>Completed</span></h1>
                    }
                </div>
            </div >
        </div>
    )

}

export default Bill