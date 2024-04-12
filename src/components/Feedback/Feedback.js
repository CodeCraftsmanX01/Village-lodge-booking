import React, { useEffect, useState } from 'react'
import './Feedback.scss'
import TextField from '@material-ui/core/TextField'
import Button from './../UI/Button/Button'
import { regexExpressions } from './../../common/constants/defaults'
import { feedback } from './../../common/actions/lodge.actions'

const Feedback = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        contactNo: '',
        email: '',
        message: '',
    })
    const [isError, setIsError] = useState({
        forName: false,
        forPhone: false,
        forEmail: false,
        forFeedback: false
    })
    const [selectedField, setSelectedField] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const onChangehandler = (key, value) => {
        setSelectedField(key)
        switch (key) {
            case 'noOfTrips': if (value < 0) {
                setFormData({
                    ...formData,
                    noOfTrips: 0
                })
            } else {
                setFormData({
                    ...formData,
                    [key]: value
                })
            }
                break
            default:
                setFormData({
                    ...formData,
                    [key]: value
                })
        }
    }

    const checkError = () => (isError.forName || isError.forPhone || isError.forEmail) ||
        (formData.fullName === '' || formData.contactNo === '' || formData.email === '' || formData.message === '')


    const onClickButton = () => {
        setIsLoading(true)
        feedback(formData, setIsLoading, setFormData)
    }

    useEffect(() => {
        switch (selectedField) {
            case 'fullName':
                if (formData && formData.fullName && !formData.fullName.match(regexExpressions.name)) {
                    setIsError({
                        ...isError,
                        forName: true
                    })
                }
                else {
                    setIsError({
                        ...isError,
                        forName: false
                    })
                }
                break
            case 'contactNo':
                if (formData && formData.contactNo && !formData.contactNo.match(regexExpressions.phoneNumber)) {
                    setIsError({
                        ...isError,
                        forPhone: true
                    })
                }
                else {
                    setIsError({
                        ...isError,
                        forPhone: false
                    })
                }
                break
            case 'email':
                if (formData && formData.email && !formData.email.trim().match(regexExpressions.email)) {
                    setIsError({
                        ...isError,
                        forEmail: true
                    })
                } else {
                    setIsError({
                        ...isError,
                        forEmail: false
                    })
                }
                break
            case 'message':
                if (formData && formData.message && formData.lenght < 20) {
                    setIsError({
                        ...isError,
                        forFeedback: true
                    })
                } else {
                    setIsError({
                        ...isError,
                        forFeedback: false
                    })
                }
                break
            default:
                break
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])

    return (
        <div className="contactUs rightSide">
            <div>
                <div className='notice'>
                    <p className='mainHeadings'>HAVE SOME QUESTIONS...?</p>
                    <p>Send us any query or feedback related to our services. We will try to get back as soon as possible...</p>
                </div>
                <div className="textFields">
                    <div className="myTestClass">
                        <TextField
                            id="outlined-basic-name"
                            value={formData.fullName || ''}
                            label="Enter first and last name *"
                            variant="outlined"
                            onChange={(event) => onChangehandler('fullName', event.target.value)}
                            helperText={isError.forName && 'Invalid name entered'}
                            error={isError.forName}
                        />
                        <TextField
                            id="outlined-basic-mobile"
                            value={formData.contactNo || ''}
                            label="Mobile *"
                            variant="outlined"
                            onChange={(event) => onChangehandler('contactNo', event.target.value)}
                            helperText={isError.forPhone && 'Invalid mobile number entered'}
                            error={isError.forPhone}
                        />
                        <TextField
                            id="outlined-basic-email"
                            value={formData.email || ''}
                            label="Email *"
                            variant="outlined"
                            onChange={(event) => onChangehandler('email', event.target.value)}
                            helperText={isError.forEmail && 'Invalid email entered'}
                            error={isError.forEmail}
                        />
                        <TextField
                            id="outlined-basic-message"
                            value={formData.message || ''}
                            label="Your Message *"
                            variant="outlined"
                            onChange={(event) => onChangehandler('message', event.target.value)}
                            helperText={isError.forFeedback && 'Should be more than 20 characters'}
                            error={isError.forFeedback}
                        />
                    </div>
                </div>
                <div className='reserveButton' >
                    <Button
                        isDisabled={checkError()}
                        onClickEvent={onClickButton}
                        buttonLong
                        isLoading={isLoading}>
                        Send Message
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default Feedback
