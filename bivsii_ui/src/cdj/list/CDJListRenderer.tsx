import CDJListItem from "./CDJListItem";

import { useScrollContext } from "./scrollbar/useScrollContext";

export default function CDJListRenderer() {
    const scrollContext = useScrollContext();

    return (
        <div className="listOptions">
            {
            scrollContext.list.map((item: string, index: number) => {
                return <CDJListItem itemText={item} key={index}/>;
            }) 
            }
        </div>
    );
}