import React from 'react';
import styled from "styled-components";
import {FETCH_URL} from "../../configs/urls";
import {Button} from "@material-ui/core";


const LinkContainer = styled.a`
  margin-left: auto!important;
  margin-right: 20px!important;  
  text-decoration: none;

`;

const ProxyPrint = ({id}) => {
    return (
        <LinkContainer href={FETCH_URL+"/proxy/"+id}>
            <Button
                variant="contained" color="primary">
                Печать доверенности
            </Button>
        </LinkContainer>
    );
};

export default React.memo(ProxyPrint);