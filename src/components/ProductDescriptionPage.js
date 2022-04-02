import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import styled from '@emotion/styled';

import { getItem } from '../services/firestore';
import { createIPFSLink } from '../services/utilities';
import { useStateContext } from '../services/StateContext';

const MainContainer = styled.div`   
    padding-left: 8%;
    padding-right: 2%;
    padding-top: 2%;
    padding-bottom: 0%;
    height: 100%;
    width: 90%;
    display: flex;
    overflow: hidden;
`

const ImageContainer = styled.div`   
    margin-left: 2%;
    margin-top: 3%;
    margin-bottom: 2%;
    width: 20%;
`

const TextContainer = styled.div`
    margin-left: 2%;
    padding-left: 2%;
    padding-top: 1%;
    margin-top: 3%;
    margin-bottom: 2%;
    width: 60%;
`

const ArtistNameText = styled.div`
    padding-top: 8%;
    font-size: 20px;
`

const ArtTitleText = styled.div`
    padding-top: 10px; 
    font-size: 50px;
    font-weight: bold;
`

const PriceText = styled.div`
    padding-top: 30px;
    font-size: 40px;   
`

const ButtonContainer = styled.div`
    margin-top: 8%;
    margin-right: 5%;
    padding-bottom: 2%;
`

const ArtDescription = styled.div`
    font-size: 30px;   
`

function ProductDescriptionPage() {
    const { id } = useParams();
    const [ {}, dispatch ] = useStateContext();
    
    const [ info , setInfo ] = useState([]);
    const [ dialog, setDialog ] = useState(false);
    
    const ipfsImageLink = createIPFSLink(id, info.FileName);

    useEffect(() => {
        getItem(id).then(content => setInfo(content.data()));
    }, [id]);
    
    const addItem = (item) => {  
        dispatch({
            type: 'ADD_CART',
            id: id,
            item: item,
        });

        setDialog(true);
    };

    return (
        <MainContainer>
            <ImageContainer><img src={ipfsImageLink} alt={info.Title} width= '100%' height='auto'></img></ImageContainer>
            <TextContainer>
                <ArtistNameText>Owner: {info.Owner}</ArtistNameText>
                <ArtTitleText>{info.Title}</ArtTitleText>
                <ArtDescription>{info.Description}</ArtDescription>
                <PriceText>HKD${info.Price}</PriceText>
                <ButtonContainer>
                    <Button onClick={() => addItem(info)} variant='contained' size='large'>Add to Cart</Button>
                </ButtonContainer>
            </TextContainer>

            <Dialog open={dialog} onClose={() => setDialog(false)} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>Item has been added to the cart.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog(false)} variant='outlined'>Close</Button>
                </DialogActions>
            </Dialog>
        </MainContainer>
    );
}

export default ProductDescriptionPage;