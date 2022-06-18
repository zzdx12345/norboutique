import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons'
import { withRouter } from 'react-router-dom'



function Header(props) {

    const logo1 = require('../../Image/b-img/logo1.png')
    const [searchState,setSearchState] = useState(false)

    const menus = [
        {title: 'Home'},
        {title: 'NewArrive',subTitle: [
            '全部商品','Hermes','LouisVuitton','Chanel','Gucci'
        ]},
        {title: 'Shopping',subTitle: [
            '現貨區','預定區','單季折扣'
        ]},
        {title: 'About'},
        {title: 'Account',subTitle: [
            '會員中心','訂單查詢','購買紀錄','LogOut'
        ]},
        {title: 'Support',subTitle: [
            '聯繫我們','線下據點'
        ]}
    ]

    const jumpTo = (item) => {
        props.history.push(item.toLowerCase())
    }

  return (
    <Box>
        <img src={logo1} alt=''/>
          
        <IconBox state={searchState}>
            <div className='inputBar'>
                <SearchOutlined  onClick={()=>setSearchState(!searchState)}/>
                <input/>
                <div/>
            </div>
            <ShoppingCartOutlined/>
            <UserOutlined/>
        </IconBox>

        <MenuBox>
            {menus.map((item,i)=>
                <MenuItems key={i} onClick={()=>jumpTo(item.title)}>
                    {item.title}
                    {item.subTitle &&
                        <div className='subItems'>
                            {item.subTitle.map((title,i)=>
                                <div key={i}>{title}</div>
                            )}
                        </div>
                    }
                </MenuItems>
            )}
        </MenuBox>
    </Box>
  )
}

const Box = styled.div`
    width: 90%;
    margin: auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
        img{
            width: 40%;
        }
`
const IconBox = styled.div`
    position: absolute;
    top: 5%;
    right: 5%;
    display: flex;
    .inputBar{
        width: ${props=>props.state? '180px': '40px'};
        display: flex;
        align-items: center;
        overflow: hidden;
        transition: 0.5s;
        input{
            width: 140px;
            height: 15px;
            padding: 10px;
            position: relative;
            &::after{
                content: '';
                width: 100px;
                height: 2px;
                background-color: red;
            }
        }
    }
    span{
        margin: 10px;
        color: rgb(120,120,120);
        cursor: pointer;
        font-size: 20px;
        transition: 0.5s;
        &:hover{
            transform: scale(1.2);
        }
    }
`
const MenuBox = styled.div`
    width: 90%;
    margin-top: 60px;
    display: flex;
    justify-content: space-evenly;
`
const MenuItems = styled.div`
    margin: 10px auto;
    font-size: 20px;
    letter-spacing: 2px;
    position: relative;
    transition: 0.5s;
    overflow: hidden;
    cursor: pointer;
    &:hover{
        letter-spacing: 4px;
        color: rgb(255,195,60);
        overflow: visible;
        .subItems{
            color: initial;
            padding: 10px;
            border: 1px solid rgb(220,220,220);
        }
    }
        .subItems{
            background: white;
            letter-spacing: 2px;
            position: absolute;
            font-size: 16px;
            left: 0%;
            right: 0%;
            transition: 0.5s;
            z-index: 1;
            text-align: center;
            div{
                transition: 0.5s;
                margin: 10px auto;
                text-align: center;
                cursor: pointer;
                &:hover{
                    color: rgb(255,195,60);
                }
            }
        }
`

export default withRouter(Header)