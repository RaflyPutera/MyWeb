import styled from 'styled-components'
import { animated } from '@react-spring/web'


export const TreeContainer = styled('div')`
    background-color: #C7C7C7;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 40px;
    overflow: hidden;
    font-family: 'Outfit', sans-serif;
    font-size: 20px;
    line-height: 30px;
    --webkit-user-select: none;
    user-select: none;
    display: block;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background: ;
    `

export const Frame = styled('div')`
    overflow-y:hidden;
    position: relative;
    padding: 4px 0px 0px 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    vertical-align: middle;
    color: #24292e;
    fill: #24292e;
    `

export const Title = styled('span')`
    vertical-align: middle;
    `

export const Content = styled(animated.div)`
    will-change: transform, opacity, height;
    margin-left: 6px;
    padding: 0px 0px 0px 14px;
    border-left: 1px dashed rgba(81, 27, 130, 0.4);
    overflow: hidden;
    `

export const toggle = {
    width: '1em',
    height: '1em',
    marginRight: 10,
    cursor: 'pointer',
    verticalAlign: 'middle',
}
