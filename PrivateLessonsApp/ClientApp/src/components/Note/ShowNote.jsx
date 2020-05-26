import React,{useEffect} from 'react'
import DownloadFile from '../Files/DownloadFile';
export default function ShowNote(props) {

    const noteid = props.location.state.id;
    const note = props.location.state.note;

useEffect(() => {
    console.log(props);
})

    return (
        <div>
            <label>Text</label>
            <label>{note.text}</label>
            <DownloadFile id = {noteid}></DownloadFile>
        </div>
    )
}
