import React from 'react'
import {Button as MuiButton} from '@material-ui/core'
function Button(props) {
    const {text, size, color, onClick, outline, ...other} = props
    return (
        <MuiButton
            variant = {outline || 'contained'}
            size = {size || 'large'}
            color = {color || 'primary'}
            onClick= {onClick}
            {...other}
     
        >
        {text}
        </MuiButton>
    )
}

export default Button
