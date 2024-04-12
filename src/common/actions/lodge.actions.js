
import { pathOr } from 'ramda'
import config from './../../config/conifg'
import moment from 'moment'
import * as actions from './actions'
import axios from 'axios'
import * as URL from './../utils/URL'
import createNotification from './../../components/Notifications/Notifications'
import * as commonUtils from './../../common/utils/common.utils'
import { displayRazorpay } from './../../components/Payment/Payment'
import toast from 'react-hot-toast'
import { string } from '../utils/stringUtils'

export const setScreenWidth = (key) => (dispatch) => {
    dispatch(actions.updateScreenWidth(key))
}

export const setConfig = (key) => (dispatch) => {
    dispatch(actions.updateConfig(config))
}

export const setView = (view) => (dispatch) => {
    dispatch(actions.updateView(view))
}

export const setPreRegistrationOptions = (data) => (dispatch) => {
    dispatch(actions.updatePreRegistrationOptions(data))
}

export const getImages = () => (dispatch) => {
    dispatch(actions.setFullScreenLoader(true))
    const images = sessionStorage.getItem('brahkamalImagesUrl')
    if (images) {
        dispatch(actions.setImageUrls({
            isError: false,
            data: JSON.parse(images)
        }))
        //dispatch(actions.setFullScreenLoader(false))
    } else {
        let url = `${URL.baseUrl[process.env.NODE_ENV]}/${URL.images}`
        axios({
            method: 'get',
            url: url
        })
            .then((response) => {
                const receivedData = pathOr({}, ['data', 'data'])(response)
                sessionStorage.setItem('brahkamalImagesUrl', JSON.stringify(receivedData))
                dispatch(actions.setImageUrls({
                    isError: false,
                    data: receivedData
                }))
                // dispatch(actions.setFullScreenLoader(false))
            })
            .catch((err) => {
                console.error(err)
                createNotification('error', err.message, 'Network Error')
                dispatch(actions.setImageUrls({
                    isError: true,
                    data: {}
                }))
                //dispatch(actions.setFullScreenLoader(false))
            })
    }
}

export const getPrices = (data) => (dispatch) => {
    let url = `${URL.baseUrl[process.env.NODE_ENV]}/${URL.prices}/${data}`
    axios({
        method: 'get',
        url: url
    })
        .then((response) => {
            const receivedData = commonUtils.parsePriceData(pathOr({}, ['data', 'data'])(response))
            dispatch(actions.updatePrices({
                isLoading: false,
                data: receivedData
            }))
        })
        .catch((err) => {
            dispatch(actions.updatePrices({
                isLoading: false,
                isError: true,
                data: {}
            }))
            console.error(err)
            createNotification('error', err.message, 'Network Error')
        })
}

export const getCheckAvailbility = (data, setIsLoading) => (dispatch) => {
    let url = `${URL.baseUrl[process.env.NODE_ENV]}/${URL.checkAvailbilityUrl}`
    const payload = {
        arrival: moment(data.arrivalDate).format('YYYY-MM-DD'),
        departure: moment(data.departureDate).format('YYYY-MM-DD'),
        numberOfRooms: data.rooms,
        guests: data.guests,
        location: data.location
    }
    axios({
        method: 'post',
        url: url,
        data: payload
    })
        .then((response) => {
            setIsLoading(false)
            if (!response.data.status || response.data.message === 'Sold Out')
                throw new Error(response.data.message)

            const receivedData = commonUtils.parsecheckAvailbilityData(pathOr({}, ['data'])(response))
            receivedData.isAvailable ? createNotification('info', receivedData.message) :
                createNotification('warning', receivedData.message)
            dispatch(actions.updateAvailbilityData(receivedData))
            dispatch(actions.updatePreRegistrationOptions(data))
        })
        .catch((err) => {
            console.error(err)
            createNotification('error', err.message)
        })
}

