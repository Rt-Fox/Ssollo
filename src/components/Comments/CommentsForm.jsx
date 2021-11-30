import React from 'react'
import styled from 'styled-components'
import moment from "moment";
import CommentsFormBottom from './CommentsFormBottom'
import {useDispatch, useSelector} from "react-redux";
import {fetchComment} from "../../redux-state/async-actions/comments/fetchComment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import {deleteComment} from "../../redux-state/async-actions/comments/deleteComment";
import {clearCommentForm, setAllComment} from "../../redux-state/reducers/commentReducer";
import CommentsImageElement from "./CommentsImageElement";

const Wrapper = styled.div`
width: 90%;
margin: 20px auto;
`;
const Element = styled.div`
position: relative;

display: flex;
flex-direction: column;
width: 100%;
margin: 20px 0;
border-top: 1px solid #dfdfdf;
border-bottom: 1px solid #dfdfdf;
`;
const Row = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ImageBlock = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
margin-top: 20px;
`;
const FormText = styled.div`
display: flex;
flex-direction: column;
width: 60%;
`;
const FormBtn = styled.div`
position: absolute;
display: flex;
flex-direction: row;
bottom: 0;
right: 0;
`;
const Header = styled.h2`
  padding-top: 7px;
  font-size: 20px;
  margin-bottom: 0;
`;
const Text = styled.p`
    margin-bottom: 0;
`;
const FormDate = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;

const CommentsForm = () => {
    const dispatch = useDispatch();
    const id = useSelector(state => state.contractForm.id);
    const commentsRow = useSelector(state => state.commentsRow);

    React.useEffect(() => {
        dispatch(fetchComment(id))
    }, [dispatch, id]);

    React.useEffect(() => {
        return () => dispatch(clearCommentForm())
    },[]);


    return <Wrapper>
        {commentsRow.comments?.map((item) =>
            <Element>
                <Row key={item.id}>
                    <FormText>
                        <Header>{item.name}</Header>
                        <Text>
                            {item.opisanie}
                        </Text>
                    </FormText>
                    <FormDate>
                        {moment(item.date).format('DD-MM-YYYY')}
                    </FormDate>
                </Row>
                <ImageBlock>
                    <CommentsImageElement file={item.image_1} fileName={'Изображение 1'} />
                    <CommentsImageElement file={item.image_2} fileName={'Изображение 2'} />
                    <CommentsImageElement file={item.image_3} fileName={'Изображение 3'} />
                    <CommentsImageElement file={item.image_4} fileName={'Изображение 4'} />
                    <CommentsImageElement file={item.image_5} fileName={'Изображение 5'} />
                </ImageBlock>
                <FormBtn >
                    <Tooltip title="Изменить">
                        <IconButton onClick={
                            () => {
                                dispatch(setAllComment({
                                    id: item.id,
                                    order_id: item.order_id,
                                    image_1: item.image_1?item.image_1:null,
                                    image_2: item.image_2?item.image_2:null,
                                    image_3: item.image_3?item.image_3:null,
                                    image_4: item.image_4?item.image_4:null,
                                    image_5: item.image_5?item.image_5:null,
                                    date: item.date,
                                    name: item.name,
                                    opisanie: item.opisanie
                                }))
                                try {
                                    const el = document.getElementById('comment-form');
                                    el.scrollIntoView({behavior: "smooth"});
                                } catch {

                                }
                            }
                        }>
                            <CreateIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                        <IconButton onClick={
                            () => {
                                dispatch(deleteComment(item.id,id));
                            }
                        }>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </FormBtn>
            </Element>
            )
        }
        <CommentsFormBottom />
    </Wrapper>
}

export default React.memo(CommentsForm);