import React, { useRef, useState, useEffect, createContext, useContext} from 'react'
import { useSpring, a, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { TreeContainer, Title, Frame, Content, toggle, TitleButton } from './tree.ts'
import * as Icons from './treeIcons.tsx'
import { ContentContainer,ContentFile } from '../content/content.ts'
import { easings } from '@react-spring/web'
import { ContentInfo } from '../content/contentFile.tsx'


function usePrevious<T>(value: T) {
    const ref = useRef<T>()
    useEffect(() => void (ref.current = value), [value])
    return ref.current
}

const Tree = React.memo<
    React.HTMLAttributes<HTMLDivElement> & {
        defaultOpen?: boolean
        name: string | JSX.Element
    }
    >(({ children, name, style, defaultOpen = false }) => {
        const [isOpen, setOpen] = useState(defaultOpen)
        const previous = usePrevious(isOpen)
        const [ref, { height: viewHeight }] = useMeasure()
        const { height, opacity, y } = useSpring({
            from: { height: 0, opacity: 0, y: 0 },
            to: {
                height: isOpen ? viewHeight : 0,
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 20,
            },
        })
    // @ts-ignore
    const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
    // const context=useContext(ButtonSelectionContext);
    const context=useContext(ButtonSelectionContext)
    if(!context){
        return(<div>no context</div>)
    }
    const {setButtonStates} = context
    return (
        <Frame>
        <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => {
            setOpen(!isOpen)
            if(isOpen==true){
                if(name=== "A"){
                    setButtonStates([false,false,false])
                }
            }
        }}/>
        <Title style={style}>{name}</Title>
        <Content
            style={{
                opacity,
                height: isOpen && previous === isOpen ? 'auto' : height,
            }}>
            <a.div ref={ref} style={{ y }} children={children} />
        </Content>
        </Frame>
    )
})

interface ContextProps{
    buttonStates:boolean[],
    setButtonStates:React.Dispatch<React.SetStateAction<boolean[]>>
}

export const ButtonSelectionContext = createContext<ContextProps | undefined>(undefined);

const TreeButton = (props:{keyID:number,name:string,buttonStates:boolean[],setButtonStates:React.Dispatch<React.SetStateAction<boolean[]>>}) => {
    const HandleButtonSelect=(()=>{
        props.setButtonStates((prevStates) =>
            prevStates.map((prevState, index) => {
                if (index + 1 === props.keyID) {
                    return !prevState;
                }
                else {
                    return false;
                }
            })
        );
    })

    return (
        <div style={{ display: "flex", verticalAlign: "center" }}>
        <span style={{ position: "relative", top: "4px" }}><Icons.ButtonIcon /></span>
        <TitleButton active={props.buttonStates[props.keyID-1]}  onClick={HandleButtonSelect}>{props.name}</TitleButton>
        </div>
    );
}

export const TreeView = ()=>{
    const spring = useSpring({
        from:{opacity:0},
        to:{opacity:1},
    })

    const [buttonStates, setButtonStates] = useState<boolean[]>([false, false, false]);

    const targetX = buttonStates.some((state) => state) ? -200 : 0;
    const targetX2 = buttonStates.some((state) => state) ? 200 : 0;

    const fileOpen=useSpring({
        from: { x: 0},
        to: { x: targetX},
        config: { duration: 400,easing:easings.easeInOutSine }
    })
    const contentOpen=useSpring({
        from: { x: 0,},
        to: { x:targetX2,},
        config: { duration: 400,easing:easings.easeInOutSine}
    })

    const OpacityTarget = buttonStates.some((state) => state) ? 1 : 0
    const HeightTarget = buttonStates.some((state) => state) ? 600 : 100

    
    const contentFile=useSpring({
        from: {opacity:0,height:0},
        to: {opacity:OpacityTarget,height:HeightTarget},
        config:{duration:600, easing:easings.easeInBack}
    })

    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <animated.div style={spring}>
                <animated.div style={fileOpen}>
                    <ButtonSelectionContext.Provider value={{buttonStates,setButtonStates}}>
                        <TreeContainer>
                            {/* <h2>Learn more about me.</h2> */}
                            <Tree name="A">
                                <TreeButton keyID={1} name="ABm" buttonStates={buttonStates} setButtonStates={setButtonStates}></TreeButton>
                                <TreeButton keyID={2} name="In" buttonStates={buttonStates} setButtonStates={setButtonStates}></TreeButton>
                                <TreeButton keyID={3} name="SK" buttonStates={buttonStates} setButtonStates={setButtonStates}></TreeButton>

                                <Tree name="Description"/>
                                <Tree name="hello" />
                                    <Tree name="subtree with children">
                                        <Tree name="hello" />
                                            <Tree name="sub-subtree with children">
                                                <Tree name="child 1" style={{ color: '#37ceff' }} />
                                                <Tree name="child 2" style={{ color: '#37ceff' }} />
                                                <Tree name="child 3" style={{ color: '#37ceff' }} />
                                                {/* <Tree name="custom content">
                                        <div
                                            style={{
                                            position: 'relative',
                                            width: '100%',
                                            height: 200,
                                            padding: 10,
                                            }}>
                                        <div
                                            style={{
                                            width: '100%',
                                            height: '100%',
                                            background: 'black',
                                            borderRadius: 5,
                                            }}/>
                                        </div>
                                                </Tree> */}
                                            </Tree>
                                    </Tree>
                                <Tree name={<span>something something</span>} />
                            </Tree>
                            <Tree name="C">
                                <div style={{marginTop:'10px'}}>
                                    <Icons.GithubIcon width={20} height={20}/><a href="" style={{marginLeft:'10px'}}>Github</a>
                                </div>
                                <div style={{marginTop:'10px'}}>
                                    <Icons.LinkedInIcon width={20} height={20} /><a href="" style={{marginLeft:'10px'}}>LinkedIn</a>
                                </div>
                                <div style={{marginTop:'10px',height:'40px'}}>
                                    <Icons.MailIcon width={20} height={20}/><a href="" style={{marginLeft:'10px'}}>rafly.s.putera@gmail.com</a>
                                </div>
                            </Tree>
                        </TreeContainer>
                    </ButtonSelectionContext.Provider>
                </animated.div>
            </animated.div>
            <ContentContainer style={contentOpen}>
                <ContentFile style={contentFile}>
                    <ContentInfo ActiveButton={buttonStates}></ContentInfo>
                </ContentFile>
            </ContentContainer>
        </div>
    )
}