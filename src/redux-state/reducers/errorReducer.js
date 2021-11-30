const ERROR = "ERROR"

const defaultState = {
    open: false,
    error: null,
}


export const errorReducer = (state = defaultState, action) => {

    switch (action.type) {
        case ERROR:
            return {
                open: action.payload.open,
                error: action.payload.error
            }
        default:
            return state
    }
}


export const setError = (payload) => { return { type: ERROR, payload } }