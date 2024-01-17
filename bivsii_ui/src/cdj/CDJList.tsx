import React, { useEffect, useState } from "react";

import CDJListItem from "./CDJListItem";
import CDJScrollbar from "./CDJScrollbar";

function getWrappedSlice(arr: any[], startIndex: number, sliceLength: number = 6) {
  const length = arr.length;
  const normalizedStartIndex = (startIndex % length + length) % length; // Normalize negative indices

  const endIndex = (normalizedStartIndex + sliceLength) % length;

  if (normalizedStartIndex < endIndex) {
    return arr.slice(normalizedStartIndex, endIndex);
  } else {
    return arr.slice(normalizedStartIndex, length).concat(arr.slice(0, endIndex));
  }
}

export default function CDJList() {
  const AllListItems: string[] = ["[TICKETS]", "[PHOTO'S]", "[CONTACT]", "[PROJECTS]", "[NEW PROJECTS]", "", "Hidden!", "Hidden2!" ];

  const [scroll, setScroll] = useState(0);
  const [list, setList] = useState(getWrappedSlice(AllListItems, 0));

  useEffect(() => {
    setList(getWrappedSlice(AllListItems, scroll));
  }, [scroll]);

  const handleSroll = (event: React.WheelEvent) => {
    if(event.deltaY > 0 && (scroll+6) < AllListItems.length)
      setScroll(prevScroll => prevScroll+1);
    else if(event.deltaY < 0 && scroll > 0)
      setScroll(prevScroll => prevScroll-1);
  };

  return (
    <>
      <div className="cdjList" onWheel={handleSroll}>
        <CDJScrollbar scrollLength={AllListItems.length} currentScroll={scroll}/>
        <div className="listOptions">
            {
              list.map((item: string, index: number) => {
                return <CDJListItem itemText={item} key={index}/>;
              }) 
            }
        </div>
      </div>
    </>
  )
}