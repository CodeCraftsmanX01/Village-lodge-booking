import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import container from '../../common/utils/container'
import './PhotoGallery.scss'
import ImageGallery from '../../components/ImageGallery/ImageGallery'

const PhotoGallery = ({
  appConfig = {},
  view,
  screenWidth
}) => {
  const { gallery = {}, backgroundImage, navigationItems, footer } = appConfig[view]
  const { header = {}, images = {} } = gallery


  return gallery ? (
    <div className="photoGallery pageLoad">
      <Header
        headerConfig={header}
        navigationItems={navigationItems}
        backgroundImage={backgroundImage}
        view={view} />
      <div className="photoGalleryHome sectionPadding">
        <ImageGallery imageObject={images} />
      </div>
      <Footer config={footer} />
    </div>
  ) : null
}

const mapStateToProps = (state) => ({
  appConfig: state.villageLodge.config,
  view: state.villageLodge.view,
  screenWidth: state.villageLodge.screenWidth
})

export default container(PhotoGallery, mapStateToProps)
