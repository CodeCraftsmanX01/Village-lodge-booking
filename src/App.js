import React, { useEffect } from 'react'
import container from './common/utils/container'
import { windowResizeHandler } from './common/utils/windowResizeHandler'
import { getImages } from './common/actions/lodge.actions'
import Router from './Router'
import Backdrop from './components/UI/BackDrop/BackDrop'
import './app.scss'
import Error from './components/Error/Error'
import { BrowserRouter } from "react-router-dom"
import { connect } from 'react-redux'

const App = ({
    getImages,
    fullScreenLoader,
    imageUrls
}) => {
    useEffect(() => {
        window.addEventListener("resize", windowResizeHandler)
        getImages()
        return () => window.removeEventListener("resize", windowResizeHandler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className='app'>
        <Backdrop
            show={fullScreenLoader}
            showSpinner
            spinnerText='Brahma Kamal' />
        {
            imageUrls.isError ?
                <div className='app'>
                    <Error />
                </div> :
                <div className="App">
                    <BrowserRouter basename={'brahmakamal'}>
                        <Router />
                    </BrowserRouter>
                </div>
        }
    </div>
}

const mapStateToProps = (state) => ({
    fullScreenLoader: state.villageLodge.fullScreenLoader,
    imageUrls: state.villageLodge.imageUrls
})
const mapDispatchToProps = {
    getImages: getImages
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
