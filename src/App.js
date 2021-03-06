import {Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from '../src/redux/store';
import jwtDecode from 'jwt-decode';
import AuthRoute from "./utils/AuthRoute";
import {instance} from "./api";
//components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import Navbar from "./components/layout/Navbar";
//actions
import {logoutUser, getUserData} from "./redux/actions/userActions";
import {SET_AUTHENTICATED} from "./redux/types";
//material-ui
import {createTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/core";
import {CssBaseline} from "@material-ui/core";
import themeFile from './utils/theme';
//styles
import './App.sass';


const theme = createTheme(themeFile);
const token = localStorage.socMernToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    instance.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Provider store={store}>
        <Navbar/>
        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact/>
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/signup" component={Signup} />
            <Route path="/users/:id" component={User} exact/>
            <Route path="/users/:id/screams/:screamId" component={User} exact/>
          </Switch>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
