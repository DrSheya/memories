import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';

import Form from '../Form/Form.jsx';
import Posts from '../Posts/Posts.jsx';
import useStyles from '../../styles.jsx';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';


const Home = () =>  {

    const [currentId, setCurrentId] = useState (0);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    
    return (
        <Grow in>
        <Container>
            <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3} >
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
        </Container>
    </Grow>
    );
    
}
 
export default Home;