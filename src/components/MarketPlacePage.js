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
  
    const [info , setInfo] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     setInfo(info);
    // }, [info]);
  
    // Start the fetch operation as soon as
    // the page loads


    window.addEventListener('load', () => {
        Fetchdata();
    });

    function navigatetoID(id){
        var pathName = '/productdescription/' + id
        navigate(pathName)
        
    }

    const Fetchdata = ()=>{
        getItems().then((querySnapshot) => {
             
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element;
                setInfo(arr => [...arr , data]);
                  
            });
        })
        console.log(info)
    }

    return (
        <MainContainer>
            <Grid container spacing={2}>
                {
                    info.map((data) => (
                        <Grid item xs={3} key={data.id} onClick={() => navigatetoID(data.id)}>
                            <MarketPlaceCard title={data.Name} description={data.Description} picture={''}></MarketPlaceCard>
                        </Grid>
                    ))
                }
            </Grid>
        </MainContainer>
    );
}
  

export default MarketPlacePage;