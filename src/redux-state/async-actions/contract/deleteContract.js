import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchTableRows} from "../fetchTableRows";
import {setSuccess} from "../../reducers/successReducer";
import {csrftoken} from "../../../configs/Cooki";


export const deleteContract = (id) => {

    return dispatch => {
        fetch(`${FETCH_URL}/contract/${id}`, {
            headers: {
                'X-CSRFToken': csrftoken
            },
            method: 'DELETE',
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw response.json();
                }
            })
            .then(()=>{
                dispatch(fetchTableRows(true))
                dispatch(setSuccess({open: true}))
            }
            )
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