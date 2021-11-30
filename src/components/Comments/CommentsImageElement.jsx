import React, {useState} from 'react';
import styled from "styled-components";
import Modal from "../Modal/Modal";


const Image = styled.img`
height: 200px;
width: 300px;
margin-bottom: 20px;
margin-right: 20px;
object-fit: contain;
`;

const CommentsImageElement = (props) => {
    const {file, fileName} = props;

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    };
    const handleClickClose = () => {
        setOpen(false)
    };
    return (
        <>
            <Image onClick={handleClickOpen} src={file? file : null} alt={fileName}/>
            {open && <Modal children={file} handleClickClose={handleClickClose}  header={fileName}/>}
        </>
);
};

export default React.memo(CommentsImageElement);