import { Image } from 'antd'
import React from 'react'
import Card from '../../Items/Card'
import Header from '../Share/Header'
import scss from './About.module.scss'
import { LoremIpsum } from 'lorem-ipsum'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'



export default function About() {

    const lorem = new LoremIpsum()
    const initCenter = { lat: 25.014825, lng: 121.481729 }
    const marker = { lat: 25.014885, lng: 121.481945 }
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_API_KEY
    })

    // const onLoad = useCallback((map)=>{
    //   const bounds = new window.google.maps.LatLngBounds(initCenter)
    //   map.fitBounds(bounds)
    //   setMap(map)
    // },[initCenter])
    // const onUnmount = useCallback(()=>setMap(null),[])

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
        <GoogleMap mapContainerClassName={scss.map} center={initCenter} zoom={16}>
            <Marker position={marker}/>
        </GoogleMap>}
    </div>
  )
}

