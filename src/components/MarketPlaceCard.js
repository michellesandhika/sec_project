import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styled from '@emotion/styled';

import ProductDescriptionPage from './ProductDescriptionPage';

const PriceArea = styled.div`
    float:right;
    /* background-color: red; */
    width: 10%;
    font-size:20px;
    padding-right: 10px;
    align-items: center;
    margin-top: 5%

`

const CardArea = styled.div`
    width: 80%;
    /* background-color:green; */
    float:left;
    padding-bottom: 10px;
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
                    $100
                </PriceArea>
                

                


                </CardContent>
            </CardActionArea>
        </Card>
    );
}