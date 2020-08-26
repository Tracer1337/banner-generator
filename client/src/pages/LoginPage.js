import React from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { TextField, Container, Button } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useForm } from "react-hook-form"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"

import { login as APILogin } from "../config/api.js"
import { login } from "../store/actions.js"

const useStyles = makeStyles(theme => ({
    input: {
        width: "100%",
        marginBottom: theme.spacing(1)
    },

    alert: {
        margin: `${theme.spacing(2)}px 0`
    }
}))

function LoginPage() {
    const dispatch = useDispatch()

    const history = useHistory()

    const classes = useStyles()

    const { register, handleSubmit, errors, setError } = useForm()

    const onSubmit = (values) => {
        APILogin(values)
            .then(res => {
                dispatch(login(res.data))
                history.push("/")
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setError("login", {
                        type: "login",
                        message: "E-Mail and password do not match"
                    })
                } else if (error.response.status === 404) {
                    setError("login", {
                        type: "login",
                        message: "User not found"
                    })
                } else {
                    setError("login", {
                        type: "login",
                        message: "Login failed"
                    })
                }
            })
    }

    return (
        <Layout spacingTop>
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        name="email"
                        label="E-Mail Address"
                        className={classes.input}
                        inputRef={register({ required: true })}
                        error={"email" in errors}
                        helperText={errors["email"]?.message}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        className={classes.input}
                        inputRef={register({ required: true })}
                        error={"password" in errors}
                        helperText={errors["password"]?.message}
                    />

                    {errors.login && (
                        <Alert severity="error" className={classes.alert}>{errors.login.message}</Alert>
                    )}

                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                    >Login</Button>
                </form>
            </Container>
        </Layout>
    )
}

export default LoginPage