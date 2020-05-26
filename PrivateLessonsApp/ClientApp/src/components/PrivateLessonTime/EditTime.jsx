import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios'
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
export default function EditTime(props) {

const [day,setDay] = useState('');
const [hour,setHour] = useState('');
const [expense,setExpense] = useState('');
const [updateComponent,setupdateComponent] = useState(false);
const [token,setToken] = useState('');
const [lessonTime,setlessonTime] = useState();
const [isValidate,setisValidate] = useState(true);
const [afterEdit, setafterEdit] = useState(false);

const personId = props.location.state.personId;
const tempToken = useSelector(state => state.loggedReducer.token);
const editMode = props.location.state.edit;

useEffect(() => {

    setToken(tempToken);
    if(editMode==true)
    {
        if(updateComponent == false);
        {
            GetData();
        }
    }
    
    },[editMode,updateComponent,afterEdit]);  
function updateDay(event)
{
    setDay(event.target.value);
}
function updateHour(event)
{
    setHour(event.target.value);
}
function updateExpense(event)
{
    setExpense(event.target.value);
}
    
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

const classes = useStyles();

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: {
        main: '#b71c1c',
      },
    },
  });

async function PostData()
{
    await axios({
        method: 'post',
        url:'https://localhost:44307/api/time',
        headers:{
         'Authorization': `Bearer  ${token}`
        },
        data:
        {
           Day: day,
           Hour: hour,
           Expense: expense,
           PersonId: personId
        
        }
    }).then(setafterEdit(true));
}
async function GetData()
{
    await axios.get("https://localhost:44307/api/time/"+props.location.state.id).then(response => {
        setlessonTime(response.data);
        console.log(response.data);
        setDay(response.data.day);
        setHour(response.data.hour);
        setExpense(response.data.expense);
        setupdateComponent(true);
        
    })
}
async function PutData()
{
    await axios({
        method: 'put',
        url:'https://localhost:44307/api/time',
        headers:{
         'Authorization': `Bearer  ${token}`
        },
        data:
        {
           Id: lessonTime.id,
           Day: day,
           Hour: hour,
           Expense: expense
        }
    }).then(setafterEdit(true));
}
if(afterEdit == true)
{
    return(<Redirect to={{pathname: "/person", state:{
        load: true
    }}}></Redirect>)
}
if(editMode == true)
{
    if(updateComponent == true)
    {
    return (
        <>
    <ThemeProvider theme={theme}>
         <Grid container spacing={3}>
            <Grid item xs={6} className={classes.center}>
                <Paper className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={PutData}>
                        <h1>Edycja</h1>
                        <TextField id="standard-basic" label="Dzień" value={day} className={classes.text} onChange={updateDay}/>
                        <br />
                        <TextField id="standard-basic"  label="Godzina" value={hour} className={classes.text} onChange={updateHour}/>
                        <br/>
                        <TextField id="standard-basic" label="Wynagrodzenie" value={expense} className={classes.text} onChange={updateExpense}/>
                        <br/>                 
                        <Button onClick={PutData} variant="contained" color="primary" type="submit" className={classes.text}>Zatwierdź zmiany </Button>                                                   
                        <Link to="/person"><Button variant="contained" color="secondary">Powrót</Button></Link>
                        <br/>                   
                        {isValidate ? null : <> <br /><p style={{ color: 'red' }}>Niepoprawny dane</p> </>}
                    </form>                   
                </Paper>
            </Grid>
        </Grid>  
     </ThemeProvider>       
     </>
    )
    }
    else
    {
        return(<div>Loading...</div>)
    }
}
else
{
    return(
        <>
        <ThemeProvider theme={theme}>
         <Grid container spacing={3}>
            <Grid item xs={6} className={classes.center}>
                <Paper className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={PostData}>
                        <h1>Dodawanie</h1>
                        <TextField id="standard-basic" label="Dzień" value={day} className={classes.text} onChange={updateDay}/>
                        <br />
                        <TextField id="standard-basic"  label="Godzina" value={hour} className={classes.text} onChange={updateHour}/>
                        <br/>
                        <TextField id="standard-basic" label="Wynagrodzenie" value={expense} className={classes.text} onChange={updateExpense}/>
                        <br/>                 
                        <Button onClick={PostData} variant="contained" color="primary" type="submit" className={classes.text}>Zatwierdź zmiany </Button>                                                  
                        <Link to="/person"><Button variant="contained" color="secondary">Powrót</Button></Link>
                        <br/>                   
                        {isValidate ? null : <> <br /><p style={{ color: 'red' }}>Niepoprawny dane</p> </>}
                    </form>                   
                </Paper>
            </Grid>
        </Grid>  
     </ThemeProvider>             
     </>
    )
}

}
