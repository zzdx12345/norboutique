import React, { useEffect, useState } from 'react'
import { Button, Image, Dropdown, Menu, notification } from 'antd';
import { DownOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import Slick from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import scss from './Detail.module.scss'
import db from '../../db/db.json'  // if no localhost



export default function Detail(props) {

  const {id} = props.match.params
  const [good,setGood] = useState([])
  const [nav1,setNav1] = useState(null)
  const [nav2,setNav2] = useState(null)
  const [dropSpan1, setDropSpan1] = useState(null)
  const [dropSpan2, setDropSpan2] = useState(null)
  
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

  const paymentWay = (
    <Menu onClick={(e)=>dropMenu(e)} key='1' items={[
      { key: '1', label: '信用卡'},
      { key: '2', label: '銀行轉帳'},
      { key: '3', label: '門市結帳'},
    ]}/>
  )
  
  const deliverWay = (
    <Menu onClick={(e)=>dropMenu(e)} key='2' items={[
      { key: '4', label: '黑貓宅急便'},
      { key: '5', label: '7-11取貨'},
    ]}/>
  )
  
  useEffect(()=>{
    let item = db.goods.filter(item=>item.id === id)  // if no localhost
    axios.get(`http://localhost:4000/goods?id=${id}`)
    .then(res=>setGood(res.data))
    .catch(err=>setGood(item))
  },[id])
  
  // percent to number 
  const toDecimal = (percent, price) => price - price * (parseFloat(percent) /100)
  
  // display final price
  const finalPrice = r => (r.discount ? 
    <span>{toDecimal(r.discount,r.price)} <i>原價{r.price}</i></span> : 
    <span>{r.price}</span>
  )
  
  // handler dropdown menu
  const dropMenu = (e) => (e.key <= 3 ? 
    setDropSpan1(e.domEvent.target.innerHTML):
    setDropSpan2(e.domEvent.target.innerHTML) 
  )
  
  // handler notification
  const toast = (placement,title) => {
    notification.info({
      icon: <CheckCircleOutlined style={{color: 'green'}}/>,
      duration: 2,
      message: title, 
      placement
    })
  }
    
  return (
    <div>
      <div className={scss.infoBlock}> 

        {/* Slick輪播 */}
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
        
        {/* 價格資訊 */}
        {/* <div><Rate disabled defaultValue={5}/></div> */}
        {good[0] && <div className={scss.priceBlock}>
          <div>{good[0].name}</div>
          <div>{good[0].spec}</div>

          <div>
            <span>優惠活動 : </span>
            <i>{good[0].discount? good[0].discount + ' Off': '目前沒有活動'}</i>
          </div>

          <div><span>NTD : {finalPrice(good[0])}</span></div>

          <Dropdown overlay={paymentWay} trigger='click'>
            <div>
              付款方式<DownOutlined/>
              {dropSpan1 && <i>目前選擇 {dropSpan1}</i>}
            </div>
          </Dropdown>

          <Dropdown overlay={deliverWay} trigger='click'>
            <div>
              配送方式<DownOutlined/>
              {dropSpan2 && <i>目前選擇 {dropSpan2}</i>}
            </div>
          </Dropdown>

          <div>
            <Button onClick={(e)=>toast('top','加入成功')}>
              加入購物車
            </Button>
            <Button onClick={()=>toast('top','正在前往結帳頁面')}>
              直接購買
            </Button>
          </div>
        </div>}

      </div>

      {/* 詳細資訊 */}
      {good[0] && <div className={scss.descBlock}>
        <table>
          <tbody>
            {good[0].desc && good[0].desc.map((item,i)=>
                  <tr key={i}>
                    <th>{Object.keys(item)}</th>
                    <td>{Object.values(item)}</td>
                  </tr>
            )}
          </tbody>
        </table>
      </div>}
    </div>    
  )
}
