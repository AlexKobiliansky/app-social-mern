import React from 'react';
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from "react-redux";
import MyButton from "../utils/MyButton";
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Navbar = () => {
  const authenticated = useSelector(({user}) => user.authenticated);
  const dispatch = useDispatch();
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {
          authenticated ? (
            <>
              <MyButton tip="Post a scream">
                <AddIcon/>
              </MyButton>

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