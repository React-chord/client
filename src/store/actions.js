export const setScales = (scales) => {
    return {
        type: 'SET_SCALES',
        payload: scales
    }
}

export const setTuning = (note) => {
  return {
    type: 'SET_TUNING',
    payload: note
  }
}
