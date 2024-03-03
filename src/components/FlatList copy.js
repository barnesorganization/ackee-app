
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
          ProjectionExpression: 'ListingKey,StreetNumber, StreetName, StreetSuffix, City, StateOrProvince, PostalCode, BedroomsTotal, Media' // Include Media array
        };
    
        // Fetch data from DynamoDB
        docClient.scan(params, async function(err, data) {
          if (err) {
            console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
          } else {
            console.log('Scan succeeded.');
    
            // Iterate over each property to extract image URL and pull image from S3
            for (const property of data.Items) {
              if (property.Media && property.Media.length > 0) {
                const mediaUrl = property.Media[0].MediaURL;
                const imageName = mediaUrl.substring(mediaUrl.lastIndexOf('/') + 1);
    
                try {
                  // Fetch image from S3
                  const s3Params = {
                    Bucket: 'mls-property-media',
                    Key: imageName
                  };
                  console.log(s3Params.Key);
                  const image = await s3.getObject(s3Params).promise();
    
                  // Update property with image data
                  property.imageData = `data:image/jpeg;base64,${image.Body.toString('base64')}`;
                } catch (error) {
                  console.error('Error fetching image from S3:', error);
                }
              }
            }
    
            // Set properties with image data
            setProperties(data.Items);
          }
        });
      }, []);
    
    return (
        <section className="section-all-re">
            <div className="container">
            {properties.map((property, index) => (
                <Title title={title.text} description={title.description} />
                <div className="row"  key={index}>
                    
                    <FlatItem slug="lorem-ipsum-1" />
                    <FlatItem slug="lorem-ipsum-2" />
                    <FlatItem slug="lorem-ipsum-3" />
                    <FlatItem slug="lorem-ipsum-4" />
                    <FlatItem slug="lorem-ipsum-5" />
                    <FlatItem slug="lorem-ipsum-6" />  
                </div>
            </div>
        </section>
    )

}

export default FlatList;