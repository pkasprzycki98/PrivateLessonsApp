import React, {useState} from 'react';
import axios from 'axios';
import { Redirect,Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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

export default function Register() {

const [username,setUsername] = useState(null);
const [password,setPassword] = useState(null);
const [email,setEmail] = useState('');
const [isRegister,setisRegister] = useState(false);
const [isValidate, setIsValidate] = useState(true);
const classes = useStyles();

    async function Register(event)
    {
        event.preventDefault();
       await axios({
           method: 'POST',
           url: "https://localhost:44307/api/user",
           data:{
            UserName: username,
            Password: password,
            Email: email
           }
       }).then(response => {

        setisRegister(true);

       },(error)=>{
           setIsValidate(false);
       })
    }

    function changeUsername(event)
    {
        setUsername(event.target.value)
    }
    function changePassword(event)
    {
        setPassword(event.target.value)
    }
    function changeEmail(event)
    {
        setEmail(event.target.value)
    }
    if(isRegister === false)
    {
        return (
            
            <>
            <Grid container spacing={3}>
                <Grid item xs={6} className={classes.center}>
                    <Paper className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={Register}>
                        <h1>Rejestracja</h1>
                        <br/>
                        <TextField id="standard-basic" label="Login" value={username} className={classes.text} onChange={changeUsername}/>
                        <br/>
                        <TextField id="standard-basic" type="password" label="Password" value={password} className={classes.text} onChange={changePassword}/>
                        <br/>
                        <TextField id="standard-basic" type="email" label="Email" value={email} className={classes.text} onChange={changeEmail}/>
                        <br/>
                        <Button variant="contained" color="primary" type="submit" className={classes.text}>
                                        Rejestracja
                        </Button>
                        {isValidate ? null : <> <br /><p style={{ color: 'red' }}>Niepoprawny Login lub Haslo</p> </>}
                        </form>
                    </Paper>
                </Grid>
            </Grid>         
            </>
        )
    }
    if(isRegister === true)
    {
        return <Redirect to='/login'></Redirect>
    }
    
}
