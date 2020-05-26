import React, {useState,useEffect} from 'react';
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {NoteList} from '../Note/NoteList';
import  PrivateLessonTime  from '../PrivateLessonTime/PrivateLessonTime';
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

export default function PersonShow(props){

const id  = props.location.state.id;


const [person,setPerson] = useState(null);
const [loading,setLoading] = useState(true);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: 'auto',
    },
    text: {
        margin: "8px",
    },
    felx: {
        flexGrow: 1,
    },
    center: {
        margin: '40px auto',
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

useEffect(() => {
    console.log(id);
    console.log(props);
   getData();

},[loading])

let contents = loading
? <p><em>Loading...</em></p>
: renderPerson(person);



        return (
            <div>
                <h1 id="tabelLabel" >Szczegóły</h1>        
                {contents}
            </div>
        );

    async function getData()
    {       
        await axios.get('https://localhost:44307/api/person/'+id).then(resposne => 
        {
            console.log("getData()");
            console.log(resposne.data);
            setPerson(resposne.data);
            setLoading(false);
        });  
      
    }

function renderPerson(person) {     
    console.log(person);         
        return (
<>
        <ThemeProvider theme={theme}>
            <Grid container spacing={1}>
                <Grid container xs={12} className={classes.center} >
                    <Paper className={classes.paper}>                      
                            <Box  display="flex">
                            <Box p={1}><Typography variant="h5" color="primary">Imię:</Typography></Box> 
                            <Box p={1}><Typography variant="h5">{person.name}</Typography></Box>  
                            <Box p={1.5}><Brightness1Icon color="primary"/></Box>
                            <Box p={1}><Typography variant="h5" color="primary">Nazwisko:</Typography></Box>  
                            <Box p={1}><Typography variant="h5">{person.surrname}</Typography></Box>
                            <Box p={1.5}><Brightness1Icon color="primary"/></Box>
                            <Box p={1}><Typography variant="h5" color="primary" >Klasa:</Typography></Box>  
                            <Box p={1}><Typography variant="h5">{person.class}</Typography></Box>    
                            <Box p={1.5}><Brightness1Icon color="primary"/></Box>    
                                 <Box p={1}><Link to={{
                                pathname: '/personcreate',
                                state:{
                                edit: true,
                                id: person.id,
                                person: person
                                }
                                }}><Button variant="contained" color="primary">Edytuj</Button></Link></Box>
                            <Box p={1.5}><Brightness1Icon color="primary"/></Box>
                            <Box p={1}><Button  variant="contained" color="secondary">Usuń</Button></Box>
                            </Box>                                                       
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>
        
        <PrivateLessonTime personId={person.id}></PrivateLessonTime>
        <NoteList personId={person.id}></NoteList>

    </>
    );
   

}
}
