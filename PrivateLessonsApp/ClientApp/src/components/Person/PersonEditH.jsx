import React, {useState,useEffect} from 'react'
import {useSelector} from 'react-redux';
import { Redirect,Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/blue';
import axios from 'axios';
export default function PersonEditH(props) {

    const [name,setName] = useState('');
    const [surrname,setSurrname] = useState('');
    const [level,setLevel] = useState('');
    const [token, setToken] = useState('');
    const [person, setPerson] = useState(null);
    const [personId, setPersonId] = useState(0);
    const [updateComponent,setupdateComponent] = useState(false);
    const [isValidate,setisValidate] = useState(true);
    const [afterEdit, setafterEdit] = useState(false);
const tempToken = useSelector(state => state.loggedReducer.token);
const editMode = props.location.state.edit;

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

useEffect(() => {

setToken(tempToken);
if(editMode==true)
{
    if(updateComponent == false);
    {
        setPersonId(props.location.state.id);
        console.log("hello");
        getData();
    }
}

},[updateComponent,afterEdit]);    

function updateNameState(event)
{
setName(event.target.value);
}
function updateSurrnameState(event)
{
setSurrname(event.target.value);
}
function updateClassState(event)
{
setLevel(event.target.value);
}
async function PostData()
{
   await axios({
       method: 'post',
       url:'https://localhost:44307/api/person',
       headers:{
        'Authorization': `Bearer  ${token}`
       },
       data:
       {
           Id: personId,
           Name: name,
           Surrname: surrname,
           Class: level,
       }
   }).then(response => {
       setafterEdit(true);
   });
}
async function getData()
{
    await axios.get("https://localhost:44307/api/person/"+props.location.state.id).then(response => {
        setPerson(response.data);
        console.log(response.data);
        setName(response.data.name);
        setSurrname(response.data.surrname);
        setLevel(response.data.class);
        setupdateComponent(true);
        
    })
}
async function putData()
{
    console.log("JESTEM TUTAJ");
    console.log(personId);
    console.log(name);
    console.log(surrname);
    console.log(level);
    await axios({
        method: 'put',
        url:'https://localhost:44307/api/person',
        headers:{
         'Authorization': `Bearer  ${token}`
        },
        data:
        {
            Id: personId,
            Name: name,
            Surrname: surrname,
            Class: level,
        }
    }).then(setafterEdit(true));
}
if(afterEdit == true)
{
   return( <Redirect to={{pathname: "/person", state:{
       load: true
   }}}></Redirect>)
}
if(editMode == true)
{
    if(person !=null)
    {

    return (
        <> 
        <ThemeProvider theme={theme}>
         <Grid container spacing={3}>
            <Grid item xs={6} className={classes.center}>
                <Paper className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={putData}>
                        <h1>Edycja</h1>
                        <TextField id="standard-basic" label="Imię" value={name} className={classes.text} onChange={updateNameState}/>
                        <br />
                        <TextField id="standard-basic"  label="Nazwisko" value={surrname} className={classes.text} onChange={updateSurrnameState}/>
                        <br/>
                        <TextField id="standard-basic" label="Klasa" value={level} className={classes.text} onChange={updateClassState}/>
                        <br/>                 
                        <Button onClick={putData} variant="contained" color="primary" type="submit" className={classes.text}>Zatwierdź zmiany </Button>                                                  
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
    return(<>Loading...</>)
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
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={putData}>
                        <h1>Dodawanie</h1>
                        <TextField id="standard-basic" label="Imię" value={name} className={classes.text} onChange={updateNameState}/>
                        <br />
                        <TextField id="standard-basic"  label="Nazwisko" value={surrname} className={classes.text} onChange={updateSurrnameState}/>
                        <br/>
                        <TextField id="standard-basic" label="Klasa" value={level} className={classes.text} onChange={updateClassState}/>
                        <br/>                 
                        <Link to={{
                            pathname:"/person",
                            state:{
                                load: true
                            }
                        }}><Button onClick={PostData} variant="contained" color="primary" type="submit" className={classes.text}>Zatwierdź zmiany </Button></Link>                                                    
                        <Link to="/person"><Button variant="contained" color="secondary">Powrót</Button></Link>
                        <br/>                   
                        {isValidate ? null : <> <br /><p style={{ color: 'red' }}>Niepoprawny dane</p> </>}
                    </form>                   
                </Paper>
            </Grid>
        </Grid>  
     </ThemeProvider>              
    </>)
}
    
}
