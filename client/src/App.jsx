import React from 'react';
import { Container} from '@material-ui/core';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {





    return (
        <GoogleOAuthProvider clientId='GOOGLE_API_TOKEN' >
        <BrowserRouter>
            <Container maxidth="lg">
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>

    );
}


export default App;