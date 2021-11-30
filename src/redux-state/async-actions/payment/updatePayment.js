import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchPayment} from "./fetchPayment";
import {csrftoken} from "../../../configs/Cooki";


export const updatePayment = (id, data, cfid) => {

    return dispatch => {
        fetch(`${FETCH_URL}/payment/${id}`, {
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
                dispatch(fetchPayment(cfid))
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