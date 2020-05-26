import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import './NavMenu.css';
import {useSelector} from 'react-redux';
import LoginHooks from './User/LoginHooks';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AppBar, Toolbar,Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  color:
  {
    color: "#ffffff",
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
});
export default function NavMenu() {

const [collapsed, setCollapsed] = useState(true);
const userName = useSelector(state => state.loggedReducer.username);
const userId = useSelector(state => state.loggedReducer.userId);
const loogedin = useSelector(state => state.loggedReducer.isLogged);
const loginhooks = LoginHooks;

const classes = useStyles();
const preventDefault = (event) => event.preventDefault();


  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


    return (
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>        
          <Typography variant="h6" className={classes.title}>
            Private Lesson App
          </Typography>
          {loogedin && (       
            <div>
              
            <Link to="/person"><Button className={classes.color}>PERSON LIST</Button></Link>
            <Link to={{pathname:'/personcreate', state:{
              edit:false
              }}}>
            <Button 
           className={classes.color}>
               New person
            </Button></Link>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>             
            </div>
          )}
          {
            !loogedin && (
              <div>
                <Link to="/login"><Button className={classes.color}>LOGIN</Button></Link>
              </div>
            )
          }
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </div>
    )
}
