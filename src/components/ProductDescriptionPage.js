import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../services/StateContext';
import { getItem } from '../services/firestore';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { loadBundle } from 'firebase/firestore';
import { createIPFSLink } from '../services/utilities';

const MainContainer = styled.div`   
   padding-left: 10%;
   padding-right: 2%;
   padding-top: 2%;
   padding-bottom: 0%;
   width: 100%;
   height: 100%;
   /* background-color:var(--primary); */
   display: flex;
   overflow: hidden;
`

const ImageContainer = styled.div`   
   margin-left: 2%;
   margin-top: 3%;
   margin-bottom: 2%;
   width: 20%;
   /* background-color:green; */
`

const TextContainer = styled.div`
    margin-left: 2%;
    padding-left: 2%;
    padding-top: 1%;
    margin-top: 3%;
    margin-bottom: 2%;
    width: 60%;
    /* background-color:yellow; */
    
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
    /* float: right; */
    padding-bottom: 2%;
`

const ArtDescription = styled.div`
    font-size: 30px;   
`

const PostedTimeText = styled.div`
    font-size: 30px;   
`

/* const ArtistNameText = styled.text`
    font-size: 30px;
` */

export default function ProductDescriptionPage() {

    const {id} = useParams();
    const [ {}, dispatch ] = useStateContext();

    const [info , setInfo] = useState([]);

    useEffect(() => {
        getItem(id).then(content => setInfo(content.data()));
    }, [info]);

    // TODO: call this function when user click on add to cart
    const addItem = (item) => {
        console.log('add:', item);   

        dispatch({
            type: 'ADD_CART',
            item: item,
        });
    };

    const ipfsImageLink = createIPFSLink(id, info.FileName)
    console.log(ipfsImageLink)

    return (
        <MainContainer>
            <ImageContainer><img src={ipfsImageLink} width= "100%" height="auto"></img></ImageContainer>
            <TextContainer>
                <ArtistNameText>{info.Owner}</ArtistNameText>
                <ArtTitleText>{info.Title}</ArtTitleText>
                <ArtDescription>{info.Description}</ArtDescription>
                <PriceText>HKD${info.Price}</PriceText>
            
                <ButtonContainer>
                    <Button variant="contained" size="large">Add to Cart!</Button>
                </ButtonContainer>
            
            </TextContainer>
        </MainContainer>
        
    );
}