import React from "react"
import { Button } from "@material-ui/core"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { useHistory } from "react-router-dom"
import { logOut } from "../redux/async-actions/user.action"
import { useDispatch } from "react-redux"
import './navbar.css'

const Navbar = () => {
  const history = useHistory()
  const dispatch = useDispatch()


  return (
    <div className="navbar">
      <h1 className='admin-navivation' onClick={() => history.push('/admin')}>admin</h1>
      <Button
        onClick={() => dispatch(logOut(history))}
        variant="outlined"
        endIcon={<ExitToAppIcon />}
      >
        Đăng xuất
      </Button>
    </div>

  )
}

export default Navbar
