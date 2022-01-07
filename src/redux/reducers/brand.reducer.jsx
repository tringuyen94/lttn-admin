import {
  FETCH_BRANDS,
  ADD_BRAND,
} from "../async-actions/actionType"

let initialState = {
  brands: null,
}
const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      return { ...state, brands: action.payload }
    case ADD_BRAND:
      let temp = [...state.brands, action.payload]
      return { ...state, brands: temp }
    default:
      return state
  }
}
export default brandReducer
