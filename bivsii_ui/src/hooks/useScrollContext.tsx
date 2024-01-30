import { createContext, useContext, useState } from "react";

import { clamp, sliceArray } from "@/Util.tsx";

type scrollContextProviderProps = {
    children: React.ReactNode;
    initialList: string[];
    scrollSensitivity: number;
    totalItemsToShow: number;
}

type scrollContext = {
    handlePos: number;
    setHandlePos: React.Dispatch<React.SetStateAction<number>>;
    handleHeight: number;
    setHandleHeight: React.Dispatch<React.SetStateAction<number>>;

    isDragging: boolean;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    dragStartPos: number;
    setDragStartPos: React.Dispatch<React.SetStateAction<number>>;

    curScroll: number;
    setCurScroll: React.Dispatch<React.SetStateAction<number>>;

    list: string[];
    updateList: () => void;
    totalListCount: number;
    totalItemsToShow: number;

    handleWheel: (event: React.WheelEvent) => void;
    scrollSens: number;
    
};

export const scrollContext = createContext<scrollContext | null>(null);

export default function ScrollContextProvider(props: scrollContextProviderProps) {
    const [handlePos, setHandlePos] = useState(0);
    const [handleHeight, setHandleHeight]= useState(200);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState(0);

    const [curScroll, setCurScroll] = useState(0);

    const [list, setList] = useState(props.initialList);
    const totalListCount = props.initialList.length;
    const totalItemsToShow = props.totalItemsToShow; //TODO: Maybe dont fix this value here?
    
    const scrollSens = props.scrollSensitivity;

    const handleWheel = (event: React.WheelEvent) => {
        setCurScroll((prev) =>
          clamp(prev + event.deltaY, 0, (totalListCount - totalItemsToShow) * scrollSens)
        );
    };

    const updateList = () => {
        while(props.initialList.length < totalItemsToShow)
            props.initialList.push("");

        setList(sliceArray(props.initialList, curScroll / scrollSens, totalItemsToShow));
    };

    return (
        <scrollContext.Provider
            value={{
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
                list,
                updateList,
                totalListCount,
                totalItemsToShow,

                handleWheel,
                scrollSens 
            }}
        >
            {props.children}
        </scrollContext.Provider>
    )
}

export function useScrollContext() {
    const context = useContext(scrollContext);
    if (!context) {
        throw new Error(
            "useScrollContext must be called within a \'ScrollContextProvider\'"
        );
    }
    
    return context;
}