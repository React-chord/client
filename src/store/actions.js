import axios from 'axios';

const baseURL = 'https://api-chords.ridozaen.com';

const actionIsLoading = bool => ({
  type: 'IS_LOADING',
  payload: bool,
});

const setUser = userDetail => ({
  type: 'SET_USER',
  payload: userDetail,
});

const fetchUserInfo = async (token) => {
  const { data } = await axios.get(`${baseURL}/users/status`, { authorization: token });
  return (dispatch) => {
    dispatch(setUser(data.user));
  };
};

export { actionIsLoading, fetchUserInfo };
