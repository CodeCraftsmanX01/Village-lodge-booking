import React, { Fragment, useEffect, useState } from 'react'
import './RegistrationForm.scss'
import moment from 'moment'
import Checkbox from '@material-ui/core/Checkbox'
import DialogComp from '../DialogComp/DialogComp'
import { FoodMenu, TripInfo } from '../DialogInfo/DialogInfo'
import Button from './../UI/Button/Button'
import { backgroundImageRenderer } from '../../common/styles'
import Box from "@mui/material/Box";
import TextField from '@material-ui/core/TextField'
import Autocomplete from "@mui/material/Autocomplete";
import * as actions from './../../common/actions/lodge.actions'
import { updateFinalReservationData } from './../../common/actions/actions'
import container from './../../common/utils/container'
import NavigationPanel from './../NavigationPanel/NavigationPanel'
import { countryCodes, regexExpressions } from './../../common/constants/defaults'
import Error from './../Error/Error'
import { Info } from '../../common/icons'
import NumberCounter from '../UI/Inputs/NumberCounter/NumberCounter'
import FileUpload from '../UI/FileUpload/FileUpload'
import { clone } from 'ramda'
import { getFileName } from '../../common/utils/common.utils'

const Form = ({
    preRegistrationData,
    getFinalReservation,
    history,
    location: { search },
    userFormData,
    prices,
    config,
    view,
    updateFinalReservationData,
    finalReservationData
}) => {

    const { backgroundImage, navigationItems } = config[view]
    const [formData, setFormData] = useState({
        mobileNumber: '+91',
        email: '',
        specialRequest: '',
        extraBed: false,
        meals: false,
        noOfTrips: 2,
        driverRoom: false,
        country: 'India'
    })
    const [errorObject, setErrorObject] = useState({
        mobileNumber: false,
        email: false
    })
    const [isDialogOpen, setIsDialogOpen] = useState({
        isVisble: false,
        view: ''
    })
    const [selectedField, setSelectedField] = useState('')

    useEffect(() => {
        const formDataObject = clone(formData)
        const isErrorObject = clone(errorObject)
        for (let i = 0; i < preRegistrationData?.guests; i++) {
            formDataObject[`guest${i}`] = {}
            isErrorObject[`guest${i}`] = {
                guestName: false,
                uploadInfo: false
            }
        }
        setErrorObject(isErrorObject)
        setFormData(formDataObject)
    }, [preRegistrationData])

    const nameAndFile = []
    for (let i = 0; i < preRegistrationData?.guests; i++) {
        nameAndFile.push({
            label: i === 0 ? "Your Name *" : `Guest ${i} name`,
            variant: "outlined",
            onChangeKey: `guest${i}`,
            helperText: 'Invalid name entered',
            helperTextFiles: 'Upload a valid file',
            fileFieldLabel: 'ID proof (Accepted file type : PDF, JPG, PNG)'
        })
    }

    const textFields = [
        // {
        //     label: "Mobile *",
        //     variant: "outlined",
        //     onChangeKey: 'mobileNumber',
        //     helperText: 'Invalid mobile number entered',
        //     error: errorObject.mobileNumber,
        // },
        {
            label: "Email *",
            variant: "outlined",
            onChangeKey: 'email',
            helperText: 'Invalid email entered',
            error: errorObject.email,
        },
        {
            label: "Any Special Request",
            variant: "outlined",
            onChangeKey: 'specialRequest',
        }
    ]

    const checkboxes = [
        {
            onChangeKey: 'extraBed',
            disabled: (preRegistrationData.guests % 2 === 0 || preRegistrationData.guests === 1),
            text: `Extra bed @ ₹ ${prices?.otherPrices.EXTRA_BED}  /-`
        },
        {
            onChangeKey: 'driverRoom',
            disabled: false,
            text: `Driver's accommodation ₹ ${prices?.otherPrices.DRIVER}  /-`
        },
        {
            onChangeKey: 'meals',
            disabled: false,
            text: <Fragment>
                Meals per person @ ₹ {prices?.otherPrices.MEAL}  /-
                <span title='Click for more info'
                    onClick={() => setIsDialogOpen({ view: 'food', isVisible: true })}>
                    <Info style={{ width: '29px', height: '35px', padding: '14px 2px 0px' }} className='tooltipAnimation' />
                </span>
            </Fragment>

        },
    ]

    const onChangehandler = async (key, value) => {
        const formDataObject = clone(formData)
        let selectedFieldKey = ''
        if (key.includes('guest')) {
            if (key.includes('document')) {
                const data = await actions.uploadFile(value, 'document')
                selectedFieldKey = key.split('d')[0]
                formDataObject[selectedFieldKey] = {
                    ...formDataObject[selectedFieldKey],
                    ...data
                }
            } else {
                selectedFieldKey = key.split('n')[0]
                formDataObject[selectedFieldKey] = {
                    ...formDataObject[selectedFieldKey],
                    guestName: value
                }
            }
        } else if (key === 'country') {
            if (value && value !== '') {
                const selectedCountry = countryCodes.find(country => country.label === value)
                formDataObject[key] = selectedCountry.label
                formDataObject['mobileNumber'] = selectedCountry.phone
            } else {
                formDataObject[key] = ''
                formDataObject['mobileNumber'] = ''
            }
        } else {
            selectedFieldKey = key
            formDataObject[key] = value
        }
        setFormData(formDataObject)
        setSelectedField(selectedFieldKey)
    }

    const checkErrors = (isOnSubmit = false) => {
        const isErrorObject = clone(errorObject)
        if (selectedField === 'mobileNumber') {
            isErrorObject['mobileNumber'] = formData?.mobileNumber !== '' && !formData?.mobileNumber.match(regexExpressions.phoneNumber)
        } else if (selectedField === 'email') {
            isErrorObject['email'] = formData?.email !== '' && !formData?.email?.trim()?.match(regexExpressions.email)
        }
        setErrorObject(isErrorObject)
    }

    useEffect(() => {
        checkErrors()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])

    useEffect(() => {
        Object.keys(userFormData).length > 0 && setFormData(userFormData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userFormData])

    const checkError = () => {
        for (const itemKey in formData) {
            if (itemKey.includes('guest')) {
                if (!((formData[itemKey].hasOwnProperty('guestName') && formData[itemKey]['guestName'] !== '') &&
                    (formData[itemKey].hasOwnProperty('url') && formData[itemKey]['url'] !== '') &&
                    (formData[itemKey].hasOwnProperty('name') && formData[itemKey]['name'] !== ''))) {
                    return true
                }
            } else if (itemKey === 'mobileNumber' || itemKey === 'email') {
                if (formData[itemKey] === '' || errorObject[itemKey]) {
                    return true
                }
            }
        }
        return false
    }

    const onClickButton = () => {
        updateFinalReservationData(
            {
                ...finalReservationData,
                isLoading: true,
                errorObject: false
            })
        getFinalReservation(preRegistrationData, formData)
        history.push("/register/finalbill" + search)
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    const fileClearHandler = (files, handlerKey) => {
        const formDataObject = clone(formData)
        const fileNames = getFileName(files)
        for (const itemKey in formDataObject) {
            if (itemKey.includes('guest')) {
                if (formDataObject[itemKey]?.name.includes(fileNames[0]) &&
                    handlerKey.includes(itemKey.split('t')[1])) {
                    actions.deleteFile(formDataObject[itemKey]?.name)
                    formDataObject[itemKey].name = ''
                    formDataObject[itemKey].url = ''
                }
            }
        }
        setFormData(formDataObject)
    }

    return (
        <div>
            {
                Object.keys(preRegistrationData).length > 0 ?
                    (<div className="commonBackground"
                        style={backgroundImageRenderer(backgroundImage, true)}>
                        <NavigationPanel
                            items={navigationItems}
                            view={view} />
                        <div className='registrationForm'>
                            <div className="registrationFormInner">
                                <h1 className='mainHeadings'>The Village Lodge</h1>
                                <div className="formTable">
                                    <h3 className='secondaryHeading'>Selected Details</h3>
                                    <table >
                                        <tbody>
                                            <tr>
                                                <td>Arrival</td>
                                                <td>{moment(preRegistrationData.arrivalDate).format('DD/MM/YYYY')}</td>
                                            </tr>
                                            <tr>
                                                <td>Departure</td>
                                                <td>{moment(preRegistrationData.departureDate).format('DD/MM/YYYY')}</td>
                                            </tr>
                                            <tr>
                                                <td>Number of Guests</td>
                                                <td>{preRegistrationData.guests}</td>
                                            </tr>
                                            <tr>
                                                <td>Number of Rooms</td>
                                                <td>{preRegistrationData.rooms}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="textFields">
                                    {
                                        nameAndFile.map((field, index) =>
                                            <div className='singlelineMultipleFields'>
                                                <div className='nameField fieldContainer'>
                                                    <TextField
                                                        id={`outlined-basic${index}`}
                                                        value={formData?.[field['onChangeKey']]?.['guestName'] || ''}
                                                        label={field?.label || ''}
                                                        variant={field?.variant || 'outlined'}
                                                        onChange={(event) => onChangehandler(`${field['onChangeKey']}name`, event.target.value)}
                                                        helperText={errorObject?.[field?.onChangeKey]?.['guestName'] && field?.helperText}
                                                        error={errorObject?.[field?.onChangeKey]?.['guestName'] || false}
                                                    />
                                                </div>
                                                <div className='fileField fieldContainer'>
                                                    <FileUpload
                                                        key={index}
                                                        handlerKey={`${field['onChangeKey']}document`}
                                                        //value={formData[`${field['onChangeKey']}document`] || ''}
                                                        labelText={field?.fileFieldLabel || ''}
                                                        onChangeField={onChangehandler}
                                                        accept=".jpg,.pdf,.png"
                                                        required={true}
                                                        helperText={errorObject?.[field?.onChangeKey]?.['uploadInfo'] && field?.helperTextFiles}
                                                        error={errorObject?.[field?.onChangeKey]?.['uploadInfo'] || false}
                                                        clearingMethod={(files, textFieldValue) => fileClearHandler(files, textFieldValue)}
                                                        textFieldValue={formData?.[field['onChangeKey']]?.['guestName'] || ''}
                                                    />
                                                </div>
                                            </div>

                                        )
                                    }
                                    {
                                        <div className='singlelineMultipleFields'>
                                            <div className='countryCodeField fieldContainer'>
                                                <Autocomplete
                                                    id="country-select-demo"
                                                    sx={{ width: '100%' }}
                                                    options={countryCodes}
                                                    autoHighlight
                                                    defaultValue={{ code: "IN", label: "India", phone: "+91" }}
                                                    onChange={(event) => onChangehandler('country', event.target.textContent)}
                                                    renderOption={(props, option) => (
                                                        <Box
                                                            component="li"
                                                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                                            {...props}
                                                        >
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                alt=""
                                                            />
                                                            {option.label}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => <TextField {...params} label="Choose a country" />}
                                                />
                                            </div>
                                            <div className='mobileField fieldContainer'>
                                                <TextField
                                                    id={`outlined-basic`}
                                                    value={formData['mobileNumber'] || ''}
                                                    label="Mobile *"
                                                    variant={'outlined'}
                                                    onChange={(event) => onChangehandler('mobileNumber', event.target.value)}
                                                    helperText={errorObject['mobileNumber'] && 'Invalid mobile number entered'}
                                                    error={errorObject.mobileNumber}
                                                />
                                            </div>
                                        </div>
                                    }
                                    {
                                        textFields.map((field, index) =>
                                            <TextField
                                                id={`outlined-basic${index}`}
                                                value={formData[field?.onChangeKey] || ''}
                                                label={field?.label || ''}
                                                variant={field?.variant || 'outlined'}
                                                onChange={(event) => onChangehandler(field?.onChangeKey, event.target.value)}
                                                helperText={errorObject[field?.onChangeKey] && field?.helperText}
                                                error={field?.error}
                                            />
                                        )
                                    }
                                </div>
                                <div className="extraOptions">
                                    <div className='innerDiv'>
                                        {
                                            checkboxes.map((checkBox, index) =>
                                                <span className='options'>
                                                    <Checkbox
                                                        key={index}
                                                        checked={formData[checkBox?.onChangeKey]}
                                                        onChange={(event) => onChangehandler(checkBox?.onChangeKey, event.target.checked)}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                        disabled={checkBox?.disabled}
                                                    />
                                                    <p>{checkBox?.text}</p>
                                                </span>
                                            )
                                        }
                                        <span className='subOptions'>
                                            {/* <NumberCounter
                                                min={1}
                                                variant="outlined"
                                                inputProps={{ style: { fontSize: '1.5rem' } }}
                                                value={formData.noOfTrips}
                                                label={'No of Trips to Park'}
                                                onChange={(value) => onChangehandler('noOfTrips', value)}
                                            /> */}
                                            <p>* It is mandatory to have 2 park trips per day, click on i icon to know more</p>
                                            <span title='Click for more info'
                                                onClick={() => setIsDialogOpen({ view: 'trip', isVisible: true })}>
                                                <Info style={{ width: '29px', height: '35px', margin: '0.5rem 0 0 1rem' }} className='tooltipAnimation' />
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className='reserveButton' >
                                    <Button
                                        isDisabled={checkError()}
                                        onClickEvent={onClickButton}
                                        buttonLong>
                                        Check Prices
                                    </Button>
                                </div>
                                <DialogComp
                                    isOpen={isDialogOpen.isVisible}
                                    handleClose={handleDialogClose}
                                    heading={isDialogOpen.view === 'food' ? 'We are providing the following meals' : 'Trip info'}
                                    body={isDialogOpen.view === 'food' ? FoodMenu() : TripInfo(prices)}
                                    buttonName={"OK"}
                                />
                            </div>
                        </div >
                    </div>
                    ) :
                    <Error />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    preRegistrationData: state.villageLodge.preRegistrationData,
    userFormData: state.villageLodge.formData,
    prices: state.villageLodge.prices.data,
    config: state.villageLodge.config,
    view: state.villageLodge.view,
    finalReservationData: state.villageLodge.finalReservationData,
})

const mapDispatchToProps = {
    getFinalReservation: actions.getFinalReservation,
    updateFinalReservationData: updateFinalReservationData

}

export default container(Form, mapStateToProps, mapDispatchToProps)
