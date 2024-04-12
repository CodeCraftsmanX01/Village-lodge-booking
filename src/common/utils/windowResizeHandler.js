import * as actionsDispatcher from "../actions/actions"
import store from '../store/store'

export const windowResizeHandler = () => {
    const { screenWidth } = store.getState().villageLodge
    if (screenWidth !== window.innerWidth) {
        store.dispatch(actionsDispatcher.updateScreenWidth(window.innerWidth))
    }

}
