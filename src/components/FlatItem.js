import { Link } from "react-router-dom";
// src/PropertyList.js
import React, { useState, useEffect } from 'react';
const FlatItem = ({slug}) => {
    useEffect(() => {
        // Configure AWS SDK
        const imageName = slug.Media[0].MediaURL.split('/').pop();
        console.log(imageName);

        slug.Media[0].MediaURL = "https://mls-property-media.s3.us-east-2.amazonaws.com/" + imageName;
        console.log(slug.Media[0].MediaURL);
      }, []);
    

    return (
    
        <div className="text-center col-lg-4 col-12 col-md-6 ">
            <div className="item">
                <div className="item-image">
                    { slug.Media && slug.Media.length > 0 && (
                    <img className="img-fluid" src={slug.Media[0].MediaURL.replace("https://s3.amazonaws.com/mlsgrid/images/","https://mls-property-media.s3.us-east-2.amazonaws.com/")} alt="flat" />
                    )}
                </div>
                <div className="item-description">
                    <div className="d-flex justify-content-between mb-3">
                        <span className="item-title">{slug.BedroomsTotal} bds |  {slug.StreetNumber} {slug.StreetName} {slug.StreetSuffix} {slug.City}, {slug.StateOrProvince}. {slug.PostalCode}
</span>
                        <span className="item-price">${slug.ListPrice}</span>
                    </div>
                    <div className="item-icon d-flex alig-items-center justify-content-between">
                        <div>
                            <i className="fas fa-check-circle"></i> <span>{slug.SubdivisionName}</span>
                        </div>
                        <div>
                            <i className="fas fa-check-circle"></i> <span> {slug.MBR_LastStatus} </span>
                        </div>
                        <Link to={`/home/${slug.StreetNumber}-${slug.StreetName}-${slug.StreetSuffix}-${slug.City}-${slug.StateOrProvince}-${slug.PostalCode}`} className="item-title">
                            <button className="btn btn-detail">View</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlatItem