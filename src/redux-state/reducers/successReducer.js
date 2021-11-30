const SUCCESS = "SUCCESS"

const defaultState = {
    open: false,
}


export const successReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SUCCESS:
            return {
                open: action.payload.open,
            }
        default:
            return state
    }
}


export const setSuccess = (payload) => { return { type: SUCCESS, payload } }