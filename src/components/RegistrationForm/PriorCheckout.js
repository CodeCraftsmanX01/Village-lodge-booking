import React, { useState } from 'react'
import './RegistrationForm.scss'
import container from '../../common/utils/container'
import * as actions from '../../common/actions/lodge.actions'
import NavigationPanel from '../NavigationPanel/NavigationPanel'
import { backgroundImageRenderer } from '../../common/styles'
import DialogComp from '../DialogComp/DialogComp'
import { PaymentInfo } from '../DialogInfo/DialogInfo'
import Bill from './Bill/Bill'
import Error from './../Error/Error'
import Spinner from './../UI/Spinner/Spinner'

const PriorCheckout = ({
    finalReservationData,
    prices,
    makePayment,
    config,
    view,
    history,
    location: { search }
}) => {
    const { backgroundImage, navigationItems } = config[view]
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onClickButton = () => {
        setIsLoading(true)
        makePayment(finalReservationData.data, history, search, setIsLoading)
    }
    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }
    return (
        <div style={backgroundImageRenderer(backgroundImage, true)}
            className='commonBackground'>
            <NavigationPanel
                items={navigationItems}
                view={view} />
            <div className='registrationForm '>
                <div className='priorCheckoutDiv'>
                    {finalReservationData.isError ?
                        <Error /> :
                        finalReservationData.isLoading ?
                            <div className="spinner">
                                <Spinner color={'#fff'} fontSize={'10.75rem'} />
                            </div> :
                            <Bill
                                data={finalReservationData.data}
                                priceData={prices?.data?.otherPrices}
                                onClickHandler={onClickButton}
                                setIsDialogOpen={setIsDialogOpen}
                                isButtonLoading={isLoading}
                            />
                    }
                </div>
                <DialogComp
                    isOpen={isDialogOpen}
                    handleClose={handleDialogClose}
                    heading='This is how final amount is calculated'
                    body={PaymentInfo()}
                    buttonName={"OK"}
                />
            </div>
        </div >
    )
}

const mapStateToProps = (state) => ({
    finalReservationData: state.villageLodge.finalReservationData,
    prices: state.villageLodge.prices,
    config: state.villageLodge.config,
    view: state.villageLodge.view
})

const mapDispatchToProps = {
    makePayment: actions.makePayment
}

export default container(PriorCheckout, mapStateToProps, mapDispatchToProps)
