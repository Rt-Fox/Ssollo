import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

import { useDispatch, useSelector } from 'react-redux';
import { setPlaceOt, setPlacePr} from '../../redux-state/reducers/contractFormReducer';
import { fetchPlaces } from '../../redux-state/async-actions/place/fetchPlaces';
import {
    togglePlaceOtDialog,
    togglePlacePrDialog, toggleTerritoryPlaceFixDialog
} from '../../redux-state/reducers/DialogsReducer';

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {deletePlace} from "../../redux-state/async-actions/place/deletePlace";
import {clearPlaceForm, setPlaceForm} from "../../redux-state/reducers/placeFormReduser";
import PlaceFixDialog from "./PlaceFixDialog";

const RowFlex = styled.div`
    display: flex;
`;

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function PlaceDialog({priem}) {
    const dispatch = useDispatch()
    const placesList = useSelector(state => state.lists.places)
    const classes = useStyles();
    const open = useSelector(state => priem?state.dialogs.place_pr:state.dialogs.place_ot)

    const handleClickOpen = () => {
        priem?dispatch(togglePlacePrDialog(true)):dispatch(togglePlaceOtDialog(true))
    };

    const handleClose = () => {
        priem?dispatch(togglePlacePrDialog(false)):dispatch(togglePlaceOtDialog(false))
    };

    React.useEffect(() => {
        dispatch(fetchPlaces())
    }, [])
    return (
        <div>
            <IconButton color="primary"
                        onClick={
                            () => {
                                handleClickOpen(true)
                            }
                        }
            >
                <ArrowDropDownCircleIcon />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {priem?' Прием':' Выдача'}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem style={{ background: 'red' }}>
                        <ListItemText primary="Айди" />
                        <ListItemText primary="Адресс" />
                    </ListItem>
                    {placesList?.map(el =>
                        <React.Fragment
                            key={el.id}
                        >   <RowFlex>
                                <ListItem button
                                          onClick={
                                              () => {
                                                  if (priem) {
                                                      dispatch(setPlacePr({id: el.id, address: el.address}));
                                                      dispatch(togglePlacePrDialog(false));
                                                  } else {
                                                      dispatch(setPlaceOt({id: el.id, address: el.address}));
                                                      dispatch(togglePlaceOtDialog(false));
                                                  }
                                              }

                                          }>
                                    <ListItemText primary={el.id} />
                                    <ListItemText primary={el.address} />
                                </ListItem>
                                <Tooltip title="Изменить адрес">
                                    <IconButton onClick={
                                        () => {
                                            dispatch(setPlaceForm({id: el.id, name: el.address}));
                                            dispatch(toggleTerritoryPlaceFixDialog({flag: true, type: 'fix', place: 'Aдрес'}))

                                        }
                                    }>
                                        <CreateIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Удалить адрес">
                                    <IconButton onClick={
                                        () => {
                                            dispatch(deletePlace(el.id));
                                        }
                                    }>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </RowFlex>
                            <Divider />
                        </React.Fragment>
                    )}
                    <RowFlex>
                        <Button onClick={
                            () => {
                                dispatch(clearPlaceForm());
                                dispatch(toggleTerritoryPlaceFixDialog({flag: true, type: 'create', place: 'Aдрес'}))
                            }
                        } style={{marginLeft: 'auto',marginRight: '20px', marginTop: '20px'}} variant="outlined">Добавить место</Button>
                        <PlaceFixDialog />
                    </RowFlex>
                </List>
            </Dialog>
        </div>
    );
}
export default React.memo(PlaceDialog)