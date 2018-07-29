const initiateState = [];

const chordReducers = (state = initiateState, action) => {
  let newState;

  switch (action.type) {
    case 'SET_SCALES':
      newState = state.slice();
      newState = [...action.payload];

      return newState;
    case 'SET_TUNING':
      newState = state.slice();
      const filterState = element => element.name === action.payload.name && element.octave === action.payload.octave;
      const index = newState.findIndex(filterState);

      if (index !== -1) newState[index].hitted = true;

      setTimeout(() => {
        if (index !== -1) newState[index].hitted = false;

        return newState;
      }, 200);

      return newState;

    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: { ...action.payload },
      };
    default:
      return state;
  }
};

export default chordReducers;
