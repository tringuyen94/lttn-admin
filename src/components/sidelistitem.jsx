
import React from 'react'
import MuiListItem from "@material-ui/core/ListItem";
import {
   ListItemIcon, withStyles,
   ListItemText
} from '@material-ui/core'

const SideListItem = ({ tabSelected, setTabSelected, history, tabIndex, icon, route, label }) => {
   const ListItem = withStyles({
      root: {
         "&$selected": {
            backgroundColor: "#2980b9",
            color: "white",
            "& .MuiListItemIcon-root": {
               color: "white"
            }
         },
         "&$selected:hover": {
            backgroundColor: "#2980b9",
            color: "white",
            "& .MuiListItemIcon-root": {
               color: "white"
            }
         },
         "&:hover": {
            backgroundColor: "#95a5a6",
            color: "white",
            "& .MuiListItemIcon-root": {
               color: "white"
            }
         }
      },
      selected: {}
   })(MuiListItem)
   return (
      <ListItem
         button
         selected={tabSelected === tabIndex}
         onClick={() => {
            history.push(`${route}`)
            setTabSelected(tabIndex)
         }}>
         <ListItemIcon>{icon}</ListItemIcon>
         <ListItemText primary={label} />
      </ListItem>
   )
}
export default SideListItem