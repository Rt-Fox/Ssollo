import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {setSuccess} from "../redux-state/reducers/successReducer";

const Success = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.success.open)

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} onClose={handleClose} />;

    }
    const handleClose = () => {
        dispatch(setSuccess({open: false}));
    };
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Запрос удался
            </Alert>
        </Snackbar>
    );
};

export default Success;