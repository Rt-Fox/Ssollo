import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import Slide from '@material-ui/core/Slide';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { useDispatch, useSelector } from 'react-redux';
import {fetchServices} from "../../../redux-state/async-actions/services/fetchServices";
import {toggleServicesDialog, toggleServicesFixDialog} from "../../../redux-state/reducers/DialogsReducer";
import {setService} from "../../../redux-state/reducers/paymentReducer";
import {deleteServices} from "../../../redux-state/async-actions/services/deleteServices";
import ServicesFixDialog from "./ServicesFixDialog";
import {clearServiceForm, setServiceForm} from "../../../redux-state/reducers/serviceFormReduser";
import styled from "styled-components";


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

export default function ServicesDialog() {
    const dispatch = useDispatch();
    const servicesList = useSelector(state => state.lists.services);
    const classes = useStyles();
    const open = useSelector(state => state.dialogs.services)
    const handleClickOpen = () => {
        dispatch(toggleServicesDialog(true))
    };

    const handleClose = () => {
        dispatch(toggleServicesDialog(false))
    };

    React.useEffect(() => {
        dispatch(fetchServices())
    }, [dispatch])
    return (
        <>
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
                            Услуги
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem style={{ background: 'red' }}>
                        <ListItemText style={{display: 'flex',width: '20%'}} primary="Айди" />
                        <ListItemText style={{display: 'flex',width: '40%'}} primary="Название услуги" />
                        <ListItemText style={{display: 'flex',width: '18%'}} primary="Цена за услугу" />
                    </ListItem>
                    {servicesList.map(el =>
                        <React.Fragment
                            key={el.id}
                        >
                            <RowFlex>
                                <ListItem button
                                          onClick={
                                              () => {
                                                  dispatch(setService({id: el.id, name: el.name, price: el.price}));
                                                  dispatch(toggleServicesDialog(false))
                                              }

                                          }
                                >
                                    <ListItemText style={{display: 'flex',width: '25%'}}  primary={el.id} />
                                    <ListItemText style={{display: 'flex',width: '50%', margin: 'auto'}}  primary={el.name} />
                                    <ListItemText style={{display: 'flex',width: '15%', margin: 'auto'}} primary={el.price} />
                                </ListItem>
                                <Tooltip title="Изменить услугу">
                                    <IconButton onClick={
                                        () => {
                                            dispatch(setServiceForm({id: el.id, name: el.name, price: el.price}));
                                            dispatch(toggleServicesFixDialog({flag: true, type: 'fix'}))
                                        }
                                    }>
                                        <CreateIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Удалить услугу">
                                    <IconButton onClick={
                                        () => {
                                            dispatch(deleteServices(el.id));
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
                                dispatch(clearServiceForm());
                                dispatch(toggleServicesFixDialog({flag: true, type: 'create'}))
                            }
                        } style={{marginLeft: 'auto',marginRight: '20px', marginTop: '20px'}} variant="outlined">Добавить услугу</Button>
                        <ServicesFixDialog />
                    </RowFlex>

                </List>
            </Dialog>
        </>
    );
}