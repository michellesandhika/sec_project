import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styled from '@emotion/styled';

import ProductDescriptionPage from './ProductDescriptionPage';

const PriceArea = styled.div`
    font-size:20px;
    text-align: right;
    margin-top: 5%;
    display: block;

`

const CardArea = styled.div`
    width: 80%;
    float:left;
    padding-bottom: 10px;
    /* background-color: yellow; */
`

const PriceText = styled.text`
    text-align:right;
`

export default function MarketPlaceCard(props) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component='img'
                height='140'
                image='/static/images/cards/contemplative-reptile.jpg'
                alt='green iguana'
                />

                <CardContent>

                <CardArea>
                <Typography gutterBottom variant='h5' component='div'>
                    {props.title}
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                    {props.description}
                </Typography>
                
                </CardArea> 

                <PriceArea>
                    <PriceText>$ {props.price}</PriceText>
                </PriceArea>
                

                


                </CardContent>
            </CardActionArea>
        </Card>
    );
}