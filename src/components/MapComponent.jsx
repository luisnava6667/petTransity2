// MapComponent.js
import React from 'react'
import { GoogleMap, Marker, LoadScript, MarkerF } from '@react-google-maps/api'

const MapComponent = ({ coordinates }) => {
  const mapStyles = {
    height: '400px',
    width: '100%'
  }

  const mapOptions = {
    streetViewControl: false, // Desactiva el control de Street View
    mapTypeControl: false,
    fullscreenControl: false,
    gestureHandling: 'cooperative'
  }

  return (
    <LoadScript
      googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16}
        center={coordinates}
        options={mapOptions} // Pasar las opciones de configuración del mapa
      >
        <MarkerF position={coordinates} 
          //el title debe de
          // ser el nombre del refugio
        
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent
