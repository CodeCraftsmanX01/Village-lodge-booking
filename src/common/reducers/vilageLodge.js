/* eslint-disable no-param-reassign */
import produce from 'immer'
import * as actionTypes from './../constants/actionTypes'
import config from './../../config/conifg'

const initialState = {
  imageUrls: {
    isError: false,
    data: {}
  },
  fullScreenLoader: false,
  screenWidth: window.innerWidth,
  config: config,
  view: 'brahmakamal',
  preRegistrationData: {},
  checkAvailbilityData: {},
  finalReservationData: {
    isLoading: false,
    isError: false,
    data: {}
  },
  formData: {},
  prices: {
    isLoading: false,
    isError: false,
    data: {}
  },
  paymentData: {},
  paymentStatus: null
}

const villageLodge = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.SET_FULL_SCREEN_LOADER:
        draft.fullScreenLoader = action.data
        break
      case actionTypes.SET_IMAGE_URLS:
        draft.imageUrls = action.data
        break
      case actionTypes.SET_SCREEN_WIDTH:
        draft.screenWidth = action.data
        break
      case actionTypes.FETCH_VILLAGE_LODGE_CONFIG:
        draft.config = action.data
        break
      case actionTypes.SET_VIEW:
        draft.view = action.data
        break
      case actionTypes.SET_PRE_REGISTRATION_OPTIONS:
        draft.preRegistrationData = action.data
        break
      case actionTypes.GET_AVAILBILITY_DATA:
        draft.checkAvailbilityData = action.data
        break
      case actionTypes.GET_FINAL_RESERVATION_DATA:
        draft.finalReservationData = action.data
        break
      case actionTypes.SAVE_FORM_DATA:
        draft.formData = action.data
        break
      case actionTypes.SET_PRICES:
        draft.prices = action.data
        break
      case actionTypes.GET_PAYMENT_DATA:
        draft.paymentData = action.data
        break
      case actionTypes.UPDATE_PAYMENT_STATUS:
        draft.paymentStatus = action.data
        break
      default:
        break
    }
  })

export default villageLodge
