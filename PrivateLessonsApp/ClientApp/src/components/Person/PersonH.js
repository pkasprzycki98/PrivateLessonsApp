import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Avatar from '@material-ui/core/Avatar';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {PersonList} from '../../actions/index';
import { makeStyles } from '@material-ui/core/styles';

export default function PersonH(props) {

    const [people,setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token,setToken] = useState(null);
    const [tablelengh,settablelenght] = useState(0);
    const [deleteRefresh,setDeleteRefresh] = useState(true);
    const [isValidate, setisValidate] = useState(true);
   const temptoken = useSelector(state => state.loggedReducer.token);
   
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
    }   
}));

const classes = useStyles();
    
  useEffect(() =>{

    setToken(temptoken);
    if(token !== null)
    {          
       PersonData();     
    }
  },[token,people,tablelengh,deleteRefresh])  


function renderPeopleTable(people) {
    var url = '/personshow/';
    var url2 = '/personcreate';
        return (
           <>
      <Grid container spacing={2}>
        {people.map(person => (
        <Grid className={classes.textCenter} key={person.id} item xs={4}>            
        <Paper spacing={3}  className={classes.paper}>
            <Avatar variant="square" className={classes.textCenter} alt={person.name} src={"https://picsum.photos/id/"+person.id+"/200/300"} />
            <div className={classes.text}>
            <b>Imię:</b> {person.name}
            </div>
            <div className={classes.text}>
              <b>Nazwisko:</b> {person.surrname}
            </div>
            <div className={classes.text}>
              <b>Klasa:</b> {person.class}
            </div>     

              <div>
              <Link to={{
                pathname: url+person.id,
                state:{
                 id: person.id,
                 person: person
                 }
                }}><Button>Szczegóły</Button></Link>
                <Link to={{
                pathname: url2,
                state:{
                 edit: true,
                 id: person.id,
                 person: person
                 }
                }}><Button>Edytuj</Button></Link>
                <Link to="/person"><Button onClick={() =>{
                  DeleteData(person.id)
                }}>Usuń</Button></Link>
              </div>                  
          </Paper>          
         </Grid>))}                
      </Grid>
</>
        );
    }


async function PersonData()
{ 
  await axios.get("https://localhost:44307/api/Person",{headers:{ 'Authorization': `Bearer  ${token}`}}).then(response => {
    if(people != response.data)
    {
      setPeople(response.data);
      setLoading(false);
      settablelenght(response.data.length);
    }
  })
  .catch(error=> {
    console.log(error);
    setLoading(false);  
    setisValidate(false)}
    ); 
}

let contents = loading
? <p><em>Loading...</em></p>
: renderPeopleTable(people);


return (
<div>
    <h1 id="tabelLabel" >Lista uczniów</h1>
    {contents}
</div>
);


function DeleteData(id)
{
    let r = window.confirm("Are u sure?");

    if(r==true)
    {       
        axios.delete('https://localhost:44307/api/person/'+id).then(() =>{

          console.log("usuń");
          setDeleteRefresh(!deleteRefresh);});
    }
    else
    {
        alert("ok");
    }
}
}
