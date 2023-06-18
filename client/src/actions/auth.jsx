import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { useNavigate } from 'react-router-dom';

export const signin = (formData) => async (dispatch) => {
  try {

    // sign in the user

    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    const navigate = useNavigate();

    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {

    // sing up the user


    const { data } = await api.signUp(formData);

    const navigate = useNavigate();

    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
