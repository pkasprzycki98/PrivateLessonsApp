import React, {useState,useEffect} from 'react'
import { Redirect,Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Logged} from "../../actions";
import  jwt  from 'jwt-decode';
import Person from "../Person/PersonH";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    text: {
        margin: "8px"
    },
    center: {
        margin: '125px auto'
    }
}));


const LoginHooks = () => {

const [username, setUsername] = useState(null);
const [password, setPassword] = useState(null);
const [mounted, setMounted] = useState(true);
const [dashboard,setDashboard] = useState(false);
const [isValidate, setisValidate] = useState(true);
const dispatch = useDispatch();

useEffect(() => {

    return() => {
        setMounted(false);
    }
},[])


const classes = useStyles();

function ChangeUsername(event)
{
    setUsername(event.target.value);
    setMounted(true);
}
function ChangePassword(event)
{
    setPassword(event.target.value);
    setMounted(true);
}
function SignOut()
{
    
}
if(dashboard=== false)
    return (
        <>
        <Grid container spacing={3}>
            <Grid item xs={6} className={classes.center}>
                <Paper className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={SignIn}>
                        <h1>Zaloguj się</h1>
                        <TextField id="standard-basic" label="Login" value={username} className={classes.text} onChange={ChangeUsername}/>
                        <br />
                        <TextField id="standard-basic" type="password" label="Password" value={password} className={classes.text} onChange={ChangePassword}/>
                        <br/>
                        <Button variant="contained" color="primary" type="submit" className={classes.text}>
                                        Zaloguj
                        </Button>
                        <br/>
                        <Link to="/register">Nie masz konta? Stwórz je tutaj.</Link>
                        {isValidate ? null : <> <br /><p style={{ color: 'red' }}>Niepoprawny Login lub Haslo</p> </>}
                    </form>
                    
                </Paper>
            </Grid>
        </Grid>       
     </>
            
    )
if(dashboard === true)
{
    return(<Redirect to="/person"></Redirect>)
}

     async function SignIn(e){
       
        e.preventDefault();
        if(mounted === true)
        {
            await axios({
                method: "post",
                url: 'https://localhost:44307/api/Login',
                data:{
                    Username: username,
                    Password: password
                }
            }).then((response)=> {
                let tokenres = response.data.token.value;
                let decodeToken = jwt(tokenres);
                
                console.log(tokenres);
                window.localStorage.setItem("token",tokenres);
                dispatch(Logged(tokenres,decodeToken.unique_name, decodeToken.sid));
               
                
                setDashboard(true);
           }, (error)=> {console.log(error)
            setisValidate(false);
        });

        }
      else
      return () => {}    
      
}
}
export default LoginHooks;