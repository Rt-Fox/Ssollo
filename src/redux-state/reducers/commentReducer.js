const SET_ALL_COMMENT = 'SET_ALL_COMMENT'
const SET_ORDERID_COMMENT = 'SET_ORDERID_COMMENT'
const SET_COMMENT_COMMENT = 'SET_COMMENT_COMMENT'
const SET_MARK_COMMENT = 'SET_MARK_COMMENT'
const SET_DATE_COMMENT = 'SET_DATE_COMMENT'
const SET_IMAGE_1_COMMENT = 'SET_IMAGE_1_COMMENT'
const SET_IMAGE_2_COMMENT = 'SET_IMAGE_2_COMMENT'
const SET_IMAGE_3_COMMENT = 'SET_IMAGE_3_COMMENT'
const SET_IMAGE_4_COMMENT = 'SET_IMAGE_4_COMMENT'
const SET_IMAGE_5_COMMENT = 'SET_IMAGE_5_COMMENT'
const CLEAR_COMMENT_FORM = 'CLEAR_COMMENT_FORM'


const defaultState = {
    order_id: null,
    image_1: null,
    image_2: null,
    image_3: null,
    image_4: null,
    image_5: null,
    date: '',
    name: '',
    opisanie: ''
}

export const commentReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_ALL_COMMENT:
            return {
                id: action.payload.id,
                order_id: action.payload.order_id,
                image_1: action.payload.image_1,
                image_2: action.payload.image_2,
                image_3: action.payload.image_3,
                image_4: action.payload.image_4,
                image_5: action.payload.image_5,
                date: action.payload.date,
                name: action.payload.name,
                opisanie: action.payload.opisanie
            }
        case SET_ORDERID_COMMENT:
            return {
                ...state,
                order_id: action.payload
            }
        case SET_IMAGE_1_COMMENT:
            return {
                ...state,
                image_1: action.payload,
            }
        case SET_IMAGE_2_COMMENT:
            return {
                ...state,
                image_2: action.payload,
            }
        case SET_IMAGE_3_COMMENT:
            return {
                ...state,
                image_3: action.payload,
            }
        case SET_IMAGE_4_COMMENT:
            return {
                ...state,
                image_4: action.payload,
            }
        case SET_IMAGE_5_COMMENT:
            return {
                ...state,
                image_5: action.payload,
            }
        case SET_DATE_COMMENT:
            return {
                ...state,
                date: action.payload,
            }
        case SET_COMMENT_COMMENT:
            return {
                ...state,
                name: action.payload
            }
        case SET_MARK_COMMENT:
            return {
                ...state,
                opisanie: action.payload
            }
        case CLEAR_COMMENT_FORM:
            return {
                ...defaultState
            }
        default:
            return state
    }
}


export const setAllComment = payload => { return { type: SET_ALL_COMMENT, payload } }
export const setOrderIdComment = payload => { return { type: SET_ORDERID_COMMENT, payload } }
export const setImage1Comment = payload => { return { type: SET_IMAGE_1_COMMENT, payload } }
export const setImage2Comment = payload => { return { type: SET_IMAGE_2_COMMENT, payload } }
export const setImage3Comment = payload => { return { type: SET_IMAGE_3_COMMENT, payload } }
export const setImage4Comment = payload => { return { type: SET_IMAGE_4_COMMENT, payload } }
export const setImage5Comment = payload => { return { type: SET_IMAGE_5_COMMENT, payload } }
export const setCommentComment = payload => { return { type: SET_COMMENT_COMMENT, payload } }
export const setMarkComment = payload => { return { type: SET_MARK_COMMENT, payload } }
export const setDateComment = payload => { return { type: SET_DATE_COMMENT, payload } }
export const clearCommentForm = _ => { return { type: CLEAR_COMMENT_FORM } }
