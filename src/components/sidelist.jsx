import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import { makeStyles } from "@material-ui/core"
import HomeRoundedIcon from "@material-ui/icons/HomeRounded"
import ComputerRoundedIcon from "@material-ui/icons/ComputerRounded"
import AppsRoundedIcon from "@material-ui/icons/AppsRounded"
import BlurOnIcon from "@material-ui/icons/BlurOn"
import Chat from "@material-ui/icons/Chat"
const useStyles = makeStyles({
  icon: {
    position: "relative",
    top: "4px",
    fontSize: "25px",
    marginRight: "10px",
    transition: "ease .5s",
  },
})
const SideList = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <ul className="sidebar-menu">
        <li>
          <a href="/" className="sidebar-links">
            <HomeRoundedIcon className={classes.icon} /> Home
          </a>
        </li>
        <li>
          <a href="/products" className="sidebar-links">
            <ComputerRoundedIcon className={classes.icon} />
            Sản phẩm
          </a>
        </li>
        <li>
          <a href="/categories" className="sidebar-links">
            <AppsRoundedIcon className={classes.icon} />
            Loại sản phẩm
          </a>
        </li>
        <li>
          <a href="/brands" className="sidebar-links">
            <BlurOnIcon className={classes.icon} />
            Nhãn hàng
          </a>
        </li>
        <li>
          <a href="/chat" className="sidebar-links">
            <Chat className={classes.icon} />
            Chat
          </a>
        </li>
      </ul>
    </Fragment>
  )
}

export default SideList
