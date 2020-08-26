import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Menu as MuiMenu, MenuItem } from "@material-ui/core"

import { logout } from "../../store/actions.js"

function Menu(props) {
    const dispatch = useDispatch()

    return (
        <MuiMenu {...props} >
            <Link to="/profile">
                <MenuItem>Profile</MenuItem>
            </Link>

            <Link to="/banners">
                <MenuItem>My Banners</MenuItem>
            </Link>

            <MenuItem onClick={() => dispatch(logout())}>
                Logout
            </MenuItem>
        </MuiMenu>
    )
}

export default Menu