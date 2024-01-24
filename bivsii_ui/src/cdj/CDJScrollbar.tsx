import { useCallback, useEffect, useRef, useState } from "react";
import { clamp } from "../Util";

interface CDJScrollbarProps {
  scrollItemsLen: number;
  curScroll: number;
  setCurScroll: React.Dispatch<React.SetStateAction<number>>;
  scrollSens: number;
}

export default function CDJScrollbar({ scrollItemsLen, curScroll, setCurScroll, scrollSens }: CDJScrollbarProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);

    const [handlePos, setHandlePos] = useState(0);
    const [handleHeight, setHandleHeight]= useState(200);

    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState(0);

    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true);
        setDragStartPos(event.clientY);
    };
      
    const handleMouseUp = () => {
        setIsDragging(false);
    };
      
    const handleMouseMove = (event: any) => {
        if (isDragging && scrollRef.current && handleRef.current) {
          const deltaY = event.clientY - dragStartPos;
          const barHeight = scrollRef.current.clientHeight;
          const maxScroll = scrollItemsLen - 6;
          const scrollChange = (deltaY / barHeight) * maxScroll * scrollSens;
          setCurScroll((prev) => clamp(prev + scrollChange, 0, maxScroll * scrollSens));
          setDragStartPos(event.clientY);
        }
    };
    
    useEffect(() => {
        const cleanup = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
        
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            return cleanup;
        }
    }, [isDragging, handleMouseUp]);
    
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

    const handleStyle: React.CSSProperties = {
        top: `${handlePos}px`,
        height: `${handleHeight}px`
    };
    
    return (
        <>
            <div className="cdjScroll" ref={scrollRef}>
                <div className="cdjHandle" 
                style={handleStyle} 
                ref={handleRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ></div>
            </div>
        </>
    );
}