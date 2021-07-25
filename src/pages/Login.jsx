import React, {useState} from 'react';

import {instance} from "../api";

import TextField from '@material-ui/core/TextField';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {CircularProgress} from "@material-ui/core";

import {Link, useHistory} from "react-router-dom";

import logo from '../images/logo.png'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = () => {
    setIsLoading(true);

    instance.post('/user/signin', {
      email: emailValue,
      password: passwordValue
    })
      .then(({data}) => {
        console.log(data);
        localStorage.setItem('socMernToken', `Bearer ${data.token}`);
        setIsLoading(false);
        history.push('/');
      })
      .catch(err => {
        setErrors(err.response.data);

        setIsLoading(false);
        console.log(err.response.data);
      });
  }

  const handleChangeEmail = e => {
    setEmailValue(e.target.value);
  }

  const handleChangePassword = e => {
    setPasswordValue(e.target.value);
  }

  return (
    <Grid container className="form">
      <Grid item sm />
      <Grid item sm>
        <img src={logo} alt="social application" className="image"/>
        <Typography variant="h2" className="pageTitle">Login</Typography>
        <form noValidate>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className="textField"
            value={emailValue}
            onChange={handleChangeEmail}
            helperText={errors?.filter(error => error.param === 'email')[0]?.msg}
            error={!!errors?.filter(error => error.param === 'email')[0]?.msg}
            fullWidth
          />

          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className="textField"
            value={passwordValue}
            onChange={handleChangePassword}
            helperText={errors?.filter(error => error.param === 'password')[0]?.msg}
            error={!!errors?.filter(error => error.param === 'password')[0]?.msg}
            fullWidth
          />

          {errors?.filter(error => error.param === 'authError')[0] && (
            <Typography variant="body2" className="customError">{errors?.filter(error => error.param === 'authError')[0].msg}</Typography>
          ) }
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Login
            {isLoading && <CircularProgress className="progress" size={30}/>}
          </Button>
          <br/>
          <small>dont have an accaunt? sign up <Link to="signup">here</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Login;