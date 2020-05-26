import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/blue';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DownloadFile from '../Files/DownloadFile';
import PrivateLessonTime from '../PrivateLessonTime/PrivateLessonTime';
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PersonShow from '../Person/ShowPersonH';
export  function NoteList(props){
 const [notes,setNotes] = useState([]);
 const [loading,setLoading] = useState(true);
 const [loadAfterDelete, setloadAfterDelete] = useState(true);
const [loadAfterResponse] = useState(true);
 const personId = props.personId;

 async function GetData(id)
 {
   await axios.get("https://localhost:44307/api/Note/GetPersonNote/"+personId).then(response => {

   setNotes(response.data);
   setLoading(false);
   });
 
      
 }
useEffect(() =>{

  GetData(personId);

},[loading,loadAfterDelete])
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
  button2:{
    margin:"15px"
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 console.log(notes);
 if(loading == true)
 {
   return(<div>Loading...</div> )
 }
 if(loading == false)
 {
    return(
    <>
 <ThemeProvider theme={theme}>
   <h1>Notatki</h1>
      <Link to={{
        pathname:"/editNote",
        state:{
          edit: false, 
             personId: personId,         
        }
      }}><Button className={classes.button2} color="primary" variant="contained">Dodaj</Button></Link>
    <Grid container spacing={2}>
    {notes.map(note => (
    <Grid className={classes.textCenter} key={note.id} item xs={4}>            
    <Paper spacing={3}  className={classes.paper}>
      
        <div className={classes.text}>
        <b>Temat:</b> {note.topic}
        </div>
        <div className={classes.text}>
          <b>Data:</b> {note.noteDate}
        </div>          
        <div className={classes.text}>
          <b>Treść:</b> {note.text}
        </div>
          <div>       
            <Link to={{
            pathname: '/editNote',
            state:{
             edit: true,
             id: note.id,
             personId: personId,
             note: note
             }
            }}><Button color="primary" variant="contained" className={classes.button}>Edytuj</Button></Link>
            <Button color="secondary" variant="contained" className={classes.button} onClick={() =>{
              DeleteData(note.id)
            }}>Usuń</Button>
            <Link to={{
            pathname: '/downloadFile',
            state:{       
             id: note.id,
              note:note
             }
            }}><Button color="primary" variant="contained" className={classes.button}>Pliki</Button></Link>
          </div>     
            
      </Paper>          
     </Grid>))}                
  </Grid>  
</ThemeProvider>
</>
    )
 }
 async function DeleteData(id)
{
  let r = window.confirm("Are u sure?");

    if(r==true)
    {       
      await axios.delete("https://virtserver.swaggerhub.com/pkasprzycki98/LessonApp/2/api/Note/"+id).then(
        setloadAfterDelete(!loadAfterDelete)
      )
    }
    else
    {
        alert("ok");
    }
 
}

}

