import axios from 'axios';
import { AsyncStorage } from 'react-native';

const baseURL = 'https://api-chords.ridozaen.com';

const actionIsLoading = bool => ({
  type: 'IS_LOADING',
  payload: bool,
});

const setUser = userDetail => ({
  type: 'SET_USER',
  payload: userDetail,
});

const fetchUserInfo = token => async (dispatch) => {
  console.log('action fetch info token', token);
  try {
    const { data } = await axios.get(`${baseURL}/users/status`, { headers: { authorization: token } });
    console.log('axios get user status');
    console.log(data);
    dispatch(setUser(data.user));
  } catch (error) {
    console.log('error', error);
    console.log('error status', error.status);
    await AsyncStorage.removeItem('token');
    throw error;
  }
};

const userLogin = user => async (dispatch) => {
  const { email, password } = user;
  try {
    const { data } = await axios.post(`${baseURL}/users/login`, { email, password });
    console.log('await axis', data);
    dispatch(setUser(data.user));
    return data;
  } catch (error) {
    console.log('error message', error.message);
    console.log('error data', error.data);
    console.log('error header', error.headers);
    throw error;
  }
};

const userRegister = user => async () => {
  console.log('user register', user);
  const { email, password, fullname } = user;
  try {
    await axios.post(`${baseURL}/users/register`, { email, password, fullname });
  } catch (error) {
    throw error;
  }
};

export {
  actionIsLoading, fetchUserInfo, userLogin, userRegister,
};
