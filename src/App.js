import './App.sass';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { createTheme } from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/core";
import {CssBaseline} from "@material-ui/core";
import themeFile from './utils/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from "./utils/AuthRoute";
const theme = createTheme(themeFile);

const token = localStorage.socMernToken;

let authenticated;

if(token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false
  } else {
    authenticated = true
  }
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" component={Home} exact/>
              <AuthRoute path="/login" component={Login} authenticated={authenticated}/>
              <AuthRoute path="/signup" component={Signup} authenticated={authenticated}/>
            </Switch>
          </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
