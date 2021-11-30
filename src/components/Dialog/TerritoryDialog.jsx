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

import {setTerritory} from '../../redux-state/reducers/contractFormReducer';
import { fetchTerritories } from '../../redux-state/async-actions/territory/fetchTerritories';
import {
    toggleTerritoryDialog,
    toggleTerritoryPlaceFixDialog
} from '../../redux-state/reducers/DialogsReducer';
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import PlaceFixDialog from "./PlaceFixDialog";
import {clearPlaceForm, setPlaceForm} from "../../redux-state/reducers/placeFormReduser";
import {deleteTerritory} from "../../redux-state/async-actions/territory/deleteTerritory";


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

function TerritoryDialog() {
    const dispatch = useDispatch()
    const contractTerritory = useSelector(state => state.contractForm.territory_id);
    const territories = useSelector(state => state.lists.territories)
    const classes = useStyles();
    const open = useSelector(state => state.dialogs.territory)

    const handleClickOpen = () => {
        dispatch(toggleTerritoryDialog(true))
    };

    const handleClose = () => {
        dispatch(toggleTerritoryDialog(false))
    };

    React.useEffect(() => {
        dispatch(fetchTerritories())
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
                            Территории эксплуатации
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem style={{ background: 'red' }}>
                        <ListItemText primary="Айди" />
                        <ListItemText primary="Территория" />
                    </ListItem>
                    {territories.map((el,index) =>
                        <React.Fragment
                            key={el.id}
                        >
                            {!contractTerritory && index===0 && dispatch(setTerritory({id: el.id, address: el.territory_name}))}
                            <RowFlex>
                                <ListItem button
                                          onClick={
                                              () => {
                                                  dispatch(setTerritory({id: el.id, address: el.territory_name}));
                                                  dispatch(toggleTerritoryDialog(false))
                                              }

                                          }
                                >
                                    <ListItemText primary={el.id} />
                                    <ListItemText primary={el.territory_name} />
                                </ListItem>
                                <Tooltip title="Изменить место">
                                    <IconButton onClick={
                                        () => {
                                            dispatch(setPlaceForm({id: el.id, name: el.territory_name}));
                                            dispatch(toggleTerritoryPlaceFixDialog({flag: true, type: 'fix', place: 'Территория'}))
                                        }
                                    }>
                                        <CreateIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Удалить место">
                                    <IconButton onClick={
                                        () => {
                                            dispatch(deleteTerritory(el.id));
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
                                dispatch(toggleTerritoryPlaceFixDialog({flag: true, type: 'create', place: 'Территория'}))
                            }
                        } style={{marginLeft: 'auto',marginRight: '20px', marginTop: '20px'}} variant="outlined">Добавить территорию эксплуатации</Button>
                        <PlaceFixDialog />
                    </RowFlex>
                </List>
            </Dialog>
        </div>
    );
}

export default React.memo(TerritoryDialog)