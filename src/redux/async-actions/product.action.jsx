import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT_BY_ID,
  FETCH_PRODUCT_BY_ID,
} from "./actionType"
import ProductServices from "../../services/product.services"
import { toast } from "react-toastify"

export const createProduct = (value, history) => {
  ProductServices.createProduct(value)
    .then((res) => {
      history.push('/products')
      toast.success(res.data.message)
    })
    .catch((err) => toast.error(err.response.data.message))
}
export const fetchProducts = () => {
  return (dispatch) => {
    ProductServices.fetchProducts()
      .then((res) => {
        dispatch(actFetchProducts(res.data))
      })
      .catch((err) => console.log)
  }
}
export const fetchProductById = (productId) => {
  return (dispatch) => {
    ProductServices.fetchProductById(productId)
      .then((res) => {
        dispatch(actFetchProductById(res.data))
      })
      .catch((err) => toast.error(err.response.data.message))
  }
}
export const deleteProductById = (productId) => {
  return (dispatch) => {
    ProductServices.deleteProductById(productId)
      .then((res) => {
        dispatch({ type: DELETE_PRODUCT_BY_ID, payload: productId })
        toast.info(res.data.message)
      })
      .catch((err) => toast.error(err.response.data.message))
  }
}
export const updateProductById = (productData, productId, history) => {
  ProductServices.updateProductById(productData, productId)
    .then((res) => {
      history.push("/products")
      console.log(res)
      toast.info(res.data.message)
    })
    .catch((err) => {
      toast.error(err.response.data.message)
    })
}
export const updateProductImage = (productImage, productId, history) => {
  ProductServices.updateImageProduct(productImage, productId)
    .then((res) => {
      history.push("/products")
      toast.info(res.data.message)
    })
    .catch((err) => {
      toast.error(err.response.data.message)
    })
}

export const actFetchProductById = (data) => {
  return {
    type: FETCH_PRODUCT_BY_ID,
    payload: data,
  }
}

export const actFetchProducts = (data) => {
  return {
    type: FETCH_PRODUCTS,
    payload: data,
  }
}


