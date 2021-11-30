import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchComment} from "./fetchComment";
import {setSuccess} from "../../reducers/successReducer";
import {csrftoken} from "../../../configs/Cooki";


export const updateComment = (id,data) => {
    if (data.image_1 === null || !data.image_1?.startsWith('data:image/')) {
        delete data['image_1'];
    }
    if (data.image_2 === null || !data.image_2?.startsWith('data:image/')) {
        delete data['image_2'];
    }
    if (data.image_3 === null || !data.image_3?.startsWith('data:image/')) {
        delete data['image_3'];
    }
    if (data.image_4 === null || !data.image_4?.startsWith('data:image/')) {
        delete data['image_4'];
    }
    if (data.image_5 === null || !data.image_5?.startsWith('data:image/')) {
        delete data['image_5'];
    }
    return dispatch => {
        fetch(`${FETCH_URL}/comment/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            method: 'PATCH',
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.json();
                }
            })
            .then(() => {
                dispatch(fetchComment(data.order_id))
                dispatch(setSuccess({open: true}))

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