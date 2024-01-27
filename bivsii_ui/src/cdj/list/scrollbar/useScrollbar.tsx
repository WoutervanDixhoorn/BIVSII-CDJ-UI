import { useEffect } from "react";

import { useScrollContext } from "./useScrollContext";

import { clamp } from "../../../Util";

type scrollbarProps = {
  scrollRef: React.RefObject<HTMLDivElement>;
  handleRef: React.RefObject<HTMLDivElement>;
}

export default function useScrollbar({scrollRef, handleRef}: scrollbarProps) {
  const scrollContext = useScrollContext();

  const handleMouseDown = (event: React.MouseEvent) => {
    scrollContext.setIsDragging(true);
    scrollContext.setDragStartPos(event.clientY);
  };
    
  const handleMouseUp = () => {
    scrollContext.setIsDragging(false);
  };
    
  const handleMouseMove = (event: any) => {
      if (scrollContext.isDragging && scrollRef.current && handleRef.current) {
        const deltaY = event.clientY - scrollContext.dragStartPos;
        const barHeight = scrollRef.current.clientHeight;
        const maxScroll = scrollContext.totalListCount - 6;
        const scrollChange = (deltaY / barHeight) * maxScroll * scrollContext.scrollSens;
        scrollContext.setCurScroll((prev) => clamp(prev + scrollChange, 0, maxScroll * scrollContext.scrollSens));
        scrollContext.setDragStartPos(event.clientY);
      }
  };

  const handleScrollClick = (event: React.MouseEvent) => {
      if (scrollRef.current) {
          const clickPos = event.clientY - scrollRef.current.getBoundingClientRect().top;
          const barHeight = scrollRef.current.clientHeight;
          const maxScroll = scrollContext.totalListCount - 6;
      
          const scrollChange = (clickPos / barHeight) * maxScroll * scrollContext.scrollSens;

          scrollContext.setCurScroll(clamp(scrollChange, 0, maxScroll * scrollContext.scrollSens));
      }
      event.preventDefault();
  };

  useEffect(() => {
      const cleanup = () => {
          window.removeEventListener("pointermove", handleMouseMove);
          window.removeEventListener("pointerup", handleMouseUp);
      };
      
      if (scrollContext.isDragging) {
          window.addEventListener("pointermove", handleMouseMove);
          window.addEventListener("pointerup", handleMouseUp);
          return cleanup;
      }
  }, [scrollContext.isDragging, handleMouseUp]);

  useEffect(() => {
      const curScrollPos = scrollContext.curScroll / scrollContext.scrollSens;

      if (scrollRef.current && handleRef.current){
          const barHeight = scrollRef.current.clientHeight;

          //Calc handle height
          const contentHeight = ((barHeight/6)*scrollContext.totalListCount);
          const visibleContentRatio = barHeight / contentHeight;
          scrollContext.setHandleHeight(visibleContentRatio * barHeight);

          //Calc handle pos
          const maxScroll = scrollContext.totalListCount - 6;
          const normScroll = curScrollPos !== 0 ? curScrollPos / maxScroll : 0;
          const hPos = (barHeight - scrollContext.handleHeight) * normScroll;

          scrollContext.setHandlePos(hPos);

          console.log(scrollContext.curScroll/ scrollContext.scrollSens);
          
          scrollContext.updateList();
      }
  }, [scrollContext.curScroll]);

  const handleStyle: React.CSSProperties = {
    top: `${scrollContext.handlePos}px`,
    height: `${scrollContext.handleHeight}px`
  };

  return {
    handleMouseDown, handleMouseUp, handleMouseMove, handleScrollClick, 
    handleStyle
  };

}