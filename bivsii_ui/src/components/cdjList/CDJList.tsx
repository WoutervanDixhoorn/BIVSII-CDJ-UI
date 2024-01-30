import CDJListItemRenderer from "./CDJListItemRenderer";
import CDJScrollbar from "@/components/cdjScrollbar/CDJScrollbar";

import { useScrollContext } from "@/hooks/useScrollContext";

import styles from "./cdjList.module.scss";

export default function CDJList() {
  const scrollContext = useScrollContext();
  
  return (
    <>
      <div className={styles.cdjList} onWheel={scrollContext.handleWheel}>
        <CDJScrollbar/>
        <CDJListItemRenderer />
      </div>
    </>
  )
}