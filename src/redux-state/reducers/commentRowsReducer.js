const SET_COMMENTS_ROW = "SET_COMMENTS_ROW"

const defaultState = {
    comments: [],
}


export const commentsRowsReducer = (state = defaultState, action) => {

    switch (action.type) {

        case SET_COMMENTS_ROW:
            return {
                comments: action.payload
            }
        default:
            return state
    }
}


export const setCommentRow = (payload) => { return { type: SET_COMMENTS_ROW, payload } }