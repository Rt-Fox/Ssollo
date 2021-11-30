import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FormTabs from '../containers/FormTabs'
import { useDispatch, useSelector } from 'react-redux';
import { toggleContractDialog } from '../redux-state/reducers/DialogsReducer';


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


const ContractDialog = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const open = useSelector(state => state.dialogs.contract)

    const handleClose = () => {
        dispatch(toggleContractDialog(false))
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Договор проката
                    </Typography>
                </Toolbar>
            </AppBar>
            <FormTabs />
        </Dialog>
    )
}

export default ContractDialog