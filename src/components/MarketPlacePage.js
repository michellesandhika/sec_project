import * as React from 'react';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import MarketPlaceCard from './MarketPlaceCard';
import { useNavigate } from 'react-router-dom';
import { getItems, getTransactions } from '../services/firestore';
import { useState, useEffect } from 'react';
import ProductDescriptionPage from './ProductDescriptionPage';


const MainContainer = styled.div`   
   margin-left: 20px;
   margin-top: 3%;
   margin-right:20px;
   width: 90%;
`
const MarketPlacePage = () => {
    const navigate = useNavigate();
    const [ info , setInfo ] = useState([]);

    useEffect(() => {
        getItems().then(content => setInfo(content));
    }, []);

    const navigatetoID = (id) => {
        const pathName = '/productdescription/' + id
        navigate(pathName);   
    };

    return (
        <MainContainer>
            <Grid container spacing={2}>
                {info.map((data) => (
                    <Grid item xs={3} key={data.id} onClick={() => navigatetoID(data.id)}>
                        <MarketPlaceCard title={data.Name} description={data.Description} picture={''} price={data.Price}></MarketPlaceCard>
                    </Grid>
                ))}
            </Grid>
        </MainContainer>
    );
}
  

export default MarketPlacePage;