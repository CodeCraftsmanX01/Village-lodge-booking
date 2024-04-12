import React from 'react'
import Header from './../../components/Header/Header'
import Footer from './../../components/Footer/Footer'
import Body1 from './../../components/Body1/Body1'
import Body2 from './../../components/Body2/Body2'
import LocateUs from './../../components/LocateUs/LocateUs'
import './Home.scss'
import container from './../../common/utils/container'
import Amenities from '../../components/Amenities/Amenities'

const Home = ({
  appConfig = {},
  view,
  history,
  location: { search },
  screenWidth
}) => {
  const { home, navigationItems, backgroundImage, footer } = appConfig[view]
  const onButtonClick = () => {
    history.push(`/register${search}`)
  }
  return home ? (
    <div className="home pageLoad">
      <Header
        headerConfig={home?.header}
        buttonClickHandler={onButtonClick}
        navigationItems={navigationItems}
        backgroundImage={backgroundImage}
        view={view}
      />
      <Body1
        config={home?.body1}
        history={history}
        search={search}
      />
      <Amenities
        amenities={home?.amenities}
      />
      <Body2
        config={home?.body2}
        screenWidth={screenWidth}
      />
      <LocateUs
        config={home?.locateUs}
        screenWidth={screenWidth}
      />
      <Footer
        config={footer}
        history={history}
      />
    </div>
  ) : null
}

const mapStateToProps = (state) => ({
  appConfig: state.villageLodge.config,
  view: state.villageLodge.view,
  screenWidth: state.villageLodge.screenWidth
})

export default container(Home, mapStateToProps)
