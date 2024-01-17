import React, { useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export default function CDJScrollbar({scrollLength, currentScroll}: {scrollLength: number, currentScroll: number}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        if (scrollRef.current && handleRef.current) {
            let maxScroll = scrollLength - 6;
            let normScroll = currentScroll !== 0 ? currentScroll / maxScroll : 0;
            
            const scrollHeight = scrollRef.current.clientHeight;
            setScrollPos(clamp((scrollHeight * normScroll - (handleRef.current.clientHeight/2)), 0, (scrollHeight - handleRef.current.clientHeight)));
        }
    }, [currentScroll]);


    const handleStyle = {
        top: `${scrollPos}px`
    };
    
    return (
        <>
            <div className="cdjScroll" ref={scrollRef}>
                <div className="cdjHandle" style={handleStyle} ref={handleRef}></div>
            </div>
        </>
    );
}