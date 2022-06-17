import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slick from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Image, Rate, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import scss from './Detail.module.scss'
import db from '../../db/db.json'  // if no localhost



export default function Detail(props) {

  const {id} = props.match.params
  const [good,setGood] = useState([])
  const [nav1,setNav1] = useState(null)
  const [nav2,setNav2] = useState(null)
  
  const mainSlick = {
    speed: 500,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2
  }
  const subSlick = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: true,
    focusOnSelect: true
  }

  const payment = [
      { key: '1', label: '信用卡'},
      { key: '2', label: '銀行轉帳'},
      { key: '3', label: '門市結帳'},
  ]
  const deliver = [
    { key: '1', label: '黑貓宅急便'},
    { key: '2', label: '7-11取貨'},
  ]
  
  useEffect(()=>{
    let item = db.goods.filter(item=>item.id === id)  // if no localhost
    axios.get(`http://localhost:4000/goods?id=${id}`)
    .then(res=>setGood(res.data))
    .catch(err=>setGood(item))
  },[id])
  
  return (
    <div>
      <div className={scss.infoBlock}> 

        {good[0] && <div className={scss.picsBlock}>
          <Slick {...mainSlick} ref={nav1=>setNav1(nav1)} className={scss.slick1}>
              {good[0].pics.map((item,i)=>
                  <div key={i} className={scss.slickItem}>
                        <Image src={require(`../../${item}`)}/>
                  </div>
              )}
          </Slick>
          <Slick {...subSlick} ref={nav2=>setNav2(nav2)} className={scss.slick2}>
              {good[0].pics.map((item,i)=>
                  <div key={i}>
                    <div className={scss.slickItem}>
                        <Image preview={false} src={require(`../../${item}`)}/>
                    </div>
                  </div>
              )}
          </Slick>
        </div>}
              
        {good[0] && <div className={scss.priceBlock}>
              <div>{good[0].name}</div>
              <div>{good[0].spec}</div>
              {/* <div><Rate disabled defaultValue={5}/></div> */}
              <div>NTD : {good[0].price}</div>
              <Dropdown overlay={<Menu items={[...payment]}/>} trigger='click'>
                <div>付款方式 <DownOutlined/></div>
              </Dropdown>
              <Dropdown overlay={<Menu items={[...deliver]}/>} trigger='click'>
                <div>配送方式 <DownOutlined/></div>
              </Dropdown>
              <div>
                <Button>加入購物車</Button>
                <Button>直接購買</Button>
              </div>
        </div>}

      </div>

      {good[0] && <div className={scss.descBlock}>
        <table>
          <tbody>
            {good[0].desc && good[0].desc.map((item,i)=>
                  <tr key={i}>
                    <th>{Object.keys(item)}</th>
                    <td>{Object.values(item) || '--'}</td>
                  </tr>
            )}
          </tbody>
        </table>
      </div>}
    </div>    
  )
}
