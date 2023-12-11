// import { useState } from 'react'
import React, {useEffect, useState } from 'react'
import './App.css'
import {useTrail,a } from '@react-spring/web'
import { TreeView } from './components/tree.tsx'

interface Props{
  status:boolean,
  children:any,
}

const Intro=({status,children}:Props)=>{
  const items= React.Children.toArray(children)
  const [st,setst]=useState(true)
  const [tree,showTree]=useState(false)
  const animationTrigger= status||st
  useEffect(()=>{
    if(animationTrigger===true){
      const interval=setTimeout(()=>{
        setst(animationTrigger=>!animationTrigger)
      },2200)
      return()=>clearInterval(interval)
    }
    else if(animationTrigger==false){
      setTimeout(()=>{
        showTree(true)
      },700)    
    }
  })
  const trail= useTrail(items.length,{
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: animationTrigger ? 1 : 0,
    x: animationTrigger ? 0 : 20,
    height: animationTrigger ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  // setst(animationTrigger=>!animationTrigger)
  return (
    <>
      <div>
      {!tree && trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={"trailsText"} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
      {tree && <TreeView/>}
      </div>
    </>
  )
}

export default function App(){
  return(
    <div className={"container"}>
      <>
        <Intro status={false}>
        <span>Hello,</span>
        <span>I'm Rafhly!</span>
        </Intro>
      </>
    </div>
  )
}