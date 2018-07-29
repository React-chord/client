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
  try {
    const { data } = await axios.get(`${baseURL}/users/status`, { authorization: token });
    dispatch(setUser(data.user));
  } catch (error) {
    console.log(error);
    if (error.status >= 400) {
      await AsyncStorage.removeItem('token');
    }
    throw error;
  }
};

const userLogin = user => async (dispatch) => {
  const { email, password } = user;
  try {
    const { data } = await axios.post(`${baseURL}/users/login`, { email, password });
    console.log('await axis', data);
    dispatch(setUser(data.user));
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
