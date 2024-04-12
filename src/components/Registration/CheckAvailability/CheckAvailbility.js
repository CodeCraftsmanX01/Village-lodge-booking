import React, { useEffect, useState } from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import './CheckAvailbility.scss'
import moment from 'moment'
import { marksGuest, marksRooms } from '../../../common/sliderMarks'
import * as actions from './../../../common/actions/lodge.actions'
import { updateAvailbilityData } from './../../../common/actions/actions'
import container from './../../../common/utils/container'
import Button from './../../UI/Button/Button'

const CheckAvailbility = ({
    view,
    checkAvailbility,
    setPreRegistrationOptions,
    history,
    location: { search },
    checkAvailbilityData,
    prices,
    setCheckAvailbility
}) => {

    const [registrationData, setRegistrationData] = useState({
        arrivalDate: moment(),
        departureDate: moment().add(3, 'days'),
        guests: 1,
        rooms: 1,
        location: ''
    })
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const now = moment()
        if ((registrationData.arrivalDate.isSameOrAfter(now, 'date') && registrationData.departureDate.isSameOrAfter(now, 'date'))) {
            setIsError(false)
        }
        else {
            setIsError(true)
        }
    }, [registrationData])

    const checkError = () => isError || isLoading
    const onChangehandler = (key, value) => {
        setCheckAvailbility({})
        switch (key) {
            // case 'guest': 
            // if (value === 1) {
            //     setRegistrationData({
            //         ...registrationData,
            //         //rooms: 2,
            //         [key]: value
            //     })
            // } else {
            //     setRegistrationData({
            //         ...registrationData,
            //         [key]: value
            //     })
            // }
            //     break
            case 'arrivalDate':
                const diffArrDep = moment(value).diff(registrationData.departureDate, 'days')
                if ((diffArrDep < 3) || (diffArrDep > 3)) {
                    setRegistrationData({
                        ...registrationData,
                        [key]: value,
                        departureDate: moment(value).add(3, 'days')
                    })
                } else {
                    setRegistrationData({
                        ...registrationData,
                        [key]: value
                    })
                }
                break
            default:
                setRegistrationData({
                    ...registrationData,
                    [key]: value
                })
        }
    }
    const onClickButton = () => {
        setIsLoading(true)
        checkAvailbility(registrationData, setIsLoading)
    }

    const onClickStartBooking = () => {
        setPreRegistrationOptions(registrationData)
        history.push("register/form" + search)
    }
    useEffect(() => {
        view !== '' &&
            setRegistrationData({
                ...registrationData,
                location: view,
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view])

    return (
        <div className="checkAvailbility">
            <div>
                <div className='component'>
                    <span className={'datePicker'}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                variant="inline"
                                format="DD/MM/YYYY"
                                margin="normal"
                                id="date-picker-inline-Arrival"
                                label="Arrival"
                                value={registrationData.arrivalDate || moment()}
                                onChange={(date) => onChangehandler('arrivalDate', date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                variant="inline"
                                format="DD/MM/YYYY"
                                margin="normal"
                                id="date-picker-inline-Departure"
                                label="Departure"
                                value={registrationData.departureDate || moment(registrationData.arrivalDate).add(3, 'days')}
                                onChange={(date) => onChangehandler('departureDate', date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </span>
                    <span className="roomGuestSelector">
                        <Typography id="discrete-slider" gutterBottom>
                            Guests
                        </Typography>
                        <Slider
                            defaultValue={1}
                            //getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={marksGuest}
                            min={1}
                            max={5}
                            onChange={(event, value) => onChangehandler('guests', value)}
                        />
                        <Typography id="discrete-slider" gutterBottom>
                            Rooms
                        </Typography>
                        <Slider
                            defaultValue={1}
                            value={registrationData.rooms}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={marksRooms}
                            min={1}
                            max={2}
                            disabled={!(registrationData.guests && registrationData.guests > 1)}
                            onChange={(event, value) => onChangehandler('rooms', value)}
                        />
                    </span>
                    <span className='reserveButton' >
                        <Button
                            isDisabled={checkError()}
                            onClickEvent={() => !(checkError()) ? checkAvailbilityData.isAvailable ? onClickStartBooking() : onClickButton() : ''}
                            buttonLong
                            isLoading={isLoading}>
                            <span style={{ display: 'flex', justifyContent: 'center' }}>
                                {checkAvailbilityData.isAvailable ? 'Start Booking'
                                    : isError ? 'Select future date' : 'Check Availability'}
                            </span>
                        </Button>
                    </span>
                    {
                        checkAvailbilityData && <p className='costBreakdownText'>{checkAvailbilityData?.costBreakdown}</p>
                    }

                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => ({
    view: state.villageLodge.view,
    checkAvailbilityData: state.villageLodge.checkAvailbilityData,
    prices: state.villageLodge.prices
})

const mapDispatchToProps = {
    setPreRegistrationOptions: actions.setPreRegistrationOptions,
    checkAvailbility: actions.getCheckAvailbility,
    setCheckAvailbility: updateAvailbilityData
}

export default container(CheckAvailbility, mapStateToProps, mapDispatchToProps)
