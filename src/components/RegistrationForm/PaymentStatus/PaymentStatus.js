import React, { useEffect, useState, useRef } from 'react'
import NavigationPanel from '../../NavigationPanel/NavigationPanel'
import container from '../../../common/utils/container'
import { paymentStatusIcon } from '../../../common/constants/defaults'
import './style.scss'
import { backgroundImageRenderer } from '../../../common/styles'
import Bill from '../Bill/Bill'
import ReactToPrint from 'react-to-print'
import Button from './../../UI/Button/Button'
import { displayRazorpay } from './../../Payment/Payment'
import { Success, Failed } from '../../../common/icons'
import { updatePreRegistrationOptions } from './../../../common/actions/actions'

const PaymentStatus = ({
    paymentStatus,
    config,
    view,
    finalReservationData,
    prices,
    paymentData,
    history,
    updatePreRegistrationOptions
}) => {

    const icons = {
        success: <Success style={{ width: '200px', height: '200px' }} />,
        failure: <Failed style={{ width: '200px', height: '200px' }} />
    }
    const { backgroundImage, navigationItems } = config[view]

    const [backgroundStyle, setBackgroundStyle] = useState({ minHeight: '100vh' })
    const [userData, setUserData] = useState({})
    const [paymentStatusBoolean, setPaymentStatusBoolean] = useState()

    const componentRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            setBackgroundStyle({
                ...backgroundStyle,
                ...backgroundImageRenderer(backgroundImage, true)
            })
            setUserData(finalReservationData.data)
        }, 2000)
        updatePreRegistrationOptions({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setPaymentStatusBoolean(paymentStatus === 'success' ? true : false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentStatus])

    return (
        <div className=' commonBackground'
            style={backgroundStyle}>
            <NavigationPanel
                items={navigationItems}
                view={view} />
            <div className='paymentStatus'>
                <div className={`paymentStatus-icon ${paymentStatusBoolean ? 'iconSmallBigTooSmall' : 'iconSmallBigSmall'}`}
                    style={paymentStatusBoolean ? { marginTop: '-5rem' } : { marginTop: '5rem' }}>
                    <span >
                        {icons[paymentStatusIcon[paymentStatus].icon]}
                    </span>
                    <h1 className='secondaryHeading itemVisible'>{paymentStatusIcon[paymentStatus].text} </h1>
                    {
                        paymentStatusBoolean ?
                            <ReactToPrint
                                trigger={() => <button className='btn btn-brown btn-enabled itemVisible'>Print this out!</button>}
                                content={() => componentRef.current}
                                bodyClass={'registrationForm formTable'}
                                copyStyles={true}
                                documentTitle={'Invoice'}
                            /> :
                            <Button
                                onClickEvent={() => displayRazorpay(paymentData, history)}>
                                Retry Payment
                            </Button>
                    }

                </div>
                {paymentStatusBoolean && <div className='invoiceDiv'>
                    <Bill
                        data={userData}
                        priceData={prices.data}
                        componentRef={componentRef}
                        renderedFrom={'payment'}
                    />
                </div>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    config: state.villageLodge.config,
    view: state.villageLodge.view,
    paymentStatus: state.villageLodge.paymentStatus,
    finalReservationData: state.villageLodge.finalReservationData,
    prices: state.villageLodge.prices,
    paymentData: state.villageLodge.paymentData
})

const mapDispatchToProps = {
    updatePreRegistrationOptions
}

export default container(PaymentStatus, mapStateToProps, mapDispatchToProps)