import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchPlaces} from "./fetchPlaces";
import {csrftoken} from "../../../configs/Cooki";


export const deletePlace = (id) => {

    return dispatch => {
        fetch(`${FETCH_URL}/place/${id}`, {
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
            .then( ()=> {
                dispatch(fetchPlaces())
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