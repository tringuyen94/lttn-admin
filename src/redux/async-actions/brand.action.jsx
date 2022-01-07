import {
  FETCH_BRANDS,
  ADD_BRAND,
} from "./actionType"
import BrandServices from "../../services/brand.services"
import { toast } from "react-toastify"

export const fetchBrands = () => {
  return (dispatch) => {
    BrandServices.fetchBrands()
      .then((res) => {
        dispatch(actFetchBrands(res.data))
      })
      .catch((err) => console.log)
  }
}
export const addBrand = (value) => {
  return (dispatch) => {
    BrandServices.addBrand(value)
      .then((res) => {
        dispatch({ type: ADD_BRAND, payload: res.data.brand })
        toast.success(res.data.message)
      })
      .catch((err) => toast.error(err.response.data.message))
  }
}

export const updateBrandById = (value, brandId, history) => {
  BrandServices.updateBrandById(value, brandId)
    .then((res) => {
      history.go(0)
      toast.success(res.data.message)
    })
    .catch((err) => toast.error(err.response.data.message))
}


export const actFetchBrands = (data) => {
  return {
    type: FETCH_BRANDS,
    payload: data,
  }
}

