import CDJListItem from "./CDJListItem";

import { useScrollContext } from "@/hooks/useScrollContext";

import styles from "./cdjList.module.scss";

export default function CDJListItemRenderer() {
    const scrollContext = useScrollContext();

    return (
        <div className={styles.listOptions}>
            {
            scrollContext.list.map((item: string, index: number) => {
                return <CDJListItem itemText={item} key={index}/>;
            }) 
            }
        </div>
    );
}