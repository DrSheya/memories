import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';
import memories from '../../images/memories.png';




const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth); // Zugriff auf den Authentifizierungsstatus aus dem Redux-Store

    const [user, setUser] = useState(auth?.authData?.result);

    const logout = () => {
        dispatch( { type: 'LOGOUT' });

        navigate('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [auth]);


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
            <Typography component={Link} to="/" variant="h3" className={classes.heading} align="center">Memories</Typography>
            <img  className= {classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile} >
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary' >Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
 
export default Navbar;