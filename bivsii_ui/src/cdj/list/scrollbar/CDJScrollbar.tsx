import { useRef } from "react";

import useScrollbar from "./useScrollbar";

export default function CDJScrollbar() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);

    const { 
        handleMouseDown, handleMouseUp, handleMouseMove, handleScrollClick,
        handleStyle 
    } = useScrollbar({scrollRef, handleRef});
    
    return (
        <>
            <div className="cdjScroll" ref={scrollRef} onPointerDown={handleScrollClick}>
                <div className="cdjHandle" 
                    style={handleStyle} 
                    ref={handleRef}
                    onPointerDown={handleMouseDown}
                    onPointerMove={handleMouseMove}
                    onPointerUp={handleMouseUp}
                >
                </div>
            </div>
        </>
    );
}