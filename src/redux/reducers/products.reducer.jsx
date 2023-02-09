import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT_BY_ID,
  FETCH_PRODUCT_BY_ID,
  LOADING_PRODUCTS,
  UPDATE_PRODUCT_BY_ID,
  CREATE_PRODUCT
} from "../async-actions/actionType"

let initialState = {
  products: null,
  productById: null,
  loading: false
}
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return { ...state, loading: true }
    case FETCH_PRODUCTS:
      state.products = action.payload
      return { ...state, loading: false }
    case FETCH_PRODUCT_BY_ID:
      state.productById = action.payload
      return { ...state, loading: false }
    case CREATE_PRODUCT:
      return { ...state, loading: false }
    case UPDATE_PRODUCT_BY_ID:
      return { ...state, loading: false }
    case DELETE_PRODUCT_BY_ID:
      let deletedArr = state.products.filter((product) => product._id !== action.payload)
      return { ...state, products: deletedArr, loading: false }
    default:
      return state
  }
}

export default productReducer
