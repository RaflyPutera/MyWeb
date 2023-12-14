import styled from 'styled-components'
import { animated } from '@react-spring/web'

export const ContentContainer=styled(animated.div)`
    align-items:center;
    display:flex;
    // opacity:1;
    justify-content:center;
    position:absolute;
    // background-color:white;
    height:auto;
    z-index:-1;
`
export const ContentFile=styled(animated.div)`
    padding:20px;
    display:flex;
    background-color:#C7C7C7;
    border-radius:20px;
    width:300px;
    height:300px;
    z-index:-1;
`
