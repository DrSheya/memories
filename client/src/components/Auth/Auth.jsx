import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import Icon from './icon';
import { withRouter } from 'react-router-dom';


import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles.jsx';
import Input from './Input.jsx';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };


export const Auth = ({ history }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [ isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const [ formData, setFromData] = useState();
  



  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      dispatch(signup(formData, history));
    }else{
      dispatch(signin(formData, history));
    }

  };


  const handleChange = (e) => {
    setFromData({...formData, [e.target.name]: e.target.value});
  };


  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp ((prevIsSignUp => !prevIsSignUp));
    handleShowPassword(false);
  };

  return (
    <Container component='main' maxWidth= 'xs'>
      <Paper className={classes.paper} elevation={3} >
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon /> 
        </Avatar>
        <Typography component='h1' variant='h5'>{ isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} > 
            {
              isSignUp && (
                <>
                  <Input name="firstName" label='First Name' handleChange= {handleChange} autoFocus half />
                  <Input name="lastName" label='Last Name' handleChange= {handleChange}  half />
                </>
              )
            }
            <Input name='email' label='Email Adress' handleChange= {handleChange} type='email' /> 
            <Input name='password' label='Password' handleChange= {handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            { isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justifyContent='flex-end' >
            <Grid item >
              <Button onClick={switchMode}>
                { isSignUp ? "Already have an account? Sign In" : "Don't have and account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
export default Auth;