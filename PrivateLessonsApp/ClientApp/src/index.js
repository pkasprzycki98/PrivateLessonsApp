import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NoteList from './components/Note/NoteList';
import {createStore,applyMiddleware, compose} from 'redux';
import allReducer from './reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { PrivateLessonTime } from './components/PrivateLessonTime/PrivateLessonTime';

const store = createStore(allReducer,compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');


ReactDOM.render(
 
   <Provider store={store}>
   <BrowserRouter basename={baseUrl}>

     <App />
     </BrowserRouter>
  </Provider>
  ,
  rootElement);

registerServiceWorker();

