import React from 'react'
import container from '../../common/utils/container'
import Header from '../../components/Header/Header'
import './PrivacyPolicy.scss'

const PrivacyPolicy = ({
  appConfig = {},
  view,
}) => {
  const { backgroundImage, navigationItems, privacyPolicy } = appConfig['brahmakamal']
  const { header, body } = privacyPolicy
  return (
    <div className="privacyPolicy pageLoad">
      <Header
        headerConfig={header}
        navigationItems={navigationItems}
        backgroundImage={backgroundImage} />
      <div className="privacyPolicyBody">
        <div className="privacyPolicyBodyInner sectionPadding">
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

export default container(PrivacyPolicy, mapStateToProps)
