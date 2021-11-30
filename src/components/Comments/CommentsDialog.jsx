import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import Slide from '@material-ui/core/Slide';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import {toggleCommentsDialog} from "../../redux-state/reducers/DialogsReducer";
import AddDamage from "./AddDamage";


const RowFlex = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;
const Container = styled.div`
    position: relative;
`;
const Image = styled.img`
     width: 920px;
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

function CommentsDialog() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const open = useSelector(state => state.dialogs.comments)

    const handleClickOpen = () => {
        dispatch(toggleCommentsDialog(true))
    };

    const handleClose = () => {
        dispatch(toggleCommentsDialog(false))
    };

    return (
        <>
            <IconButton color="primary" style={{marginRight:'auto'}}
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
                            Повреждения
                        </Typography>
                    </Toolbar>
                </AppBar>
                <RowFlex>
                    <Container>
                        <Image src="/image/car.png" alt=""/>
                        <AddDamage title={'Задний бампер'} pos_x={'11'} pos_y={'50'} />
                        <AddDamage title={'Дверь багажника'} pos_x={'23'} pos_y={'50'} />
                        <AddDamage title={'Заднее стекло'} pos_x={'33'} pos_y={'50'} />
                        <AddDamage title={'Крыша'} pos_x={'45'} pos_y={'50'} />
                        <AddDamage title={'Лобовое стекло'} pos_x={'60'} pos_y={'50'} />
                        <AddDamage title={'Капот'} pos_x={'72'} pos_y={'50'} />
                        <AddDamage title={'Передний бампер'} pos_x={'88'} pos_y={'50'} />

                        <AddDamage title={'Порог правый'} pos_x={'48'} pos_y={'90'} />
                        <AddDamage title={'Правое зеркало'} pos_x={'60'} pos_y={'72'} />
                        <AddDamage title={'Переднее правое крыло'} pos_x={'71'} pos_y={'80'} />
                        <AddDamage title={'Передняя правая дверь'} pos_x={'56'} pos_y={'80'} />
                        <AddDamage title={'Задняя правая дверь'} pos_x={'44'} pos_y={'80'} />
                        <AddDamage title={'Заднее правое крыло'} pos_x={'33'} pos_y={'80'} />
                        <AddDamage title={'Диск правый передний'} pos_x={'70'} pos_y={'88'} />
                        <AddDamage title={'Диск правый задний'} pos_x={'33.7'} pos_y={'88'} />

                        <AddDamage title={'Порог левый'} pos_x={'48'} pos_y={'10'} />
                        <AddDamage title={'Левое зеркало'} pos_x={'60'} pos_y={'28'} />
                        <AddDamage title={'Переднее левое крыло'} pos_x={'71'} pos_y={'20'} />
                        <AddDamage title={'Передняя левая дверь'} pos_x={'56'} pos_y={'20'} />
                        <AddDamage title={'Задняя левая дверь'} pos_x={'44'} pos_y={'20'} />
                        <AddDamage title={'Заднее левое крыло'} pos_x={'33'} pos_y={'20'} />
                        <AddDamage title={'Диск левый передний'} pos_x={'70'} pos_y={'12'} />
                        <AddDamage title={'Диск левый задний'} pos_x={'33.7'} pos_y={'12'} />
                    </Container>
                </RowFlex>
            </Dialog>
        </>
    );
}

export default React.memo(CommentsDialog);