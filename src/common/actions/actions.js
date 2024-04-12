import * as actionTypes from '../constants/actionTypes'

export const setImageUrls = (result) => {
    return {
        type: actionTypes.SET_IMAGE_URLS,
        data: result
    }
}
export const setFullScreenLoader = (result) => {
    return {
        type: actionTypes.SET_FULL_SCREEN_LOADER,
        data: result
    }
}
export const updateScreenWidth = (result) => {
    return {
        type: actionTypes.SET_SCREEN_WIDTH,
        data: result
    }
}
export const updateConfig = (result) => {
    return {
        type: actionTypes.FETCH_VILLAGE_LODGE_CONFIG,
        data: result
    }
}
export const updateView = (result) => {
    return {
        type: actionTypes.SET_VIEW,
        data: result
    }
}
export const updatePreRegistrationOptions = (result) => {
    return {
        type: actionTypes.SET_PRE_REGISTRATION_OPTIONS,
        data: result
    }
}
export const updateAvailbilityData = (result) => {
    return {
        type: actionTypes.GET_AVAILBILITY_DATA,
        data: result
    }
}
export const updateFinalReservationData = (result) => {
    return {
        type: actionTypes.GET_FINAL_RESERVATION_DATA,
        data: result
    }
}
export const saveFormData = (result) => {
    return {
        type: actionTypes.SAVE_FORM_DATA,
        data: result
    }
}
export const updatePrices = (result) => {
    return {
        type: actionTypes.SET_PRICES,
        data: result
    }
}

export const getPaymentData = (result) => {
    return {
        type: actionTypes.GET_PAYMENT_DATA,
        data: result
    }
}

export const updatePaymentStatus = (result) => {
    return {
        type: actionTypes.UPDATE_PAYMENT_STATUS,
        data: result
    }
}