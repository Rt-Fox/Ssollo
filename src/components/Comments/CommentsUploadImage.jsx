import React from 'react';
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import CommentsImageElement from "./CommentsImageElement";


const InputImg = styled.div`
display: flex;
flex-direction: column;
align-items: start;
justify-content: end;
margin-bottom: 20px;
margin-right: 20px;
margin-top: 20px;
`;
const HiddenFileInput = styled.input`
display: none;
`;
const Column = styled.div`
display: flex;
flex-direction: column;
`;
const CommentsUploadImage = (props) => {
    const dispatch = useDispatch();

    const { refLink, setFunc, file, fileName } = props;

    const fileHandler = event => {
        let reader = new FileReader();
        reader.onload = function (e) {
            dispatch(setFunc(e.target.result))
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <InputImg>
            {!file?
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    onClick={
                        () => {
                            refLink.current.click()
                        }
                    }
                >
                    Загрузить фото
                </Button>
                :
                <Column>
                    <CommentsImageElement file={file} fileName={fileName} />
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<DeleteIcon/>}
                        onClick={
                            () => {
                                dispatch(setFunc(null))
                            }
                        }
                    >Удалить</Button>
                </Column>

            }
            <HiddenFileInput
                onChange={fileHandler}
                type="file"
                ref={refLink}
                accept="image/*"
            />
        </InputImg>
    );
};

export default React.memo(CommentsUploadImage);