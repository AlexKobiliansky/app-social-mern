import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
//actions
import {signupUser} from "../redux/actions/userActions";
//material-ui
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//images
import logo from "../images/logo.png";


const Signup = () => {
  const dispatch = useDispatch();
  const {errors, isLoading} = useSelector(({UI}) => UI);
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = () => {
    dispatch(signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      },
      history
    ));
  }

  const handleChangeForm = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <Grid container className='form'>
      <Grid item sm />
      <Grid item sm>
        <img src={logo} alt="social application" className="image"/>
        <Typography variant="h2" className="pageTitle">Signup</Typography>
        <form noValidate>
          <TextField
            id="name"
            name="name"
            type="text"
            label="Your name"
            className="textField"
            value={formData.name}
            onChange={handleChangeForm}
            helperText={errors?.filter(error => error.param === 'name')[0]?.msg}
            error={!!errors?.filter(error => error.param === 'name')[0]?.msg}
            fullWidth
          />

          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className="textField"
            value={formData.email}
            onChange={handleChangeForm}
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
            value={formData.password}
            onChange={handleChangeForm}
            helperText={errors?.filter(error => error.param === 'password')[0]?.msg}
            error={!!errors?.filter(error => error.param === 'password')[0]?.msg}
            fullWidth
          />

          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            className="textField"
            value={formData.confirmPassword}
            onChange={handleChangeForm}
            helperText={errors?.filter(error => error.param === 'confirmPassword')[0]?.msg}
            error={!!errors?.filter(error => error.param === 'confirmPassword')[0]?.msg}
            fullWidth
          />

          {errors?.filter(error => error.param === 'registerError')[0] && (
            <Typography variant="body2" className="customError">{errors?.filter(error => error.param === 'registerError')[0].msg}</Typography>
          ) }
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Signup
            {isLoading && <CircularProgress className="progress" size={30}/>}
          </Button>
          <br/>
          <small>Already have an accaunt? login <Link to="signin">here</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Signup;