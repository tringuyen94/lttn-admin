import React, { useState } from "react"
import { login } from "../../redux/async-actions/user.action"
import { TextField, Button } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux'
import './authentication.css'
const Authentication = () => {
  const [credentials, setCredentials] = useState()
  const history = useHistory()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }
  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(credentials, history))
  }
  return (
    <div className="authentication">
      <form onSubmit={handleLogin}
        className="loginform"
        autoComplete="off">
        <TextField
          className="input"
          variant="outlined"
          name="email"
          autoFocus={true}
          label="Email"
          fullWidth
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          type="password"
          className="input"
          variant="outlined"
          name="password"
          label="Password"
          fullWidth
          onChange={handleChange}
          required
        />
        <br />
        <Button variant="contained"
          fullWidth
          color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}

export default Authentication
