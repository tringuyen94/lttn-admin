import React, { useEffect, useState } from "react"
import {
  List,
} from "@material-ui/core"
import {
  HomeRounded, ComputerRounded, AppsRounded,
  BlurOn, Add, PostAdd, VideoCall
} from "@material-ui/icons"
import './sidelist.css'
import { useHistory, useLocation } from "react-router"
import SideListItem from "./sidelistitem";


const data = [
  { route: "/admin", tabIndex: 0, icon: <HomeRounded />, label: "Home" },
  { route: "/products", tabIndex: 1, icon: <ComputerRounded />, label: "Sản phẩm" },
  { route: "/products/add-product", tabIndex: 2, icon: <Add />, label: "Thêm sản phẩm" },
  { route: "/projects", tabIndex: 3, icon: <AppsRounded />, label: "Dự án" },
  { route: "/projects/add-project", tabIndex: 4, icon: <PostAdd />, label: "Thêm dự án" },
  { route: "/categories", tabIndex: 5, icon: <AppsRounded />, label: "Loại sản phẩm" },
  { route: "/brands", tabIndex: 6, icon: <BlurOn />, label: "Nhãn hàng" },
  { route: "/video", tabIndex: 7, icon: <VideoCall />, label: "Video" },

]
const SideList = () => {

  const history = useHistory()
  const [tabSelected, setTabSelected] = useState(0)
  const location = useLocation()
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTabSelected(0)
        break;
      case '/admin':
        setTabSelected(0)
        break;
      case '/products':
        setTabSelected(1)
        break;
      case '/products/add-product':
        setTabSelected(2)
        break;
      case '/projects':
        setTabSelected(3)
        break;
      case '/projects/add-project':
        setTabSelected(4)
        break;
      case '/categories':
        setTabSelected(5)
        break;
      case '/brands':
        setTabSelected(6)
        break;
      case '/video':
        setTabSelected(7)
        break;
      default:
        break;
    }
  }, [location.pathname])


  return (
    <List component="nav" className="sidelist">
      {data.map((item, index) => <SideListItem
        key={index}
        history={history}
        route={item.route}
        tabSelected={tabSelected}
        setTabSelected={setTabSelected}
        tabIndex={item.tabIndex}
        icon={item.icon}
        label={item.label}
      />)}
    </List>
  )
}

export default SideList
