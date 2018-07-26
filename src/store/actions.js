const actionIsLoading = (bool) => {
    return {
        type: 'IS_LOADING',
        payload: bool
    }
}

export {
    actionIsLoading
}