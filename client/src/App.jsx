import React, { Component } from 'react';
import Form from './components/Form/Form.jsx';
import Posts from './components/Posts/Posts.jsx';
import Post from './components/Posts/Post/Post.jsx';

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import memories from './images/memories.png';
const App = () => {
    return (
        <Container maxidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">Memories</Typography>
                <img src={memories} alt="memories" height="60" width="70" ></img>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}


export default App;