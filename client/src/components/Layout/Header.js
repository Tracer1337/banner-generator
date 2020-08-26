import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppBar, Toolbar, Typography, IconButton, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AccountIcon from "@material-ui/icons/AccountCircle"

import Menu from "./Menu.js"

const useStyles = makeStyles(theme => ({
    brand: {
        flexGrow: 1
    }
}))

function Header() {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn)

    const classes = useStyles()

    const menuToggleButton = useRef()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleAccountClick = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" className={classes.brand}>
                    <Link to="/">
                        Banner Generator
                    </Link>
                </Typography>

                <div>
                    { !isLoggedIn ? (
                        <>
                            <Link to="/login">
                                <Button color="inherit">Login</Button>
                            </Link>

                            <Link to="/register">
                                <Button color="inherit">Register</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <IconButton
                                color="inherit"
                                onClick={handleAccountClick}
                                ref={menuToggleButton}
                            >
                                <AccountIcon/>
                            </IconButton>

                            <Menu
                                open={isMenuOpen}
                                anchorEl={menuToggleButton.current}
                                onClose={() => setIsMenuOpen(false)}
                            />
                        </>
                    ) }
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header