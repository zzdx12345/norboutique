import styled from "styled-components";



function Card (props) {

    return (
        <Box className={props.className}>
            {props.children}
        </Box>
    )
}

const Box = styled.div`
  width: ${props=>props.w || '60%'};
  height: ${props=>props.h || ''};
  padding: ${props=>props.pd || '30px'};
  margin: ${props=>props.mg || '40px auto'};
  background: ${props=>props.bg || 'rgb(220,220,220)'};
`

export default Card