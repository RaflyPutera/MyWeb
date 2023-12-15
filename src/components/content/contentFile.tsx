import { animated } from "@react-spring/web"
import axios from "axios"
import { useEffect, useState } from "react"

export const ContentInfo = (props: { ActiveButton: boolean[] }) => {
    const [header, setHeader] = useState('');
    const [info, setInfo] = useState('');

    useEffect(() => {
        const fetchData = async (keyID: string) => {
            try {
            const response = await axios.get(`http://localhost:5172/info/${keyID}`);
            setInfo(response.data);
            } catch (error) {
                console.error('Error fetching data:',error);
            }
        };

        if (props.ActiveButton[0]) {
            fetchData("657bf59bd55ca540d45c4fd8");
            setHeader("Selected header 1");
        } else if (props.ActiveButton[1]) {
            fetchData("657bfbc57bda102befa0e6ef");
            setHeader("Selected header 2");
        }
    }, [props.ActiveButton]);

    return (
        <div>
            <div style={{ marginTop: '10px', fontFamily: 'Outfit', fontSize: '22px' }}>{header}</div>
            <animated.div style={{ marginTop: '30px', fontFamily: 'Outfit', fontSize: '18px' }}>{info}</animated.div>
        </div>
    );
};