const initiateState = {
  isLoading: false,
};

const chordReducers = (state = initiateState, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default chordReducers;
