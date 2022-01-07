import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT_BY_ID,
  FETCH_PRODUCT_BY_ID,
} from "../async-actions/actionType"

let initialState = {
  products: null,
  productById: null,
}
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      state.products = action.payload
      return { ...state }
    case FETCH_PRODUCT_BY_ID:
      state.productById = action.payload
      return { ...state }
    case DELETE_PRODUCT_BY_ID:
      let deletedArr = state.products.filter((product) => product._id !== action.payload)
      return { ...state, products: deletedArr }
    default:
      return state
  }
}

export default productReducer
