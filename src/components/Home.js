import FlatList from "./FlatList"
import Banner from "./Banner"
import React, { useState, useEffect } from 'react';
import TeamList from "./TeamList"
import References from "./References"
import Subscribe from "./Subscribe"
import BestFlatList from "./BestFlatList"
import AWS from 'aws-sdk';

const Home=()=>{
    return (
        <React.Fragment>
            <FlatList/>
            <BestFlatList/>
            <Subscribe/>
            <TeamList/>
            <References/>
        </React.Fragment>
    )
}

export default Home;