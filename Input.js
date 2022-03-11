import React from 'react'
import {TextField} from '@material-ui/core'
import './Input.css'
function Input(props) {
    const {name, label, value, OnChange,error=null,outline, ...other} = props

    return (
       <TextField className="input"
           name  = {name}
           label = {label}
           value = {value}
           onChange = {OnChange}
           variant = "outlined"
           {...other}
           {...(error && {error:true,helperText:error})}
       />
    )
}

export default Input
