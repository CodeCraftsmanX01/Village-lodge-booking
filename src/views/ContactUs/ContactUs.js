import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import AboutUsComp from '../../components/AboutUsComp/AboutUsComp'
import Feedback from '../../components/Feedback/Feedback'
import container from '../../common/utils/container'
import './ContactUs.scss'

const ContactUs = ({
  appConfig = {},
  view,
}) => {
  const { contactUs, backgroundImage, navigationItems, footer } = appConfig['brahmakamal']
  return (
    <div className="contactUsMain pageLoad">
      <Header
        headerConfig={contactUs.header}
        navigationItems={navigationItems}
        backgroundImage={backgroundImage} />
      <div className="aboutUsBody">
        <AboutUsComp />
        <Feedback />
      </div>
      <Footer
        config={footer} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  appConfig: state.villageLodge.config,
  view: state.villageLodge.view
})

export default container(ContactUs, mapStateToProps)
