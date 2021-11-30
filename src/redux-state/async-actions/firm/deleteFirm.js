import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchFirms} from "./fetchFirms";
import {csrftoken} from "../../../configs/Cooki";


export const deleteFirm = (id) => {

    return dispatch => {
        fetch(`${FETCH_URL}/firm/${id}`, {
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
                dispatch(fetchFirms())
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