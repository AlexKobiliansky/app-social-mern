import React from 'react';
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {useSelector} from "react-redux";
import MyButton from "../utils/MyButton";
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostScream from "./PostScream";

const Navbar = () => {
  const authenticated = useSelector(({user}) => user.authenticated);
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {
          authenticated ? (
            <>
              <PostScream />

              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon/>
                </MyButton>
              </Link>

              <MyButton tip="Notifications">
                <NotificationsIcon/>
              </MyButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;