import SubdivisionList from "./SubdivisionList"
import Banner from "./Banner"
import React, { useState, useEffect } from 'react';
import TeamList from "./TeamList"
import References from "./References"
import Subscribe from "./Subscribe"
import BestFlatList from "./BestFlatList"
import AWS from 'aws-sdk';
import { useParams } from 'react-router-dom';

const Subdivision=()=>{
    const { subdivision } = useParams(); // Extract city parameter from URL
    useEffect(() => {
        console.log(subdivision);
    });

    return (
        <React.Fragment>
            <SubdivisionList slug={subdivision} />
            <BestFlatList/>
            <Subscribe/>
            <TeamList/>
            <References/>
        </React.Fragment>
    )
}

export default Subdivision;