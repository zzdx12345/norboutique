import { Image } from 'antd'
import React, { useState, useCallback } from 'react'
import Card from '../../Items/Card'
import Header from '../Share/Header'
import scss from './About.module.scss'
import { LoremIpsum } from 'lorem-ipsum'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'



export default function About() {

    const lorem = new LoremIpsum()
    const [map, setMap] = useState(null)

    const initMap = {
      style:{ width: '70%', height: '400px', margin: 'auto' },
      center: { lat: 25.014825, lng: 121.481729 }
    }

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyAlRNoDnnU1xxK11r5sSLMZzHFjwoauW_Y"
    })

    const onLoad = useCallback((map)=>{
      const bounds = new window.google.maps.LatLngBounds(initMap.center)
      map.fitBounds(bounds)
      setMap(map)
    },[])
  
    const onUnmount = useCallback((map)=>setMap(null),[])
    console.log(map);

  return (
    <div>
        <Header/>

        <div className={scss.aboutBlock}>
          <Image preview={false} src={require('../../Image/b-img/slider01.jpg')}/>
          <Card className={scss.card}>關於我們</Card>
          <div className={scss.descBlock}>
              {lorem.generateSentences(6)}
          </div>          
        </div>

        {isLoaded && 
        <GoogleMap mapContainerStyle={initMap.style} center={initMap.center}
          zoom={5} onLoad={onLoad} onUnmount={onUnmount}>
            
        </GoogleMap>}
    </div>
  )
}

