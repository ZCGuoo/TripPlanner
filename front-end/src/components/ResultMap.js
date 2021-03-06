import "../css/ResultMap.css"
import {GoogleMap,Marker, withGoogleMap, withScriptjs,DirectionsRenderer } from 'react-google-maps'
const ResultMap=(props)=>{
  const MapComponent=()=>{
    return( 
      <GoogleMap
        defaultCenter={new window.google.maps.LatLng(props.hotel.lat, props.hotel.lng)}
        defaultZoom={17}
        id="map"
      >
      <Marker key={0} position={{lat:props.hotel.lat, lng:props.hotel.lng}} label={{text:props.hotel.name, fontSize:"18px", fontWeight:"bold"}}></Marker>
      {props.actiData.map((d, idx)=>(
        <Marker key={idx+1} position={{lat:d.lat, lng:d.lng}} label={{text:d.name, fontSize:"18px", fontWeight:"bold"}}></Marker>
      ))}
      <DirectionsRenderer directions={props.dir} options={{suppressMarkers: true}}/>
      </GoogleMap> 
    )}
    const WrappedMap=withScriptjs(withGoogleMap(MapComponent));
    return(
      <div className="map_page">
        <div className="dayNum">
          <h1>Map for day {props.dayNum}</h1>
        </div>
        <div style={{height:'100%', width:'70%'}}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
        </div> 
    </div>
  )
}

export default ResultMap
