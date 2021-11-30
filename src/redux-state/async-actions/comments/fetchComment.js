import {FETCH_URL} from "../../../configs/urls"
import {setCommentRow} from "../../reducers/commentRowsReducer";
import {setError} from "../../reducers/errorReducer";


export const fetchComment = (id) => {
    return dispatch => {
        fetch(`${FETCH_URL}/comment?order_id=${id}`, {
            method: 'GET',
            credentials: "include",
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.json();
                }
            })
            .then((json) => {
                dispatch(setCommentRow(json))
            })
            .catch((error) => {
                if(typeof error.then === "function") {
                    error
                        .then((error) =>
                            dispatch(setError({open: true, error: error}))
                        )
                }
            })
    }
}