import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect,Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    text: {
        margin: "8px",
        textAlign: "left",
        padding: "5px"
    },
    center: {
        margin: '125px auto'
    },
    textCenter:{
      margin: 'auto',   
      width: "33%",
      height: "50%"   
    },  
    img:{
      height: "70px"
    },
    button:{
      margin: "8px",
    },
    button2:{
      margin: "15px",
    }

}));



export default function PrivateLessonTime(props) {

const personId = props.personId;
const [loading,setLoading] = useState(true);
const [privatelessontime,setPrivateLessontime] = useState([]);
const [loadAfterDelete, setloadAfterDelete] = useState(true);
const [loadAfterResponse] = useState(true);


const classes = useStyles();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#b71c1c',
    },
  },
});    


    useEffect(()=>{

        console.log("Hello")
        console.log(props);
        GetData(personId);
        console.log(privatelessontime);
    },[loading,loadAfterDelete])

    console.log(loading);


if(loading == true)
return(<p>Loading...</p>)

if(loading == false)
return(  <>
 <ThemeProvider theme={theme}>
 <h1>Dni zajęć</h1>
 <Link to={{
        pathname:"/editTime",
        state:{
          edit: false, 
             personId: personId,         
        }
      }}><Button className={classes.button2} color="primary" variant="contained">Dodaj</Button></Link>
    <Grid container spacing={2}>
    {privatelessontime.map(lesson => (
    <Grid className={classes.textCenter} key={lesson.id} item xs={4}>            
    <Paper spacing={3}  className={classes.paper}>
        <div className={classes.text}>
        <b>Dzień:</b> {lesson.day}
        </div>
        <div className={classes.text}>
          <b>Godzina:</b> {lesson.hour}
        </div>
        <div className={classes.text}>
          <b>Wynagrodzenie:</b> {lesson.expense}
        </div>     
          <div>       
            <Link to={{
            pathname: '/editTime',
            state:{
             edit: true,
             id: lesson.id,
             personId: personId,
             time: lesson
             }
            }}><Button color="primary" variant="contained" className={classes.button}>Edytuj</Button></Link>
           <Button color="secondary" variant="contained" className={classes.button} onClick={() =>{
              DeleteData(lesson.id)
            }}>Usuń</Button>
          </div>                  
      </Paper>          
     </Grid>))}                
  </Grid>  
</ThemeProvider>         
</>)

async function GetData() {

    await axios.get("https://localhost:44307/api/time/GetPersonTime/"+personId).then(response => {
     
         setPrivateLessontime(response.data);
         setLoading(false);
     
    })
}


async function DeleteData(id)
{
  let r = window.confirm("Are u sure?");

    if(r==true)
    {       
      await axios.delete("https://localhost:44307/api/time/"+id).then(
        setloadAfterDelete(!loadAfterDelete)
      );
    }
    else
    {
        alert("ok");
    }
 
}
}
