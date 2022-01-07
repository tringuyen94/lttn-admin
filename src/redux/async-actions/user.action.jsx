import { LOGIN, LOGOUT } from "./actionType"
import UserService from "../../services/user.services"
import { toast } from "react-toastify"

export const login = (credentials, history) => {
  return (dispatch) => {
    UserService.login(credentials)
      .then((res) => {
        dispatch({ type: LOGIN, payload: res.data.jwt })
        history.push('/admin')
        toast.success(res.data.message)
      })
      .catch((err) => toast.error(err.response.data.message))
  }
}

export const logOut = (history) => {
  console.log('log out here')
  return (dispatch) => {
    dispatch({ type: LOGOUT })
    history.push('/login')
    toast.info('Đã đăng xuất khỏi hệ thống')
  }
}