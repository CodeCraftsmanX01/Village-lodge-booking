import store from './../store/store'
import * as actions from './../actions/actions'
import { storeDefaults } from './../constants/defaults'

const storeReseter = (options) => {

    options.forEach(option => {
        switch (option) {
            case 'availbilityData':
                store.dispatch(actions.updateAvailbilityData(storeDefaults.checkAvailbilityData))
                break
            case 'preRegistrationData':
                store.dispatch(actions.updatePreRegistrationOptions(storeDefaults.preRegistrationData))
                break
            case 'finalReservationData':
                store.dispatch(actions.updateFinalReservationData(storeDefaults.finalReservationData))
                break
            case 'formData':
                store.dispatch(actions.saveFormData(storeDefaults.formData))
                break
            case 'paymentData':
                store.dispatch(actions.getPaymentData(storeDefaults.paymentData))
                break
            case 'paymentStatus':
                store.dispatch(actions.updatePaymentStatus(storeDefaults.paymentStatus))
                break
            default:
                break
        }
    })
}

export default storeReseter