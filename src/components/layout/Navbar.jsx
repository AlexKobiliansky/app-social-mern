import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
//components
import Notifications from "./Notifications";
import PostScream from "../scream/PostScream";
import MyButton from "../../utils/MyButton";
//material-ui
import AppBar from '@material-ui/core/AppBar';
//icons
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const Navbar = () => {
  const authenticated = useSelector(({user}) => user.authenticated);
  return (
    <AppBar>
      <Toolbar className="nav-container">
        { authenticated ? (
            <>
              <PostScream />

              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon/>
                </MyButton>
              </Link>

              <Notifications />
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;