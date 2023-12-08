import React, { useRef, useState, useEffect } from 'react'
import { useSpring, a, Any, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { TreeContainer, Title, Frame, Content, toggle } from './tree.ts'
import * as Icons from './treeIcons.tsx'

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
    interface IconProps{
        children?:Any
        style?:Any
        isOpen:boolean
        onClick?:()=>void
    }
    
    const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
    return (
        <Frame>
        <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => setOpen(!isOpen)}/>
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

export const TreeView = ()=>{
    const spring = useSpring({
        from:{opacity:0},
        to:{opacity:1},
    })
    return (
        <>
        <animated.div style={spring}>
        <TreeContainer>
            <Tree name="ok">
                <Tree name="pl"/>
            </Tree>
            <Tree name="main">
                <Tree name="hello" />
                    <Tree name="subtree with children">
                        <Tree name="hello" />
                            <Tree name="sub-subtree with children">
                                <Tree name="child 1" style={{ color: '#37ceff' }} />
                                <Tree name="child 2" style={{ color: '#37ceff' }} />
                                <Tree name="child 3" style={{ color: '#37ceff' }} />
                                <Tree name="custom content">
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
                                </Tree>
                            </Tree>
                    </Tree>
                <Tree name={<span>something something</span>} />
            </Tree>
        </TreeContainer>
        </animated.div>
        </>
    )
}