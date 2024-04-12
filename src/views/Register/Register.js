import React, { useEffect } from 'react'
import Header from './../../components/Header/Header'
import Footer from './../../components/Footer/Footer'
import CheckAvailbility from './../../components/Registration/CheckAvailability/CheckAvailbility'
import container from './../../common/utils/container'
import * as actions from './../../common/actions/actions'
import * as lodgeActions from './../../common/actions/lodge.actions'
import './Register.scss'
import Spinner from './../../components/UI/Spinner/Spinner'
import Error from './../../components/Error/Error'
import storeReseter from './../../common/utils/storeReseter'
import Notice from '../../components/Registration/Notice/Notice'

const Register = ({
  appConfig = {},
  view,
  updatePrices,
  getPrices,
  prices,
}) => {
  const { registration, backgroundImage, navigationItems, footer } = appConfig[view]
  //eslint-disable-next-line no-unused-vars 
  const registrationComponent = (
    <div className="registration">
      <Notice prices={prices} />
      <CheckAvailbility />
    </div>
  )

  useEffect(() => {
    updatePrices({ ...prices, isLoading: true })
    storeReseter(['availbilityData', 'preRegistrationData', 'finalReservationData', 'formData', 'paymentData', 'paymentStatus'])
    getPrices(view)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view])

  return registration ? (
    <div className="register pageLoad">
      <Header headerConfig={registration['header']}
        navigationItems={navigationItems}
        backgroundImage={backgroundImage}
        view={view} />
      {prices.isError ?
        <Error /> :
        prices.isLoading ?
          <div className="spinner">
            <Spinner color={'#b99365'} fontSize={'10.75rem'} />
          </div> : registrationComponent

      }
      <Footer config={footer} />
    </div>
  ) : null
}

const mapStateToProps = (state) => ({
  appConfig: state.villageLodge.config,
  view: state.villageLodge.view,
  prices: state.villageLodge.prices
})
const mapDispatchToProps = {
  updatePrices: actions.updatePrices,
  getPrices: lodgeActions.getPrices
}

export default container(Register, mapStateToProps, mapDispatchToProps)