export const getFinalReservation = (preReservationData, formData) => (dispatch, store) => {
    const documents = []
    const storeData = store().villageLodge
    dispatch(actions.saveFormData(formData))
    const formDataKeys = Object.keys(formData)
    formDataKeys.forEach(user => {
        if (user.includes('guest')) {
            documents.push(formData[user])
        }
    })
    let url = `${URL.baseUrl[process.env.NODE_ENV]}/${URL.finalReservation}`
    const payload = {
        roomAvailabilityResponseDTO: {
            arrival: moment(preReservationData.arrivalDate).format('YYYY-MM-DD'),
            departure: moment(preReservationData.departureDate).format('YYYY-MM-DD'),
            numberOfRooms: preReservationData.rooms,
            guests: preReservationData.guests,
            totalRoomCost: storeData.checkAvailbilityData.roomCost
        },
        customerDTO: {
            fullName: documents?.[0]?.guestName,
            phoneNumber: formData.mobileNumber,
            email: formData.email,
            specialRequest: formData.specialRequest,
            residenceOf: formData.country,
            documents
        },
        extraBed: formData.extraBed,
        meal: formData.meals,
        noOfTripsToPark: formData.noOfTrips,
        location: storeData.view,
        driver: formData?.driverRoom
    }
    axios({
        method: 'post',
        url: url,
        data: payload
    })
        .then((response) => {
            const receivedData = pathOr({}, ['data', 'data'])(response)
            dispatch(actions.updateFinalReservationData({
                isLoading: false,
                isError: false,
                data: receivedData
            }))
        })
        .catch((err) => {
            dispatch(actions.updateFinalReservationData({
                isLoading: false,
                isError: true,
                data: {}
            }))
            console.error(err)
            createNotification('error', err.message)
        })
}

export const makePayment = (data, history, search, setIsLoading) => (dispatch) => {
    let url = `${URL.baseUrl[process.env.NODE_ENV]}/${URL.paymentApi}`
    const payload = {
        customerName: data.name,
        email: data.email,
        contact: data.phoneNo,
        amount: data.totalCost,
        bookingId: data.bookingNo
    }
    axios({
        method: 'post',
        url: url,
        data: payload
    })
        .then((response) => {
            const receivedData = commonUtils.parsePaymentData(pathOr({}, ['data', 'razorPay'])(response), history, search, paymentStatus)
            dispatch(actions.getPaymentData(receivedData))
            displayRazorpay(receivedData, history, search)
            setIsLoading(false)
        })
        .catch((err) => {
            console.error(err)
            setIsLoading(false)
            const error = 'Payment Gateway'
            createNotification('error', error, 'Error')
        })
}

export const paymentStatus = (data) => {
    let url = `${URL.baseUrl[process.env.NODE_ENV]}/${URL.paymentSuccess}`
    const payload = {
        paymentId: data.razorpay_payment_id,
        orderId: data.razorpay_order_id
    }
    axios({
        method: 'post',
        url: url,
        data: payload
    })
        .then(response => {
            console.error(response)
        }).catch((err) => {
            console.error(err)
        })
}

export const feedback = (data, setIsLoading, setFormData) => {
    let url = `${URL.baseUrl[process.env.NODE_ENV]}/${URL.contactUs}`
    axios({ method: 'post', url, data })
        .then((response) => {
            setIsLoading(false)
            setFormData({
                fullName: '',
                contactNo: '',
                email: '',
                message: '',
            })
            createNotification('info', 'We received your feedback')
        })
        .catch((err) => {
            setIsLoading(false)
            console.error(err)
            createNotification('error', err.message)
        })
}

export const uploadFile = async (files, fileType) => {
    let toastId = ''
    try {
        const formData = new FormData()
        for (const file of files) {
            formData.append('file', file)
        }
        formData.set('fileType', fileType)
        let url = `${URL.baseUrl[process.env.NODE_ENV]}/${URL.fileUploadFirebase}`
        toastId = createNotification('loading', 'Uploading files')
        const response = await axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        const data = pathOr({}, ['data', 'data'])(response)
        toast.dismiss(toastId)
        createNotification('info', 'Checking file upload status')
        let modifiedData = {}
        data.forEach((item, index) => {
            if (item.status === 'SUCCESS')
                modifiedData = { name: item.fileName, url: item.url, lastModified: files[index].lastModified }
            else {
                createNotification('error', `Failed to upload ${item.fileName}`, 'Please reupload the file')
            }
        })
        createNotification('success', 'File Uploaded')
        return modifiedData
    }
    catch (err) {
        toast.dismiss(toastId)
    }
}
export const deleteFile = async (fileName, fileType = 'DOCUMENT') => {
    try {
        const payload = {
            file: fileName,
            fileType
        }
        let url = `${URL.baseUrl[process.env.NODE_ENV]}/${URL.fileDeleteFirebase}`
        url = string.substitute(url, payload)
        const response = await axios({
            method: 'post',
            url: url,
        })
        const data = pathOr({}, ['data', 'data'])(response)
    }
    catch (err) {
        console.log(err)
    }
}