import * as React from 'react';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import MarketPlaceCard from './MarketPlaceCard';
import ProductDescriptionPage from './ProductDescriptionPage';


const MainContainer = styled.div`   
   margin-left: 20px;
   margin-top: 20px;
   margin-right:20px;
   width: 90%;
   background-color:red;
`

function MarketPlacePage() {
    return (
        <MainContainer>
            <Grid container spacing={2}>
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