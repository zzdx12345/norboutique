import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Carousel, Image } from 'antd'
import Header from '../Share/Header'
import Slick from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import scss from './Home.module.scss'
import db from '../../db/db.json' 




export default function Home(props) {

    const banners = () => {
        let items = []
        for(let i=1; i<=6; i++)
        items.push({url: require(`../../Image/img/ziped/banner0${i}.jpg`)})
        return items
    }

    const poster1 = require('../../Image/b-img/poster1.jpg')
    const poster2 = require('../../Image/b-img/poster2.jpg')
    const [goodsArr1,setGoodArr1] = useState([])

    const carouselSettings= {
        pauseOnDotsHover: true,
        autoplay: true,
        dotPosition: 'right',
    }
    const slickSettings = {
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4
    }

    useEffect(()=>{
        axios.get('http://localhost:4000/goods').then(res=>setGoodArr1(res.data)).catch(err=>setGoodArr1(db.goods))
    },[])

    const goToDetail = (item,e) => {
        props.history.push(`/detail/${item.id}`)
        e.stopPropagation()
    }

  return (
    <div>

        <Header/>

        <div className='container'>

            {/* Antd輪播 */} 
            <Carousel {...carouselSettings} className={scss.antdBanner}>
                {banners().map((item,i)=>
                    <div key={i}>
                        <Image width={'100%'} src={item.url} alt=''/>
                    </div>
                )}
            </Carousel>

            {/* 銷售選項卡 */}
            <div className={scss.sellBox}>
                <img src={poster1} alt=''/>
                <img src={poster2} alt=''/>
            </div>

            <div className={scss.hot}>熱門商品</div>

            {/* Slick商品輪播 */}
            <Slick {...slickSettings} className={scss.slickSlider}>
                {goodsArr1.map((item)=>
                    <div key={item.id} >
                        <div className={scss.slickItem}>
                            <img src={require(`../../${item.pics[0]}`)} alt=''
                            onClick={(e)=>goToDetail(item,e)}/>
                            <p>{item.name}</p>
                        </div>
                    </div>
                )}
            </Slick>
            
        </div>
    </div>
  )
}
