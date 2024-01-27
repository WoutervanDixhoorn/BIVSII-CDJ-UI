import CDJListRenderer from "./CDJListRenderer";
import CDJScrollbar from "./scrollbar/CDJScrollbar";

import { useScrollContext } from "./scrollbar/useScrollContext";

export default function CDJList() {
  const scrollContext = useScrollContext();

  return (
    <>
        <div className="cdjList" onWheel={scrollContext.handleWheel}>
          <CDJScrollbar/>
          <CDJListRenderer />
        </div>
    </>
  )
}