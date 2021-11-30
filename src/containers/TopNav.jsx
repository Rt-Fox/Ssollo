import React from 'react'
import styled from 'styled-components'
import NoteIcon from '@material-ui/icons/Note';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Tooltip from '@material-ui/core/Tooltip';
import 'date-fns';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../redux-state/reducers/dateReducer';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import FormTabs from '../containers/FormTabs'
import { fetchTableRows } from '../redux-state/async-actions/fetchTableRows';
import {clearContractForm} from '../redux-state/reducers/contractFormReducer';
import {clearActiveCar} from "../redux-state/reducers/listsReducer";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import moment from "moment";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {clearCalculateForm} from "../redux-state/reducers/calculationReducer";
import {clearCommentForm} from "../redux-state/reducers/commentReducer";
import DeleteDialog from "./DeleteDialog/DeleteDialog";

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
height: 110px;
`;
const Inner = styled.div`
width: 30%;
display: flex;
justify-content: space-around;
align-items: center;
`;
const Row = styled.div`
display: flex;
align-items: flex-start;
justify-content: space-evenly;
height: 80px;
width: 100%;
`;
const Header = styled.div`
  width: 50%;
  text-align: center;
  background-color: #dfdfdf;
  height: 100%;
  padding-top: 7px;
  font-size: 20px;
  border-radius: 2rem 2rem 0 0;
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

const TopNav = () => {
  const date = useSelector(state => state.date.date)
  const dispatch = useDispatch()
  const classes = useStyles();

  const handleDateChange = (date) => {
    dispatch(setDate(date))
    dispatch(fetchTableRows(true))
    dispatch(fetchTableRows(false))
  };
  const addDays = (flag) => {
    dispatch(setDate(moment(date).add(flag+1, 'days').format('YYYY-MM-DD')))
    dispatch(fetchTableRows(true));
    dispatch(fetchTableRows(false));
  }
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
    dispatch(clearContractForm())
    dispatch(clearCalculateForm())
    dispatch(clearCommentForm())
    dispatch(clearActiveCar())
  };

  const handleClose = () => {
    setOpen(false);
  };
  return <Wrapper>
    <Row>
      <Inner>
        <Tooltip title="Добавить новую запись">
          <IconButton aria-label="delete" color="primary"
          onClick={handleClickOpen}
          >
            <NoteAddIcon />
          </IconButton>
        </Tooltip>
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
        <DeleteDialog />
      </Inner>
      <Inner>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <IconButton color="primary"
                      onClick={
                        () => {
                          addDays('-')
                        }
                      }
          >
            <ArrowLeftIcon/>
          </IconButton>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Дата для просмотра"
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <IconButton color="primary"
                      onClick={
                        () => {
                          addDays('+')
                        }
                      }
          >
            <ArrowRightIcon/>
          </IconButton>
        </MuiPickersUtilsProvider>
      </Inner>
      <Inner>
        <Tooltip title="Открыть договор">
          <IconButton aria-label="delete" color="primary">
            <NoteIcon />
          </IconButton>
        </Tooltip>
      </Inner>
    </Row>
    <Row>
      <Header>
        Выдача
      </Header>
      <Header>
        Возврат
      </Header>
    </Row>
  </Wrapper>
}

export default TopNav;