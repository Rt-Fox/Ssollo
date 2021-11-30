const SET_CURRENT_LEFT = 'SET_CURRENT_LEFT'
const SET_CURRENT_RIGHT = 'SET_CURRENT_RIGHT'
const SET_CURRENT_PAYMENT = 'SET_CURRENT_PAYMENT'
const SET_CURRENT_ACTIVE_PAYMENT = 'SET_ACTIVE_PAYMENT'

const defaultState = {
    left: -1,
    right: -1,
    payment: -1,
    payment_active: {}
}

export const currentRowReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_CURRENT_LEFT:
            return {
                ...state,
                left: action.payload
            }
        case SET_CURRENT_RIGHT:
            return {
                ...state,
                right: action.payload
            }
        case SET_CURRENT_PAYMENT: 
            return {
                ...state,
                payment: action.payload
            }
        case SET_CURRENT_ACTIVE_PAYMENT:
            return {
                ...state,
                payment_active: action.payload
            }
        default:
            return state
    }
}

export const setCurrentRight = (payload) => { return { type: SET_CURRENT_RIGHT, payload } }
export const setCurrentLeft = (payload) => { return { type: SET_CURRENT_LEFT, payload } }
export const setCurrentPayment = (payload) => { return { type: SET_CURRENT_PAYMENT, payload } }
export const setCurrentActivePayment = (payload) => { return { type: SET_CURRENT_ACTIVE_PAYMENT, payload } }