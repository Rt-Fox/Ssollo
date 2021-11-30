const SET_LEFT_TABLE_ROWS_LIST = "SET_LEFT_TABLE_ROWS_LIST"
const SET_RIGHT_TABLE_ROWS_LIST = "SET_RIGHT_TABLE_ROWS_LIST"

const defaultState = {
    left: [],
    right: [],
}


export const tableRowsReducer = (state = defaultState, action) => {



    switch (action.type) {

        case SET_LEFT_TABLE_ROWS_LIST:
            return {
                state,
                ...state,
                left: action.payload
            }
        case SET_RIGHT_TABLE_ROWS_LIST:
            return {
                state,
                ...state,
                right: action.payload
            }

        default:
            return state
    }
}


export const setLeftTableRows = (payload) => { return { type: SET_LEFT_TABLE_ROWS_LIST, payload } }
export const setRightTableRows = (payload) => { return { type: SET_RIGHT_TABLE_ROWS_LIST, payload } }