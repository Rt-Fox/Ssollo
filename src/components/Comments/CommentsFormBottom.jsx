import React, {useEffect} from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {
    clearCommentForm,
    setCommentComment,
    setDateComment,
    setImage1Comment,
    setImage2Comment,
    setImage3Comment,
    setImage4Comment,
    setImage5Comment,
    setMarkComment,
    setOrderIdComment
} from "../../redux-state/reducers/commentReducer";
import {createComment} from "../../redux-state/async-actions/comments/createComment";
import {updateComment} from "../../redux-state/async-actions/comments/updateComment";
import CommentsDialog from "./CommentsDialog";
import CommentsUploadImage from "./CommentsUploadImage";

const Wrapper = styled.form`
width: 100%;
margin: 20px auto;
padding: 20px;
display: flex;
flex-direction: column;
color: #fff;
border: 1px solid #dfdfdf;
border-radius: .5rem;
`;
const InputRow = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin: 10px 0;
`;
const CommentsFormBottom = () => {
    const dispatch = useDispatch();

    const hiddenInp1 = React.useRef()
    const hiddenInp2 = React.useRef()
    const hiddenInp3 = React.useRef()
    const hiddenInp4 = React.useRef()
    const hiddenInp5 = React.useRef()

    const id = useSelector(state => state.contractForm.id);
    const commentsForm = useSelector(state => state.commentsForm);

    useEffect(() => {
        if (commentsForm.date === '') {
            dispatch(setDateComment(moment().format('YYYY-MM-DD')))
        }
        if (commentsForm.order_id === null) {
            dispatch(setOrderIdComment(id))
        }
    })

    const formSubmit = (e) => {
        e.preventDefault()

        if (commentsForm.id) {
            dispatch(updateComment(commentsForm.id, commentsForm,id))
        } else {
            dispatch(createComment(commentsForm,id))
        }
        dispatch(clearCommentForm())
    }
    return <Wrapper id={'comment-form'} onSubmit={formSubmit}>
        <InputRow>
            <TextField required
                       id="filled-disabled"
                       variant="filled"
                       label="Повреждения"
                       style={{width: '55%'}}
                       value={commentsForm.name}
                       onChange={(event => {
                           dispatch(setCommentComment(event.target.value))
                       })}
            />
            <CommentsDialog />
            <TextField required
                       id="date"
                       label="Дата"
                       type="date"
                       value={commentsForm.date}
                       onChange={
                           (event) => {
                               dispatch(setDateComment(event.target.value))
                           }
                       }
                       InputLabelProps={{
                           shrink: true,
                }}
            />
        </InputRow>
        <InputRow>
            <TextField required
                       id="filled-disabled"
                       variant="filled"
                       label="Описания"
                       style={{width: '75%'}}
                       value={commentsForm.opisanie}
                       onChange={(event => {
                           dispatch(setMarkComment(event.target.value))
                       })}
            />
        </InputRow>
        <div style={{display:'flex', flexWrap: 'wrap'}}>
            <CommentsUploadImage
                refLink={hiddenInp1}
                setFunc={setImage1Comment}
                file={commentsForm.image_1}
                fileName={'Изображение 1'}
            />
            <CommentsUploadImage
                refLink={hiddenInp2}
                setFunc={setImage2Comment}
                file={commentsForm.image_2}
                fileName={'Изображение 2'}
            />
            <CommentsUploadImage
                refLink={hiddenInp3}
                setFunc={setImage3Comment}
                file={commentsForm.image_3}
                fileName={'Изображение 3'}
            />
            <CommentsUploadImage
                refLink={hiddenInp4}
                setFunc={setImage4Comment}
                file={commentsForm.image_4}
                fileName={'Изображение 4'}
            />
            <CommentsUploadImage
                refLink={hiddenInp5}
                setFunc={setImage5Comment}
                file={commentsForm.image_5}
                fileName={'Изображение 5'}
            />
        </div>
        <InputRow>
            <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon/>}
                type='submit'
            >
                Сохранить
            </Button>
        </InputRow>
    </Wrapper>
}

export default CommentsFormBottom