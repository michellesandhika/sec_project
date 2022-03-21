import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../services/StateContext';

export default function ProductDescriptionPage() {
    const {id} = useParams();
    const [ {}, dispatch ] = useStateContext();

    // TODO: call this function when user click on add to cart
    const addItem = (item) => {
        console.log('add:', item);   

        dispatch({
            type: 'ADD_CART',
            item: item,
        });
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <></>
                <CardMedia
                    component='img'
                    height='140'
                    image='/static/images/cards/contemplative-reptile.jpg'
                    alt='green iguana'
                />

                <CardContent>

                <Typography gutterBottom variant='h5' component='div'>
                    {id}
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                    talking random thing here
                </Typography>
                
                
                </CardContent>
            </CardActionArea>
        </Card>
    );
}