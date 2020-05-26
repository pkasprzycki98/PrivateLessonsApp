import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from "axios";
import { TextField, Button, Grid, Paper } from '@material-ui/core'
export default function UploadFile(props) {
    const [file,setFile] = useState();
    const [noteId,setNoteId] = useState();
   
    const token = useSelector(state => state.loggedReducer.token);

    useEffect(() =>{
        setNoteId(props.noteId);
    })

function updateFile(event)
{
setFile(event.target.files[0]);
}
function clearFile()
{
    console.log("dadwadawdaw");
    let a = document.getElementsByName("fileinput");
    document.removeChild(a);
    let q = document.createElement("input");
    q.setAttribute("type","file");
    document.appendChild(q);
}
async function postData()
{
const data = new FormData();
data.append('File', file);
data.append('NoteId',noteId);
await axios({
    method: 'POST',
    url: "https://localhost:44307/api/Files",
    data: data
}).then(() => {
    clearFile();
})
}
    return (
        <div>
           <input name="fileinput" type="file" onChange={updateFile}></input>
            <Button color="primary" variant="contained" onClick={postData}>Prześlij</Button>
        </div>
    )
}
