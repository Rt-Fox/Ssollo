import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchTableRows} from "../fetchTableRows";
import {setSuccess} from "../../reducers/successReducer";
import {csrftoken} from "../../../configs/Cooki";


export const updateContract = (id, data) => {

    return dispatch => {
        fetch(`${FETCH_URL}/contract/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            method: 'PATCH',
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.json();
                }
            })
            .then(() => {
                dispatch(fetchTableRows(true))
                dispatch(fetchTableRows(false))
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