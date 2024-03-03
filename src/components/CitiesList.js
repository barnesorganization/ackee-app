import FlatList from "./CitiesList"
import Banner from "./Banner"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeamList from "./TeamList"
import References from "./References"
import Subscribe from "./Subscribe"
import BestFlatList from "./BestFlatList"
import AWS from 'aws-sdk';

const CitiesList=()=>{

    const { city } = useParams(); // Extract city parameter from URL
    console.log(city);
    return (
        <React.Fragment>
            <Banner/>
            <BestFlatList/>
            <Subscribe/>
            <TeamList/>
            <References/>
        </React.Fragment>
    )
}

export default CitiesList;