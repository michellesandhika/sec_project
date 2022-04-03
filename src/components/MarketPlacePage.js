import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import MarketPlaceCard from './MarketPlaceCard';

import { getItems } from '../services/firestore';
import { useStateContext } from '../services/StateContext';

const MainContainer = styled.div`   
   margin-left: 20px;
   margin-top: 3%;
   margin-right:20px;
   width: 90%;
`

function MarketPlacePage() {
    const navigate = useNavigate();
    const [ { user }, dispatch ] = useStateContext();
    const [ items , setItems ] = useState([]);

    useEffect(() => {
        getItems(user ? user.email : null).then(content => setItems(content));
    }, [user]);

    const navigatetoID = (id) => {
        const pathName = '/product/' + id
        navigate(pathName);   
    };

    return (
        <MainContainer>
            <Grid container spacing={2}>
                {items.map((data) => (
                    <Grid item xs={3} key={data.Id} onClick={() => navigatetoID(data.Id)}>
                        <MarketPlaceCard title={data.Title} description={data.Description} fileName={data.FileName} ipfsLink={data.Id} price={data.Price} />
                    </Grid>
                ))}
            </Grid>
        </MainContainer>
    );
}
  
export default MarketPlacePage;