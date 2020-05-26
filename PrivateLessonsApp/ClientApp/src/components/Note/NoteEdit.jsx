import React,{useState,useEffect} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {Redirect,Link,BrowserRouter as Router, Route, Switch} from "react-router-dom";
import UploadFile from '../Files/UploadFile';
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { makeStyles } from '@material-ui/core/styles';
export default function NoteEdit(props) {
    const [topic, setTopic] = useState('');
    const [text,setText] = useState('');
    const [personId, setPersonId] = useState();
    const [token, setToken] = useState();
    const [updateComponent,setUpdatecomponent] = useState();
    const [note,setNote] = useState();
    const [file,setFile] = useState();
    const [isValidate,setisValidate] = useState(true);
    const [afterEdit, setafterEdit] = useState(false);


    const tempToken = useSelector(state => state.loggedReducer.token);
    const editMode = props.location.state.edit;
    const noteId = props.location.state.id;

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
        appBar: {
          position: 'relative',
        },
        title: {
          marginLeft: theme.spacing(2),
          flex: 1,
        },
      
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

        console.log("Person:"); console.log(props.location.state);
        setToken(tempToken);
        setPersonId(props.location.state.personId);
        if(editMode==true)
        {
            if(updateComponent == false);
            {
                setPersonId(props.location.state.personId);
                console.log("hello");
                GetData();
            }
        }
        
        },[editMode,updateComponent]);  
function updateTopic(event)
{
    setTopic(event.target.value);
}
function updateText(event)
{
    setText(event.target.value);
}
function updateFile(event)
{
    setFile(event.target.value);
}
function showFile()
{
    console.log("Plik");
    console.log(file);
}
async function GetData()
{
    await axios.get("https://localhost:44307/api/note/" + noteId).then(
        response => {
            setNote(response.data);
            setText(response.data.text);
            setTopic(response.data.topic);
            setUpdatecomponent(true);
        })
}
async function PostData(e)
{
    e.preventDefault();
    await axios({
        method: 'post',
        url:'https://localhost:44307/api/note',
        headers:{
            'Authorization': `Bearer  ${token}`
        },
        data:
        {
            Topic: topic,
            Text: text,
            PersonId: personId
        }
    }).then(() =>{
        setafterEdit(true);
    });;
}
async function PutData(e)
{
    e.preventDefault();
    await axios({
        method: 'put',
        url:'https://localhost:44307/api/note',
        headers:{
            'Authorization': `Bearer  ${token}`
        },
        data:
        {
            Id: note.id,
            Topic: topic,
            Text: text,
            PersonId: personId
        }
    }).then(() =>{
        setafterEdit(true);
    });
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
                        <TextField id="standard-basic" label="Temat" value={topic} className={classes.text} onChange={updateTopic}/>
                        <br />
                        <TextField id="standard-basic"  label="Treść" value={text} className={classes.text} onChange={updateText}/>  
                        <UploadFile noteId={props.location.state.id}></UploadFile>                                     
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
    return (
        <ThemeProvider theme={theme}>
         <Grid container spacing={3}>
            <Grid item xs={6} className={classes.center}>
                <Paper className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={PutData}>
                        <h1>Dodawanie</h1>
                        <TextField id="standard-basic" label="Temat" value={topic} className={classes.text} onChange={updateTopic}/>
                        <br />
                        <TextField id="standard-basic"  label="Treść" value={text} className={classes.text} onChange={updateText}/>  
                        <UploadFile noteId={props.location.state.id}></UploadFile>                                     
                        <Button onClick={PostData} variant="contained" color="primary" type="submit" className={classes.text}>Zatwierdź zmiany </Button>                                                    
                        <Link to="/person"><Button variant="contained" color="secondary">Powrót</Button></Link>
                        <br/>                   
                        {isValidate ? null : <> <br /><p style={{ color: 'red' }}>Niepoprawny dane</p> </>}
                    </form>                   
                </Paper>
            </Grid>
        </Grid>  
     </ThemeProvider>    
    )
}

    
}
