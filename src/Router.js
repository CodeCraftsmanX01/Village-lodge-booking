import React, { useEffect } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './views/Home/Home'
import Register from './views/Register/Register'
import Form from './components/RegistrationForm/Form'
import PriorCheckout from './components/RegistrationForm/PriorCheckout'
import PaymentStatus from './components/RegistrationForm/PaymentStatus/PaymentStatus'
import container from './common/utils/container'
import { toast, Toaster } from 'react-hot-toast';
import { events } from './common/utils/IntersectionObserver/IntersectionObserver'
import ScrollToTop from './common/utils/ScrollToTop'
import AboutUs from './views/AboutUs/AboutUs'
import Brahmakamal from './views/Brahmakamal/Brahmakamal'
import { urlStoreSync } from './common/utils/urlStoreSync'
import PhotoGallery from './views/PhotoGallery/PhotoGallery'
import HoverableSideNav from './components/HoverableSideNav/HoverableSideNav'
import { hoverableSideNavConfig } from './common/constants/defaults'
import PrivacyPolicy from './views/PrivacyPolicy/PrivacyPolicy'
import CancellationPolicy from './views/CancellationPolicy/CancellationPolicy'
import TermsAndCondition from './views/TermsAndCondition/TermsAndCondition'
import ContactUs from './views/ContactUs/ContactUs'
import { getImages } from './common/actions/lodge.actions'

const Router = ({
  preRegistrationData,
  finalReservationData,
  history,
  location: { search },
  screenWidth,
}) => {

  useEffect(() => {
    urlStoreSync(search)
  }, [search])

  history.listen((location, action) => {
    urlStoreSync(location['search'])
    toast.dismiss()
  })

  useEffect(() => events())

  return (
    <div className="App">
      <ScrollToTop />
      <Switch>
        <Route path="/" exact render={() => <Brahmakamal />} />
        <Route path={`/home`} exact render={() => <Home />} />
        <Route path={`/register`} exact component={Register} />
        <Route path={`/register/form`} exact render={() => Object.keys(preRegistrationData).length > 0 ?
          <Form /> : <Redirect to={`/register${search}`} />} />
        <Route path={`/register/finalbill`} exact render={() => Object.keys(preRegistrationData).length > 0 ?
          <PriorCheckout /> : <Redirect to={`/register${search}`} />} />
        <Route path={'/register/paymentStatus'} exact render={() => Object.keys(finalReservationData.data).length > 0 ?
          <PaymentStatus /> : <Redirect to={`/register${search}`} />} />
        <Route path={`/about`} excat render={() => <AboutUs />} />
        <Route path={`/gallery`} excat render={() => <PhotoGallery />} />
        <Route path={`/privacyPolicy`} excat render={() => <PrivacyPolicy />} />
        <Route path={`/cp`} excat render={() => <CancellationPolicy />} />
        <Route path={`/tc`} excat render={() => <TermsAndCondition />} />
        <Route path={`/contactUs`} excat render={() => <ContactUs />} />
      </Switch>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            width: '25rem'
          },
        }}
      />
      <HoverableSideNav
        config={hoverableSideNavConfig}
        screenWidth={screenWidth} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  appConfig: state.villageLodge.config,
  view: state.villageLodge.view,
  preRegistrationData: state.villageLodge.preRegistrationData,
  finalReservationData: state.villageLodge.finalReservationData,
  screenWidth: state.villageLodge.screenWidth
})
const mapDispatchToProps = {
  getImages: getImages
}

export default container(Router, mapStateToProps, mapDispatchToProps)
