import React from 'react'
import styled from 'styled-components'



export default function Btn(props) {
  return (
    <Box style={{'--clr':props.clr}}>
        <span>button</span>
        <i></i>
    </Box>
  )
}

const Box = styled.div`
    margin-top: 50px;
    width: 120px;
    padding: 10px 20px;
    background: rgb(69,67,69);
    color: white;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 1.2px;
    position: relative;
    text-align: center;
    &:hover{
        letter-spacing: 3.5px;
        width: 140px;
        background: var(--clr);
        box-shadow: 0 0 35px var(--clr);
    }
    &::before{
        content: '';
        position: absolute;
        inset: 2px;
        background: rgb(40,39,46);
    }
        span{
            position: relative;
            z-index: 1;
            font-family: 'Rubik', sans-serif;
        }
        i{
            position: absolute;
            inset: 0;
            &::before{
                content: '';
                position: absolute;
                border: 1.5px solid wheat;
                background: rgb(40,39,46);
                width: 10px;
                height: 5px;
                top: -3.5px;
                left: 80%;
                transition: 0.5s;
            }
        }
    &:hover i::before{
        width: 15px;;
        left: 20%;
        border: 1px solid var(--clr);
    }
        i{
            position: absolute;
            inset: 0;
            &::after{
                content: '';
                position: absolute;
                border: 1.5px solid wheat;
                background: rgb(40,39,46);
                width: 10px;
                height: 5px;
                bottom: -3.5px;
                right: 80%;
                transition: 0.5s;
            }
        }
    &:hover i::after{
        width: 15px;;
        right: 20%;
        border: 1px solid var(--clr);
    }
`