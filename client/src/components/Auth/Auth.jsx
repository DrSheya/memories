import { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
       dispatch(signup(form));
    } else {
       dispatch(signin(form));
    }

    navigate('/');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
              </>
            )}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignUp && (
              <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />
            )}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
