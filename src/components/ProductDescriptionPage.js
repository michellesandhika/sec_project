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

const MainContainer = styled.div`   
   margin-left: 2%;
   margin-right: 2%;
   margin-top: 3%;
   width: 96%;
   background-color:var(--primary);
   display: flex
`

const ImageContainer = styled.div`   
   margin-left: 2%;
   margin-top: 3%;
   margin-bottom: 2%;
   width: 30%;
   background-color:yellow;
`

const TextContainer = styled.div`
    margin-left: 2%;
    padding-left: 2%;
    padding-top: 1%;
    margin-top: 3%;
    margin-bottom: 2%;
    width: 60%;
    background-color:yellow;
    
`

const ArtistNameText = styled.div`
    padding-top: 8%;
    font-size: 30px;
`

const ArtTitleText = styled.div`
    padding-top: 10px; 
    font-size: 50px;
`

const PriceText = styled.div`
    padding-top: 30px;
    font-size: 40px;   
`

const ButtonContainer = styled.div`
    margin-top: 8%;
    margin-right: 5%;
    float: right;
    padding-bottom: 2%;
`

/* const ArtistNameText = styled.text`
    font-size: 30px;
` */

export default function ProductDescriptionPage() {

    const {id} = useParams();
    const [ {}, dispatch ] = useStateContext();

    const [info , setInfo] = useState([]);

    useEffect(() => {
        console.log("try", info);
    }, [info]);


    window.addEventListener('load', () => {
        Fetchdata(id)
    });

    const Fetchdata = (id) =>{
        getItem(id).then(doc => {
            console.log(doc.data())
            setInfo(doc.data());
          });
    }


    // TODO: call this function when user click on add to cart
    const addItem = (item) => {
        console.log('add:', item);   

        dispatch({
            type: 'ADD_CART',
            item: item,
        });
    };

    return (
        <MainContainer>
            <ImageContainer>{info.Image}lk</ImageContainer>
            <TextContainer>
                <ArtistNameText>hello</ArtistNameText>
                <ArtTitleText>{info.Name}</ArtTitleText>
                <PriceText>HKD${info.Price}</PriceText>
            
                <ButtonContainer>
                    <Button variant="contained" size="large">BuyNow!</Button>
                </ButtonContainer>
            
            </TextContainer>
        </MainContainer>
        
    );
}