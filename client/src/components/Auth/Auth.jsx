import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import Icon from './icon';


import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles.jsx';
import Input from './Input.jsx';



export const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [ isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {

  };
  const handleChange = () => {

  };
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp ((prevIsSignUp => !prevIsSignUp));
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: {result, token } });
    } catch (error) {
      console.log (error);
    }
  };
  const googleError = () => {
    alert ('Google Sign In was unsuccessful. Please try again later');
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
          <GoogleLogin
            clientId='243177062820-goq7tltrbhoes3g7mtk6suqbtnoo7j54.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
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