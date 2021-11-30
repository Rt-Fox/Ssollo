const SET_DATE = 'SET_DATE'

const defaultState = {
    date: new Date()
}

export const dateReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_DATE:
            return {
                state,
                ...state,
                date: action.payload
            }

        default:
            return state
    }
}


export const setDate = (payload) => { return { type: SET_DATE, payload } }