import { useEffect } from "react";

import { useScrollContext } from "@/hooks/useScrollContext";

import { clamp } from "@/Util";

type scrollbarProps = {
  scrollRef: React.RefObject<HTMLDivElement>;
  handleRef: React.RefObject<HTMLDivElement>;
}

export default function useScrollbar({scrollRef, handleRef}: scrollbarProps) {
  const {
    handlePos,
    setHandlePos,
    handleHeight,
    setHandleHeight,

    isDragging,
    setIsDragging,
    dragStartPos,
    setDragStartPos,

    curScroll,
    setCurScroll,
    updateList,
    list,
    
    totalListCount,
    totalItemsToShow,
    scrollSens   
  } = useScrollContext();
  
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
      const maxScroll = totalListCount - totalItemsToShow;
      const scrollChange = (deltaY / barHeight) * maxScroll * scrollSens;
      setCurScroll((prev) => clamp(prev + scrollChange, 0, maxScroll * scrollSens));
      setDragStartPos(event.clientY);
    }
  };

  const handleScrollClick = (event: React.MouseEvent) => {
    if (scrollRef.current) {
      const clickPos = event.clientY - scrollRef.current.getBoundingClientRect().top;
      const barHeight = scrollRef.current.clientHeight;
      const maxScroll = totalListCount - totalItemsToShow;
  
      const scrollChange = (clickPos / barHeight) * maxScroll * scrollSens;

      setCurScroll(clamp(scrollChange, 0, maxScroll * scrollSens));
    }
    event.preventDefault();
  };

  useEffect(() => {
    const cleanup = () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
      
    if (isDragging) {
      window.addEventListener("pointermove", handleMouseMove);
      window.addEventListener("pointerup", handleMouseUp);
      return cleanup;
    }
  }, [isDragging, handleMouseUp]);

  useEffect(() => {
    const curScrollPos = curScroll / scrollSens;

    if (scrollRef.current && handleRef.current){
      const barHeight = scrollRef.current.clientHeight;

      //Calc handle height
      const contentHeight = ((barHeight/totalItemsToShow)*totalListCount);
      const visibleContentRatio = barHeight / contentHeight;
      setHandleHeight(visibleContentRatio * barHeight);

      //Calc handle pos
      const maxScroll = totalListCount - totalItemsToShow;
      const normScroll = curScrollPos !== 0 ? curScrollPos / maxScroll : 0;
      const hPos = (barHeight - handleHeight) * normScroll;

      //Update changes
      setHandlePos(hPos);
      updateList();
    }
  }, [curScroll]);

  const handleStyle: React.CSSProperties = {
    top: `${handlePos}px`,
    height: `${handleHeight}px`
  };

  useEffect(() => {
    const listOptions = document.querySelector('#listOptions');
    if(!listOptions) return;

    const listItemHeight = listOptions.clientHeight / listOptions.children.length;
    const listItems = document.querySelectorAll('#listItem') as NodeListOf<HTMLElement>;

    listItems.forEach(item => {
      item.style.height = `${listItemHeight}px`;
    });
  }, [list]); //Calc listItem size on mount

  return {
    handleMouseDown, handleMouseUp, handleMouseMove, handleScrollClick, 
    handleStyle
  };

}