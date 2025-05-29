import { useContext, useEffect, useRef } from "react";
import { COLOR_COMPARE, COLOR_SORTED, COLOR_SWAP, COLOR_UNSORTED } from "~/constants";
import { MainContext } from "~/contextProvider/MainContextProvider";
import useBubbleSort from "~/hooks/useBubbleSort";
import type { ElementType } from "~/types";
import Controls from "../Controls";

const getColor = (element: ElementType): string => {
    if (element.IsSorted)
        return COLOR_SORTED;
    if (element.isMarkedForSwap)
        return COLOR_SWAP
    if (element.isMarkedForCompare)
        return COLOR_COMPARE
    return COLOR_UNSORTED
}


const BubbleSort = ({ initValues, isAsc, }: { initValues: number[], isAsc: boolean, }) => {
    const { setSortCompleted, audioClickRef, audioTransRef, audioMarkRef } = useContext(MainContext)
    const { isCompleted, nextStep, values, makeSwap } = useBubbleSort(initValues, isAsc)

    const arrowRef = useRef<{ p1: HTMLDivElement | null, p2: HTMLDivElement | null }>({ p1: null, p2: null })

    useEffect(() => {
        setSortCompleted(isCompleted)
    }, [isCompleted])

    useEffect(() => {
        if (values.findIndex(v => v.isMarkedForSwap) > -1) {
            if (makeSwap)
                audioTransRef.current.play()
            else
                audioMarkRef.current.play()
        }
        else {
            audioClickRef.current.play()
        }
    }, [values])

    useEffect(() => {
        setSortCompleted(isCompleted)
    }, [isCompleted])
    return (
        <div className="pageRender  h-full p-2 px-10 text-white">
            <div className="content h-[75vh] overflow-auto relative ">{values.map((element, index) => {
                let props = { transform: "", };
                if (element.isMarkedForSwap && arrowRef.current.p1 && arrowRef.current.p2) {
                    // TODO : try offsetHeight
                    let p1 = arrowRef.current.p1.getBoundingClientRect().y, p2 = arrowRef.current.p2.getBoundingClientRect().y;
                    if (makeSwap) {
                        if (values.findIndex(v => v.isMarkedForSwap) === index) //p1
                            props.transform = `translateY(${p2 - p1}px)`
                        else //p2
                            props.transform = `translateY(${p1 - p2}px)`
                    }
                }
                return <div key={index} style={{
                    width: `${element.value}%`, backgroundColor: `${getColor(element)}`,
                    ...props
                }}
                    ref={r => {
                        if (element.isMarkedForSwap)
                            if (values.findIndex(v => v.isMarkedForSwap) === index)
                                arrowRef.current.p1 = r
                            else
                                arrowRef.current.p2 = r
                    }}
                    className={"value px-2 py-1 select-none bg-[#E03B8B] rounded-r text-[1.5rem]  my-3 " + (element.isMarkedForSwap ? "transition-transform duration-300" : "")}>{element.value}</div>
            })}
            </div>
            <Controls nextStep={nextStep} />

        </div>
    );
}

export default BubbleSort;