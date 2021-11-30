import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Tooltip from "@material-ui/core/Tooltip";
import {toggleDelDialog} from "../../redux-state/reducers/DialogsReducer";
import {deleteContract} from "../../redux-state/async-actions/contract/deleteContract";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog() {
    const dispatch = useDispatch()
    const open = useSelector(state => state.dialogs.delete)
    const current = useSelector(state => state.currentRow.left)

    const handleClickOpen = () => {
        dispatch(toggleDelDialog(true))
    };

    const handleClose = () => {
        dispatch(toggleDelDialog(false))
    };

    const delContract = () => {
        dispatch(deleteContract(current))
        handleClose();
    };

    return (
        <div>
            <Tooltip title="Удалить договор">
                <IconButton
                    onClick={handleClickOpen}
                    aria-label="delete" color="primary">
                    <DeleteForeverIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Вы уверены что хотите удалить контракт?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                       Отменить это действие будет невозможно
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Не удалять
                    </Button>
                    <Button onClick={delContract} color="primary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}