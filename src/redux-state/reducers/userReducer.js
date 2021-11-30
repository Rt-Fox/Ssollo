const USER = "USER"

const defaultState = {
    balance: null,
    full_name: '',
    id: null,
    manager: false,
    phone: '',
    user_id: null,
    is_superuser: false
}
export const userReducer = (state = defaultState, action) => {

    switch (action.type) {
        case USER:
            return {
                ...action.payload
            }
        default:
            return state
    }
}


export const setUser = (payload) => { return { type: USER, payload } }