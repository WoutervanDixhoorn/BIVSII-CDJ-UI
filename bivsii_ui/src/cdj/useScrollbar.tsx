import { useEffect, useState } from "react";
import { sliceArray, clamp } from '../Util';

//TODO: Make initial items
export function useScrollbar(initialItems: Array<string>, scrollSens: number, itemsShowing: number) {
  const [curScroll, setCurScroll] = useState(0);
  const [list, setList] = useState(sliceArray(initialItems, 0));

  const handleWheel = (event: React.WheelEvent) => {
    setCurScroll((prev) =>
      clamp(prev + event.deltaY, 0, (initialItems.length - itemsShowing) * scrollSens)
    );
  };

  useEffect(() => {
    setList(sliceArray(initialItems, curScroll / scrollSens));
  }, [curScroll]);

  return { curScroll, setCurScroll, list, setList, handleWheel };
}