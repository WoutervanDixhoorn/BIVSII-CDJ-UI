import { useEffect, useRef, useState } from "react";

interface CDJScrollbarProps {
  scrollItemsLen: number;
  curScroll: number;
  scrollSens: number;
}

export default function CDJScrollbar({ scrollItemsLen, curScroll, scrollSens }: CDJScrollbarProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);

    const [handlePos, setHandlePos] = useState(0);
    const [handleHeight, setHandleHeight]= useState(200);

    useEffect(() => {
        const curScrollPos = curScroll / scrollSens;

        if (scrollRef.current && handleRef.current){
            const barHeight = scrollRef.current.clientHeight;

            //Calc handle height
            const contentHeight = ((barHeight/6)*scrollItemsLen);
            const visibleContentRatio = barHeight / contentHeight;
            setHandleHeight(visibleContentRatio * barHeight);

            //Calc handle pos
            const maxScroll = scrollItemsLen - 6;
            const normScroll = curScrollPos !== 0 ? curScrollPos / maxScroll : 0;
            const hPos = (barHeight - handleHeight) * normScroll;

            setHandlePos(hPos);
        }
    }, [curScroll])

    const handleStyle = {
        top: `${handlePos}px`,
        height: `${handleHeight}px`
    };
    
    return (
        <>
            <div className="cdjScroll" ref={scrollRef}>
                <div className="cdjHandle" style={handleStyle} ref={handleRef} ></div>
            </div>
        </>
    );
}