import { animated } from "@react-spring/web"

export const ContentInfo = (props:{ActiveButton:boolean[]})=>{
    let info:string=''
    let header:string=''

    if(props.ActiveButton[0]===true){
        header="Selected header 1"
        info="this is text number one where this is text number one where this is text number one where this is text number one where this is text number one where"
        {}
    }
    else if(props.ActiveButton[1]===true){
        header="Selected header 2"
        info="selected 2"
    }
    return(
        <div>
            <div style={{marginTop:'10px',fontFamily:'Outfit', fontSize:'22px'}}>{header}</div>
            <animated.div style={{marginTop:'30px',fontFamily:'Outfit',fontSize:'18px'}}>{info}</animated.div>
        </div>
    )
}