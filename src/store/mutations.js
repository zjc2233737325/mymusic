import { SET_FULL_SCREEN } from './mutations-type'

export default {
  /* changeFullScreen (state, flag) {
    state.isFullScreen = flag
  } */
  [SET_FULL_SCREEN] (state, flag) {
    state.isFullScreen = flag
  }
}
