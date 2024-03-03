import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom';
import AWS from 'aws-sdk';

const FlatDetail = () => {
    const images = [
        {
            original: '/img/product1.jpeg',
            thumbnail: '/img/product1.jpeg',
        },
        {
            original: '/img/banner.jpg',
            thumbnail: '/img/banner.jpg',
        },
        {
            original: '/img/product1.jpeg',
            thumbnail: '/img/product1.jpeg',
        },
    ];

    const { address } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        // Extract address components from URL parameter
        const [streetNumber, streetName, streetSuffix, city, stateOrProvince, postalCode] = address.split('-');
    
        document.title = `${streetNumber} ${streetName} ${streetSuffix} ${city}`
        console.log(streetNumber);
        console.log(streetName);
        console.log(streetSuffix);
        console.log(city);
        console.log(stateOrProvince);
        console.log(postalCode);
        
        // Configure AWS SDK
        AWS.config.update({
            region: process.env.REACT_APP_REGION, // Replace with your AWS region
            accessKeyId: process.env.REACT_APP_ACCESSKEYID, // Replace with your AWS access key ID
            secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY // Replace with your AWS secret access key
        });  
      
        // Create DynamoDB instance
        const docClient = new AWS.DynamoDB.DocumentClient();
    
        const params = {
          TableName: 'mls-grid-properties',
          FilterExpression: 'StreetNumber = :streetNumber AND StreetName = :streetName AND StreetSuffix = :streetSuffix AND City = :city AND StateOrProvince = :stateOrProvince AND PostalCode = :postalCode',
          ExpressionAttributeValues: {
            ':streetNumber': streetNumber,
            ':streetName': streetName,
            ':streetSuffix': streetSuffix,
            ':city': city,
            ':stateOrProvince': stateOrProvince,
            ':postalCode': postalCode
          }
        };
    
        // Query data from DynamoDB
        docClient.scan(params, function(err, data) {
          if (err) {
            console.error('Unable to query the table. Error JSON:', JSON.stringify(err, null, 2));
          } else {
            console.log('Query succeeded.');
            if (data.Items.length > 0) {
              setProperty(data.Items[0]); // Assuming only one property matches the query
            } else {
              console.log('No property found for the specified address.');
            }
          }
        });
      }, [address]);

    return (
        <div className="flat-detail">
            <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title"></h1>
                            <h2 className="page-description">Nice</h2>
                        </div>
                    </div>
                </div>
            </div>
            {property ? (
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="fd-top flat-detail-content">
                            <div>
                                <h3 className="flat-detail-title">{property.BedroomsTotal} beds, {property.BathroomsTotalInteger} baths, {property.BuildingAreaTotal} sqft   </h3>
                                <p className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                {property.StreetNumber} {property.StreetName} {property.StreetSuffix} {property.City}, {property.StateOrProvince}. {property.PostalCode}</p>
                            </div>
                            <div>
                                <span className="fd-price">${property.ListPrice}</span>
                            </div>
                        </div>
                        <ImageGallery flickThreshold={0.50} slideDuration={0} items={property.Media.map(media => ({original: media.MediaURL.replace("https://s3.amazonaws.com/mlsgrid/images/", "https://mls-property-media.s3.us-east-2.amazonaws.com/"),thumbnail: media.MediaURL.replace("https://s3.amazonaws.com/mlsgrid/images/", "https://mls-property-media.s3.us-east-2.amazonaws.com/")}))} showNav={false} showFullscreenButton={false} showPlayButton={false} />
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="fd-item">
                                    <h4>Description</h4>
                                    <p>{property.PublicRemarks}</p>
                                </div>
                                <div className="fd-item fd-property-detail">
                                    <h4>Property Details</h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>{property.PropertySubType}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Year Built: {property.YearBuilt}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>{property.LotSizeAcres} Acres lot</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>Kitchen: </span>
                                            <span>{property.ListingKey}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>{property.SubdivisionName}</span>
                                            <span>5</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Kitchen:  </span>
                                            <span>1</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>Kitchen: </span>
                                            <span>1</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>All Rooms: </span>
                                            <span>5</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Kitchen:  </span>
                                            <span>1</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fd-item fd-features">
                                    <h4>Rooms</h4>
                                    <div className="row">
                                        
                                        {property.Rooms.map((rooms, index) => (
                                        <div className="col-lg-4" key={index}>
                                            <i className="fa fa-check"></i>
                                            <span>{rooms.RoomType}:</span>
                                            <span>{rooms.RoomDimensions}</span>
                                        </div>
                                        
                                        ))}
                                    </div>
                                </div>
                                <div className="fd-item">
                                    <h4>Maps</h4>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15105200.564429!2d37.91245092855647!3d38.99130948591772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b0155c964f2671%3A0x40d9dbd42a625f2a!2zVMO8cmtpeWU!5e0!3m2!1str!2str!4v1630158674074!5m2!1str!2str" width="100%" height="450" loading="lazy"></iframe>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="fd-sidebar-item">
                                    <h4>Recently Added</h4>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                </div>
                                <div className="fd-sidebar-item">
                                    <h4>Category</h4>
                                    <ul className="category-ul">
                                        <li>Subdivision: {property.SubdivisionName}</li>
                                        <li>Category 2</li>
                                        <li>Category 3</li>
                                        <li>Category 4</li>
                                        <li>Category 5</li>
                                    </ul>
                                </div>
                                <div className="fd-sidebar-item">
                                    <h4>Recently Added</h4>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : ( <p>Loading</p>) };
        </div>
    )
}

export default FlatDetail