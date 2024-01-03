import React, { useState } from 'react'
import axios from 'axios'

const LocationAutocomplete = ({ setCoordinates }) => {
  const [address, setAddress] = useState('')

  const handleChange = async (e) => {
    const inputAddress = e.target.value
    setAddress(inputAddress)

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${inputAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
      const location = response.data.results[0].geometry.location
      setCoordinates(location)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <input
      id='direccion'
      name='direccion'
      type='text'
      value={address}
      onChange={handleChange}
      placeholder='Dirección del Refugio'
      required
      className={`block w-[31.5rem] h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
      focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
      />
      )
    }
    // ${
    //   touched.direccion && errors.direccion
    //     ? 'ring-red-500  focus:ring-red-500'
    //     : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
    // } 

export default LocationAutocomplete
