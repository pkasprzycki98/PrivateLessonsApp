import React, {useState, useEffect} from 'react'
import {saveAs} from 'file-saver';
import axios from 'axios';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import GetAppIcon from '@material-ui/icons/GetApp';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, Button, Grid, Paper } from '@material-ui/core'
export default function DownloadFile(props) {

    const [files,setFiles] = useState([]);
    const [fileDisponse,setFIleDisponse] = useState([]);
    const [downUrl,setDownnUrl] = useState();
    const [loading,setLoading] = useState(true);
    const [updateComponent,setupdateComponent] = useState(false);
    const noteId = props.location.state.id;
    const note = props.location.state.note;



useEffect(() =>{

if(files.length <=0)
{ 
       GetNoteFiles();
}

},[loading]);

async function GetNoteFiles()
{  
    console.log(noteId);
        if(loading == true)
        {
         const response =   await axios.get("https://localhost:44307/api/Files/"+noteId);
        console.log("response");
        setFiles(response.data);
    
         var json = JSON.stringify(fileDisponse);    
         var blob = new Blob([json], {type: "application/pdf"});
         var FileSaver = require('file-saver');
     
         var url = URL.createObjectURL(blob);
         setDownnUrl(url);   
         setLoading(false);
        }
}

function Download(id,filename)
{
    let a = document.createElement('a');
    a.setAttribute('href', "https://localhost:44307/api//Files/Download/"+id );
    a.setAttribute('download', filename);

    a.style.display="none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}
    
function DeleteFile()
{
    return(<div></div>)
}


if(loading == false)
{
    return (
        
        <> 
       <List>
           {files.map(file => (
               <ListItem key={file.key}>
                   <div style={{ width: '100%' }}>
                   <Box display="flex">
                   <Box flexGrow={1}><ListItemText primary={file.fileName} secondary="Download"></ListItemText></Box>
                    <Box p={1}><IconButton><GetAppIcon onClick={() => {
                        Download(file.id,file.fileName);               
                    }}></GetAppIcon></IconButton></Box>
                   <Box p={1}><IconButton onClick={DeleteFile}><DeleteIcon/></IconButton></Box>
                   </Box>
                   </div>
               </ListItem>
           ))}
        </List> 
       </>

    )
}
if(loading == true)
{
    return(<div>Loading...</div>)
}
  
}
