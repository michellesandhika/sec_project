import * as React from 'react';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import MarketPlaceCard from './MarketPlaceCard';
import { useNavigate } from 'react-router-dom';
import ProductDescriptionPage from './ProductDescriptionPage';


const MainContainer = styled.div`   
   margin-left: 20px;
   margin-top: 3%;
   margin-right:20px;
   width: 90%;
`

function MarketPlacePage() {

    const navigate = useNavigate();

    /* TODO: Map the title, description and picture */
    return (
        <MainContainer>
            <Grid container spacing={2}>
                <Grid item xs={3} onClick={() => navigate('/productdescription/2')}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here moa lot of other things here moa lot of other things here moa lot of other things here moa lot of other things here mo'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>

                <Grid item xs={3}>
                    <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                </Grid>
            </Grid>
        </MainContainer>
    );
}

export default MarketPlacePage;