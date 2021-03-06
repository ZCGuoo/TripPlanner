import "../css/SingleResult.css"
import React, {useEffect, useState}  from 'react'; 
import Header from "../components/Header"; 
import Footer from "../components/Footer"

import {GoogleMap,Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import { useSearchParams, createSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
const axios=require('axios')
function SingleResult(){
    const [searchParams]=useSearchParams()
    const [hotel, setHotel]=useState({})
    const navigate=useNavigate()
    const getHotel=async()=>{
        const res=await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/getSingleHotel`,{name:searchParams.get("hotel"), city: searchParams.get("destination")})
        const hotelFetched=res.data
        setHotel(hotelFetched)
    }
    const MapComponent=()=>{
        return(
          <GoogleMap
            defaultCenter={new window.google.maps.LatLng(hotel.lat,hotel.lng)} defaultZoom={13} id="hotelMap">
          <Marker key={0} position={{lat:hotel.lat, lng:hotel.lng}} label={{text:hotel.name, fontSize:"18px", fontWeight:"bold"}}></Marker>
          </GoogleMap> 
    )}
    const WrappedMap=withScriptjs(withGoogleMap(MapComponent));
    const toActivities=()=>{
        const params={hotel: hotel.name, destination: searchParams.get("destination"), duration: searchParams.get("duration"), startDate: searchParams.get("startDate"), endDate: searchParams.get("endDate") }
        navigate({pathname:"/hotelToTrip", search:`?${createSearchParams(params)}`})
    }
    useEffect(()=>{
        getHotel()
    },[])
    return (
        <div>
            <Header/>
            <div className="hotelDisplay">
                <div className="topContent">
                    <h2 className="price">{"Price: $"+hotel.price}</h2>
                    <h2 className="rating">{"Rating: "+hotel.rating}</h2>
                    <h1 className="singleName">{hotel.name}</h1>
                </div>
                <div className="bottomContent">
                <div className="leftContent1">
                    <h2 className="description">Description: </h2>
                    <p className="blurb">{hotel.blurb}</p>
                    <h2 className="amenities">Amenities: </h2>
                    {hotel.amenity && <p className="amenitiesContent"> {"Amenities   : "+hotel.amenity.join(", ")} </p>}
                </div>
                <div className="rightContent1">
                    <div className="hotelMap" >
                        <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: '100%' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                        />
                    </div> 
                </div>
                </div>
            </div>
            <div className="links">
                <a target="_blank" rel="noreferrer" href={hotel.link} className="bookLink">
                    Book a Room
                </a>
                <div className="tripLink" onClick={()=>{toActivities()}}>Proceed to choose activities</div>
            </div>
            <Footer className="ftr"/>
        </div>
    )
}
        
export default SingleResult