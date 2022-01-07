import { LOGIN, LOGOUT } from "../async-actions/actionType"
import jwt from 'jsonwebtoken'

let initialState = {
  profile: {}
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      state.profile = jwt.verify(action.payload, 'LTTNElectric')
      localStorage.setItem('profile', JSON.stringify(state.profile))
      return { ...state }
    case LOGOUT:
      localStorage.clear()
      return state
    default:
      return state
  }
}
export default userReducer
