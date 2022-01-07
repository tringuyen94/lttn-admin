import {
  FETCH_CATEGORIES,
  ADD_CATEGORY,
} from "./actionType"
import CategoryServices from "../../services/category.services"
import { toast } from "react-toastify"

export const fetchCategories = () => {
  return (dispatch) => {
    CategoryServices.fetchCategories()
      .then((res) => {
        dispatch(actFetchCategories(res.data))
      })
      .catch((err) => console.log)
  }
}
export const addCategory = (value) => {
  return (dispatch) => {
    CategoryServices.addCategory(value)
      .then((res) => {
        dispatch({ type: ADD_CATEGORY, payload: { nameCategory: value } })
        toast.success(res.data.message)
      })
      .catch((err) => toast.error(err.response.data.message))
  }
}

export const updateCategoryById = (value, categoryId,history) => {
  return dispatch => {
    CategoryServices.updateCategoryById(value, categoryId)
      .then((res) => {
        history.go(0)
        toast.success(res.data.message)
      })
      // .catch((err) => toast.error(err.response.data.message))
  }
}

export const actFetchCategories = (data) => {
  return {
    type: FETCH_CATEGORIES,
    payload: data,
  }
}
