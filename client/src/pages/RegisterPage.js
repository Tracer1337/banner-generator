import React from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { TextField, Container, Button } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useForm } from "react-hook-form"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"

import { emailRegex } from "../utils"
import { register as APIRegister } from "../config/api.js"
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

function RegisterPage() {
    const dispatch = useDispatch()
    
    const history = useHistory()

    const classes = useStyles()

    const { register, handleSubmit, errors, setError, watch } = useForm()

    const onSubmit = (values) => {
        APIRegister(values)
            .then(res => {
                dispatch(login(res.data))
                history.push("/")
            })
            .catch(error => {
                if (error.response.status === 409) {
                    setError("register", {
                        type: "register",
                        message: "This email address is taken"
                    })
                } else {
                    setError("register", {
                        type: "register",
                        message: "Registration failed"
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
                        inputRef={register({
                            required: true,
                            pattern: {
                                value: emailRegex,
                                message: "Invalid email address"
                            }
                        })}
                        error={"email" in errors}
                        helperText={errors["email"]?.message}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        className={classes.input}
                        inputRef={register({
                            required: true,
                            minLength: {
                                value: 8,
                                message: "You need at least 8 characters"
                            }
                        })}
                        error={"password" in errors}
                        helperText={errors["password"]?.message}
                    />

                    <TextField
                        name="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        className={classes.input}
                        inputRef={register({
                            required: true,
                            pattern: {
                                value: new RegExp(watch("password")),
                                message: "The passwords to not match"
                            }
                        })}
                        error={"password_confirmation" in errors}
                        helperText={errors["password_confirmation"]?.message}
                    />

                    {errors.register && (
                        <Alert severity="error" className={classes.alert}>{errors.register.message}</Alert>
                    )}

                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                    >Register</Button>
                </form>
            </Container>
        </Layout>
    )
}

export default RegisterPage