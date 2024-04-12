import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import container from './../../common/utils/container'
import './AboutUs.scss'

const AboutUs = ({
  appConfig = {},
  view,
}) => {
  const { about, backgroundImage, navigationItems, footer } = appConfig['brahmakamal']
  return (
    <div className="aboutUs pageLoad">
      <Header
        headerConfig={about.header}
        navigationItems={navigationItems}
        backgroundImage={backgroundImage} />
      <div className="aboutUsHome sectionPadding">
        {
          about?.bodyText.map((text, index, arr) => {
            if (index === 0 || index === (arr.length - 1))
              return <p>{text}</p>
            else {
              if (index % 2 === 0) {
                return (
                  <div className='aboutInfo'>
                    <div className="left leftSide">
                      <p>{text}</p>
                    </div>
                    <div className="right composition">
                      <img key={index} loading="lazy" src={about?.images?.[`about${index}`]} alt={`about${index}`} className={`_singleImageComposition`} />
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className='aboutInfo'>
                    <div className="right composition">
                      <img key={index} loading="lazy" src={about?.images?.[`about${index}`]} alt={`about${index}`} className={`_singleImageComposition`} />
                    </div>
                    <div className="left leftSide">
                      <p>{text}</p>
                    </div>
                  </div>
                )
              }
            }
          })
        }
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

export default container(AboutUs, mapStateToProps)
