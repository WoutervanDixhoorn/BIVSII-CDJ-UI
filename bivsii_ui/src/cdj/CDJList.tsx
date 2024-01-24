import React, { useEffect, useState } from "react";

import CDJListItem from "./CDJListItem";
import CDJScrollbar from "./CDJScrollbar";

import { sliceArray, clamp }  from '../Util';

//TODO: Add API Fetch to get data
const AllListItems: string[] = ["[TICKETS]", "[PHOTO'S]", "[CONTACT]", "[PROJECTS]", "[NEW PROJECTS]", "", "Hidden!", "Hidden2!","[TICKETS]", "[PHOTO'S]", "[CONTACT]", "[PROJECTS]", "[NEW PROJECTS]" ];

export default function CDJList() {
  const scrollSens = 100;
  const [curScroll, setCurScroll] = useState(0);
  const [list, setList] = useState(sliceArray(AllListItems, 0));

  const handleWheel = (event: React.WheelEvent) => {
    setCurScroll(prev => clamp((prev += event.deltaY), 0, (AllListItems.length - 6) * scrollSens));
    setList(sliceArray(AllListItems, (curScroll/scrollSens)));
  };
  
  return (
    <>
      <div className="cdjList" onWheel={handleWheel}>
        <CDJScrollbar scrollItemsLen={AllListItems.length} curScroll={curScroll} scrollSens={scrollSens}/>
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