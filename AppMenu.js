import React, {useState, useContext} from 'react'
import { loginContext, menuContext, loginTextContext } from './GenContext'
import { UserForms } from './UserForms'
import {AppBar, Toolbar, IconButton, MenuItem, Menu, Button} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Login from './Login'
import cookies from 'js-cookies'

function AppMenu() {
    // const [menuvalue, setMenuvalue] = useState(0)
    //const {menuopt, setMenuopt} = (props)

    const [menuopt, setMenuopt] = useContext(menuContext)
    const [loginstatus, setLoginStatus] = useContext(loginContext)
    const [loginBtnText, setLoginBtnText] = useContext(loginTextContext)
    const [anchorE1, setAnchorE1] = useState(null)    
    const [submenu, setSubmenu] = useState(null);
    const open = Boolean(submenu);
   

    const handleMenuClick = (e) =>{
        if(loginstatus){
            //Report MenuItem value is 4
            if(e.target.value ===4){
                setSubmenu(e.currentTarget) 
            }
            setMenuopt(e.target.value)
            //alert(`Menu Item Clicked` + e.target.value)
        }else{
            alert("Please Login")
        }
    }

    const handleLoginClick =() =>{
        if(loginBtnText === 'Logout'){
            //cookies.setItem('rememberme', 'no', {expires: 90})
            cookies.removeItem('rememberme')
            setLoginBtnText('Login')
            setLoginStatus(false)
        }
        setMenuopt(0)
    }

    const handleAdminClick = (e) =>{
		 if(!loginstatus){
			 alert('please login')
			 return 
		    }
         setAnchorE1(e.currentTarget)        
	}
    const handleRMOver = (event) =>{
        if(loginstatus){
            setSubmenu(event.currentTarget)
        }
        
    }
    const handleAdminClose = (e) => {
		setMenuopt(e.target.value);
		setAnchorE1(null);
	}

    const handleClose= ()=>{
        setSubmenu(null);
    }

    return (
        <div>
            <AppBar position='static'className='appbar'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                     <MenuIcon />
                    </IconButton>

                    <MenuItem onClick={handleAdminClick} value={2}>Admin</MenuItem>
                    <Menu
                            id= "menu-admin"
                            anchorEl={anchorE1}
                            keepMounted
                            open = {Boolean(anchorE1)}
                            onClose={handleAdminClose}>
                            <MenuItem value={211} onClick={handleAdminClose}>Course Mgmt</MenuItem>
                            <MenuItem value={212} onClick={handleAdminClose}>Session Mgmt</MenuItem>
                    </Menu>
                    <MenuItem onClick={handleMenuClick} value={3}>Courses</MenuItem>
                    <MenuItem 
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleMenuClick}
                        value={4}
                        // onMouseOver={handleRMOver}
                    >Reports
                    </MenuItem>
                    <Menu
                        anchorEl={submenu}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Report1</MenuItem>
                        <MenuItem onClick={handleClose}>Report2</MenuItem>
                        <MenuItem onClick={handleClose}>Report3</MenuItem>
                    </Menu>

                    <MenuItem onClick={handleMenuClick} value={21}>Profile</MenuItem>

                    {/* <MenuItem onClick={handleMenuClick} style={{marginLeft :'75%'}} value={5}>
                    {loginstatus ? 'Logout' : 'Login'}</MenuItem> */}

                    <Button color="inherit" style={{marginLeft: "auto", marginRight: -9}} onClick={handleLoginClick}>
                        {loginBtnText}</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default AppMenu
