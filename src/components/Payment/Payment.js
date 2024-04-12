
import createNotification from './../../components/Notifications/Notifications'
import { updatePaymentStatus } from './../../common/actions/actions'
import store from './../../common/store/store'


const scriptLoader = (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        document.body.appendChild(script)
        script.onload = () => resolve(true)
        script.onerror = () => reject(false)
    })
}

export const displayRazorpay = (options, history, search) => {
    const response = scriptLoader("https://checkout.razorpay.com/v1/checkout.js")
    response
        .then((result) => {
            const updatedOptions = { ...options }
            updatedOptions['key'] = 'rzp_test_k08DuKmtfYwikG'
            let razorpayObject = new window.Razorpay(updatedOptions)
            razorpayObject.on('payment.failed', function (response) {
                console.log(response)
                razorpayObject.close()
                document.querySelector('.razorpay-container').remove()
                store.dispatch(updatePaymentStatus('failure'))
                history.push('/register/paymentStatus' + search)
            })
            razorpayObject.open()
        })
        .catch((error) => {
            createNotification('error', error)
        })


}