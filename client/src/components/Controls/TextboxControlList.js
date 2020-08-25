import React, { useContext } from "react"
import { Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { WorkspaceContext } from "../Workspace.js"
import TextboxControls from "./TextboxControls"

const useStyles = makeStyles(theme => ({
    divider: {
        margin: `${theme.spacing(2)}px 0`
    }
}))

function TextboxControlList() {
    const context = useContext(WorkspaceContext)

    const classes = useStyles()

    return context.model.textboxes.map((textbox, i) => (
        <React.Fragment key={textbox.key}>
            <TextboxControls textbox={textbox}/>

            { i !== context.model.textboxes.length - 1 && (
                <Divider className={classes.divider}/>
            ) }
        </React.Fragment>
    ))
}

export default TextboxControlList