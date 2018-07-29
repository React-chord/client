const chordReducers = (state, action) => {
  switch (action.type) {
    case 'SET_SCALES':
      newState = state.slice()
      newState = [...action.payload]

      return newState
    case 'SET_TUNING':
      newState = state.slice()
      const filterState = element => {
        return element.name === action.payload.name && element.octave === action.payload.octave
      }
      const index = newState.findIndex(filterState)

      if (index !== -1) newState[index].hitted = true

      setTimeout(() => {
        if (index !== -1) newState[index].hitted = false

        return newState
      }, 200)

      return newState

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
    case 'GET_CHORDS' :
      let newArr = [...action.payload.map(el => el = {...el})]
      return {
        ...state,
        allChords: newArr
      }
    default:
      return state;
  }
};

export default chordReducers;
