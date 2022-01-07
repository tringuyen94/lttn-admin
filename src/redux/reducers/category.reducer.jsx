import {
  FETCH_CATEGORIES,
  ADD_CATEGORY,
} from "../async-actions/actionType"

let initialState = {
  categories: null,
}
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      state.categories = action.payload
      return { ...state }
    case ADD_CATEGORY:
      let resultArr = [...state.categories, action.payload]
      return { ...state, categories: resultArr }
    default:
      return state
  }
}
export default categoryReducer
