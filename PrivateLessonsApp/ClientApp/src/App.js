import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import PersonH from './components/Person/PersonH';
import './custom.css'
import  NoteEdit  from './components/Note/NoteEdit';
import LoginHooks from './components/User/LoginHooks';
import PersonEditH from './components/Person/PersonEditH';
import EditTime from './components/PrivateLessonTime/EditTime';
import PersonShow from './components/Person/ShowPersonH';
import Register from './components/User/Register';
import DwonloadFile from './components/Files/DownloadFile';
import ShowNote from './components/Note/ShowNote';
import DownloadFile from './components/Files/DownloadFile';
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/person' render={(props) => <PersonH {...props} load={false}></PersonH>}/>         
        <Route path='/personshow/:id' render={(props) => <PersonShow {...props} id={""}></PersonShow>}/>
        <Route path='/personcreate' render={(props) => <PersonEditH {...props} id={""} edit={""}></PersonEditH>}/>
        <Route path='/downloadFile' render={(props) => <DownloadFile {...props} id={""} note={""}></DownloadFile>}/>
        <Route exact path='/editNote' render={(props) => <NoteEdit {...props} id={""} edit={""}></NoteEdit>}/>
        <Route exact path='/showNote' render={(props) => <ShowNote {...props} id={""} note={""}></ShowNote>}/>
        <Route exact path='/editTime' render={(props) => <EditTime {...props} id={""} edit={""}></EditTime>}/>
        <Route exact path='/login' component={LoginHooks}/>
        <Route exact path='/register' component={Register}/>
      </Layout>
    );
  }
}
