import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchServices} from "./fetchServices";
import {csrftoken} from "../../../configs/Cooki";


export const deleteServices = (id) => {

    return dispatch => {
        fetch(`${FETCH_URL}/services/${id}`, {
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
            .then(()=> {
                dispatch(fetchServices())
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