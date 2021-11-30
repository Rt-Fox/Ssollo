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
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { useDispatch, useSelector } from 'react-redux';
import { setFirmId } from '../../redux-state/reducers/contractFormReducer';
import { fetchFirms } from '../../redux-state/async-actions/firm/fetchFirms';
import {toggleFirmDialog, toggleTerritoryPlaceFixDialog} from '../../redux-state/reducers/DialogsReducer';
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import {clearPlaceForm, setPlaceForm} from "../../redux-state/reducers/placeFormReduser";
import CreateIcon from "@material-ui/icons/Create"
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import PlaceFixDialog from "./PlaceFixDialog";
import {deleteFirm} from "../../redux-state/async-actions/firm/deleteFirm";

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

function FirmDialog() {
    const dispatch = useDispatch()
    const contractFirm = useSelector(state => state.contractForm.firm_id);
    const firmList = useSelector(state => state.lists.firms)
    const classes = useStyles();
    const open = useSelector(state => state.dialogs.firm)

    const handleClickOpen = () => {
        dispatch(toggleFirmDialog(true))
    };

    const handleClose = () => {
        dispatch(toggleFirmDialog(false))
    };

    React.useEffect(() => {
        dispatch(fetchFirms())
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
                            Фирмы
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem style={{ background: 'red' }}>
                        <ListItemText primary="Айди" />
                        <ListItemText primary="Название" />
                    </ListItem>
                    {firmList.map((el, index) =>
                        <React.Fragment
                            key={el.id}
                        >
                            {!contractFirm && index===0 && dispatch(setFirmId(el))}
                            <RowFlex>
                                <ListItem button
                                          onClick={
                                              () => {
                                                  dispatch(setFirmId(el));
                                                  dispatch(toggleFirmDialog(false))
                                              }

                                          }
                                >
                                    <ListItemText primary={el.id} />
                                    <ListItemText primary={el.name} />
                                </ListItem>
                                <Tooltip title="Изменить место">
                                    <IconButton onClick={
                                        () => {
                                            dispatch(setPlaceForm({id: el.id, name: el.name}));
                                            dispatch(toggleTerritoryPlaceFixDialog({flag: true, type: 'fix', place: 'Фирма'}))
                                        }
                                    }>
                                        <CreateIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Удалить место">
                                    <IconButton onClick={
                                        () => {
                                            dispatch(deleteFirm(el.id));
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
                                dispatch(toggleTerritoryPlaceFixDialog({flag: true, type: 'create', place: 'Фирма'}))
                            }
                        } style={{marginLeft: 'auto',marginRight: '20px', marginTop: '20px'}} variant="outlined">Добавить фирму</Button>
                        <PlaceFixDialog />
                    </RowFlex>
                </List>
            </Dialog>
        </div>
    );
}
export default React.memo(FirmDialog);