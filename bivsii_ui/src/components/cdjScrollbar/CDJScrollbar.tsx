import { useRef } from "react";

import useScrollbar from "@/hooks/useScrollbar";

import styles from "./cdjScrollbar.module.scss";

export default function CDJScrollbar() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);

    const { 
        handleMouseDown, handleMouseUp, handleMouseMove, handleScrollClick,
        handleStyle 
    } = useScrollbar({scrollRef, handleRef});
    
    return (
        <>
            <div className={styles.cdjScroll} ref={scrollRef} onPointerDown={handleScrollClick}>
                <div className={styles.cdjHandle} 
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