import { decodeURL } from './URLParser'
import * as actionsDispatcher from "../actions/actions"
//import { equals } from 'ramda'
import store from './../store/store'

export const urlStoreSync = (search) => {
    const queryObject = decodeURL(search)
    const { view } = store.getState().villageLodge
    const { viewLocation } = queryObject


    if (viewLocation && viewLocation !== view) {
        store.dispatch(actionsDispatcher.updateView(viewLocation))
    }

}
