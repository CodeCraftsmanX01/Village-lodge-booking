import React from 'react'
import container from '../../common/utils/container'
import Header from '../../components/Header/Header'
import './CancellationPolicy.scss'

const CancellationPolicy = ({
  appConfig = {},
  view,
}) => {
  const { backgroundImage, navigationItems, cancellationPolicy } = appConfig['brahmakamal']
  const { header, body } = cancellationPolicy
  return (
    <div className="cancellationPolicy pageLoad">
      <Header
        headerConfig={header}
        navigationItems={navigationItems}
        backgroundImage={backgroundImage} />
      <div className="cancellationPolicyBody">
        <div className="cancellationPolicyBodyInner sectionPadding">
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

export default container(CancellationPolicy, mapStateToProps)
