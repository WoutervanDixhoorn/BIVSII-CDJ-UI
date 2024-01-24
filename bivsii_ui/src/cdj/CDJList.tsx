import CDJListItem from "./CDJListItem";
import CDJScrollbar from "./CDJScrollbar";

import { useScrollbar } from "./useScrollbar";

//TODO: Add API Fetch to get data
const AllListItems: string[] = ["[TICKETS]", "[PHOTO'S]", "[CONTACT]", "[PROJECTS]", "[NEW PROJECTS]", "", "Hidden!", "Hidden2!","[TICKETS]", "[PHOTO'S]", "[CONTACT]", "[PROJECTS]", "[NEW PROJECTS]" ];

export default function CDJList() {
  const scrollSens = 10;
  const { curScroll, setCurScroll, list, handleWheel } = useScrollbar(AllListItems, scrollSens, 6);
  
  return (
    <>
      <div className="cdjList" onWheel={handleWheel}>
        <CDJScrollbar scrollItemsLen={AllListItems.length} curScroll={curScroll} setCurScroll={setCurScroll} scrollSens={scrollSens}/>
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