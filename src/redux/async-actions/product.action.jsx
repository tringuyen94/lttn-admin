import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT_BY_ID,
  FETCH_PRODUCT_BY_ID,
  LOADING_PRODUCTS,
  UPDATE_PRODUCT_BY_ID,
} from "./actionType"
import ProductServices from "../../services/product.services"
import { toast } from "react-toastify"

export const createProduct = (value, history) => {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCTS })
    ProductServices.createProduct(value)
      .then((res) => {
        history.push('/products')
        toast.success(res.data.message)
      })
      .catch((err) => toast.error(err.response.data.message))
  }

}
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS })
    ProductServices.fetchProducts()
      .then((res) => {
        dispatch({ type: FETCH_PRODUCTS, payload: res.data })
      })
      .catch((err) => toast.error(err.response.data.message))
  }
}


export const fetchProductById = (productId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS })
    ProductServices.fetchProductById(productId)
      .then((res) => dispatch({ type: FETCH_PRODUCT_BY_ID, payload: res.data }))
      .catch((err) => toast.error(err.response.data.message))
  }
}
export const deleteProductById = (productId) => {
  return (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS })
    ProductServices.deleteProductById(productId)
      .then((res) => {
        dispatch({ type: DELETE_PRODUCT_BY_ID, payload: productId })
        toast.info(res.data.message)
      })
      .catch((err) => toast.error(err.response.data.message))
  }
}
export const updateProductById = (productData, productId) => {
  ProductServices.updateProductById(productData, productId)
    .then((res) => toast.info(res.data.message))
    .catch((err) => toast.error(err.response.data.message))

}



