import React from 'react'
import container from '../../common/utils/container'
import Header from '../../components/Header/Header'
import './TermsAndCondition.scss'

const TermsAndCondition = ({
  appConfig = {},
  view,
}) => {
  const { backgroundImage, navigationItems, termsAndConditions } = appConfig['brahmakamal']
  const { header, body } = termsAndConditions
  return (
    <div className="tAndC pageLoad9">
      <Header
        headerConfig={header}
        navigationItems={navigationItems}
        backgroundImage={backgroundImage} />
      <div className='checkoutTime'>
        <p className='secondaryHeading'>CHECK-IN & CHECK-OUT POLICY</p>
        <span className='idAndDate'>
          <span className='textCenter'>
            <p className='headingBolder'>Check-in</p>
            <p>Time: 1400hrs</p>
          </span>
          <span className='textCenter'>
            <p className='headingBolder'>Check-out</p>
            <p>Time: 1200 hrs</p>
          </span>
        </span>
      </div>
      <div className="tAndCBody">
        <div className="tAndCBodyInner sectionPadding">
          {body}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  appConfig: state.villageLodge.config,
  view: state.villageLodge.view
})

export default container(TermsAndCondition, mapStateToProps)
