import { icons } from '../constants/defaults'
import { mainLogo } from './../../components/Images/logo'
import { updatePaymentStatus } from './../actions/actions'
import store from './../store/store'

export const parsecheckAvailbilityData = (incomingData) => {
    return {
        isAvailable: incomingData.data.isAvailable,
        roomCost: incomingData.data.roomCost,
        message: incomingData.message,
        costBreakdown: incomingData.data.costBreakdown
    }
}

export const parsePriceData = (incomingData) => {
    let newData = {}
    Object.keys(incomingData).forEach(priceCategory => {
        let prices = {}
        incomingData[priceCategory].forEach(priceItem =>
            prices[priceItem.name] = priceItem.price
        )
        newData[priceCategory] = prices
    })
    return newData
}

export const parsePaymentData = (incomingData, history, search, paymentStatus) => {
    const paymentObject = {
        //key: rzp_test_wHvfs6URpizs2I,
        amount: incomingData.applicationFee,
        currency: 'INR',
        name: incomingData.merchantName,
        description: 'The Village Lodge',
        image: mainLogo,
        order_id: incomingData.razorpayOrderId,
        handler: (response) => {
            console.log(response)
            store.dispatch(updatePaymentStatus('success'))
            paymentStatus(response)
            history.push('/register/paymentStatus' + search)
        },
        prefill: {
            name: incomingData.customerName,
            email: incomingData.customerEmail,
            contact: incomingData.customerContact
        },
        notes: {
            address: ''
        },
        theme: {
            color: '#b99365'
        }
    }
    return paymentObject

}

export const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getAmenities = (requiredAmenities) => {
    return icons.filter(icon => requiredAmenities.includes(icon.name))
}

export const getFileName = (files) => {
    const fileNames = []
    for (const file of files) {
        fileNames.push(file.name)
    }
    return fileNames
}