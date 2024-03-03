
import Title from "./Title"
import FlatItem from "./FlatItem"
import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const FlatList = () => {

    const [properties, setProperties] = useState([]);

    const title = {
        text: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit ame"
    }

    useEffect(() => {
        // Configure AWS SDK
    
        AWS.config.update({
          region: process.env.REACT_APP_REGION, // Replace with your AWS region
          accessKeyId: process.env.REACT_APP_ACCESSKEYID, // Replace with your AWS access key ID
          secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY // Replace with your AWS secret access key
        });  
    
        // Create S3 instance
        const s3 = new AWS.S3();
    
        // Create DynamoDB instance
        const docClient = new AWS.DynamoDB.DocumentClient();
    
        // Define parameters for DynamoDB scan
        const params = {
          TableName: 'mls-grid-properties',
          ProjectionExpression: 'ListingKey, ListPrice, BedroomsTotal, StreetNumber, StreetName, StreetSuffix, City, StateOrProvince, PostalCode, SubdivisionName, MBR_LastStatus, Media', // Include Media array
        };
    
        // Fetch data from DynamoDB
        docClient.scan(params, async function(err, data) {
          if (err) {
            console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
          } else {
            console.log('Scan succeeded.');
    
            // Iterate over each property to extract image URL and pull image from S3
            for (const property of data.Items) {
            }
    
            // Set properties with image data
            setProperties(data.Items);
          }
        });
      }, []);
    
    return (
        <section className="section-all-re">
            <div className="container">
                <div className="row">
                {properties.map((property, index) => (
                    <FlatItem key={index} slug={property}/>                    
                ))}
                </div>
            </div>
        </section>
    )

}

export default FlatList;