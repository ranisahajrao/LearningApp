import React, {useState, useContext, useEffect} from 'react'
//import {Grid, makeStyles, Paper, makeStyle} from '@material-ui/core'
//import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import {loginContext, loginTextContext, menuContext} from './GenContext'
import Controls from './Controls'
import {Link, Grid, Paper, SvgIcon, makeStyles, Checkbox, FormGroup, FormControlLabel, Button} from '@material-ui/core'
import { UserForms } from './UserForms'
import { red, yellow } from '@material-ui/core/colors'
import axios from 'axios'
import cookies from 'js-cookies'
import './Login.css'
import profile from '../images/Profile.png'


const useStyle = makeStyles((theme) =>({
    mainClass: {
        margin:theme.spacing(5),
        height: theme.spacing(65),
        width:400,
        alignment:'center',
        flexDirection:'column',
        border : `3px solid primary`,
        borderRadius : 25 
          
    }
  }))

const initialValues = {
    userEmail : '',
    pwd : ''
}


function Login() {
    const classes = useStyle()
   /*  const [userEmail, setUserEmail] = useState('')
    const [pwd, setPwd] = useState('') */

    const [loginstatus, setLoginStatus] = useContext(loginContext) //Consuming data from context
    const [menuopt, setMenuopt] = useContext(menuContext)
    const [loginBtnText, setLoginBtnText] = useContext(loginTextContext)
    //const {menuopt, setMenuopt} = props

    const {values, setValues, handleInputChange} = UserForms(initialValues)
    const [rememberme, setRememberme] = useState(false)
    const [value, setValue] = useState('user');

    useEffect(()=>{
		async function chkRememberme() 
		{
			const rememberme=cookies.getItem('rememberme')	
			if(rememberme==='yes')
			{
				const token =cookies.getItem('token')
				if(token!=='')
				{
					alert("we remember you")
					setLoginStatus(true)
					setMenuopt(1)
                    setLoginBtnText('Logout')
				}
				else
				{
					alert("we don't roecognise you please login!")
				}
			}
		}
		chkRememberme()
	},[])
    

   const handleLogin = async (event) =>{
       //alert(`User: ${values.userEmail} and Password: ${values.pwd}`)
       /* if(userEmail === 'snehal@gmail.com' && pwd === '123'){
           sessionStorage.setItem('loginState', true)
       }
       else{
        sessionStorage.setItem('loginState', false)
       } */

       event.preventDefault()
       alert(values.userEmail)
       alert(values.pwd)
       try{
            const response = await axios.post(`http://localhost:8081/loginauth`,{
                params : {
                    useremail : values.userEmail,
                    pwd : values.pwd
                }
            }) 
           //const response = await axios.post(`http://192.168.0.185:8081/getusers`)
           //console.log(response.data)
           //alert(response.data)
            const token = response.data
            alert(token)
            alert("Login Successful")
            cookies.setItem('token', token,{expires: 90})
            if(rememberme)
			{
				cookies.setItem('rememberme', 'yes', { expires: 90 });
			}
            setLoginStatus(true)
            setMenuopt(1)
            setLoginBtnText('Logout')
       }catch(e){
            alert("Invalid Login")
            setLoginStatus(false)
       }

             
       /* if(values.userEmail === 'snehal@gmail.com' && values.pwd === '123'){
          if(rememberme){
            localStorage.setItem('userEmail', values.userEmail)
            localStorage.setItem('pwd',values.pwd)
        } 
        alert("Login Successful")
        setLoginStatus(true)
        setMenuopt(1)
       }
       else{
        alert("Invalid Login")
        setLoginStatus(false)
       } */
      
   }

   const handleNewUserClick = () =>{
        if(!loginstatus){
           // console.log("hi")
            setMenuopt(15)
            //console.log(menuopt)

       }
   }
    
    /* const handleUserEmail = (e) =>{
        setUserEmail(e.target.value)
        
    }    
    const handlePwd = (e) =>{
        setPwd(e.target.value)
    } */

     const clickRememberme = () =>{
        setRememberme(!rememberme)
     }

     const handleRadioChange = (e) =>{
         setValue(e.target.value)
     }
     function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }

     return(
        <Grid className='main'>
         
            <Paper elevation={12}  className={classes.mainClass}>
                <div>
            <Grid >
                <h2>Log In</h2>
                </Grid>
               <Grid className='imgs'>
                <Grid  className='container-img'>
                  <img src={profile} alt="profile" className="profile"/>
                </Grid>
                </Grid>
               
                <Grid container spacing={2} alignItems="center"  direction="column"  >
                <Controls.Input
                        name = "userEmail"
                        label="Email Id"
                        value = {values.userEmail}
                        onChange = {handleInputChange}
                        type="text"
                        required
                        size = "small"
                        style={{width:'300px', height:'50px', margin:'10px'}}
                    />
                </Grid>
               
                <Grid >
                <Controls.Input 
                        name = "pwd"
                        label="Password"
                        value = {values.pwd}
                        onChange = {handleInputChange}
                        type = "password"
                        required
                        size ="small"
                        style={{width:'300px', height:'50px', margin:'10px'}}
                    />
              
                  <Grid>
                    <Controls.Checkbox
                    name="RememberME"
                    checked={rememberme}
                    onClick={clickRememberme}
                    label="RememberMe"
                    />
                  </Grid>
                
                <Grid>
                <Controls.Button
                      onClick={handleLogin}
                      text = "Login" 
                      style={{margin:'10px'}}>
                      </Controls.Button>
                    <Button color='primary' style={{margin:'10px'}} size='large' variant="contained" onClick={handleNewUserClick}>
							      SignUp
						        </Button>
                </Grid>
                
                  
                
                    <Link href="#" underline="always">
                     {'Forget Password'}
                    </Link>
                
                </Grid>
                </div>
            </Paper>
           
        </Grid>
    )
}

export default Login
