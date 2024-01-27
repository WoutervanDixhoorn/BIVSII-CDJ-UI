import { createContext, useContext, useState } from "react";

import { clamp, sliceArray } from "../../../Util";

type scrollContextProviderProps = {
    children: React.ReactNode;
    initialList: string[];
    scrollSensitivity: number;
}

type scrollContext = {
    handlePos: number;
    setHandlePos: React.Dispatch<React.SetStateAction<number>>;
    handleHeight: number;
    setHandleHeight: React.Dispatch<React.SetStateAction<number>>;

    curScroll: number;
    setCurScroll: React.Dispatch<React.SetStateAction<number>>;

    list: string[];
    setList: React.Dispatch<React.SetStateAction<string[]>>
    totalListCount: number;

    handleWheel: (event: React.WheelEvent) => void;
    scrollSens: number;

    isDragging: boolean;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    dragStartPos: number;
    setDragStartPos: React.Dispatch<React.SetStateAction<number>>;

    updateList: () => void;
};

export const scrollContext = createContext<scrollContext | null>(null);

export default function ScrollContextProvider(props: scrollContextProviderProps) {
    const [list, setList] = useState(props.initialList);
    const totalListCount = props.initialList.length;
    const [curScroll, setCurScroll] = useState(0);
    const scrollSens = props.scrollSensitivity;

    const [handlePos, setHandlePos] = useState(0);
    const [handleHeight, setHandleHeight]= useState(200);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState(0);

    const handleWheel = (event: React.WheelEvent) => {
        setCurScroll((prev) =>
          clamp(prev + event.deltaY, 0, (totalListCount - 6) * scrollSens)
        );
    };

    const updateList = () => {
        setList(sliceArray(props.initialList, curScroll / scrollSens));
    };

    return (
        <scrollContext.Provider
            value={{
                handlePos,
                setHandlePos,
                handleHeight,
                setHandleHeight,
                curScroll,
                setCurScroll,
                list,
                setList,
                totalListCount,
                handleWheel,
                scrollSens,
                updateList,
                isDragging,
                setIsDragging,
                dragStartPos,
                setDragStartPos
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