import { useContext, useEffect, useRef } from "react";
import { COLOR_COMPARE, COLOR_SORTED, COLOR_SWAP, COLOR_UNSORTED } from "~/constants";
import { MainContext } from "~/contextProvider/MainContextProvider";
import type { ElementType } from "~/types";
import Controls from "../Controls";
import useInsertionSort from "~/hooks/useInsertionSort";

const getColor = (element: ElementType): string => {
    if (element.isMarkedForSwap)
        return COLOR_SWAP
    if (element.isMarkedForCompare)
        return COLOR_COMPARE
    if (element.IsSorted)
        return COLOR_SORTED;
    return COLOR_UNSORTED
}


const InsertionSort = ({ initValues, isAsc, }: { initValues: number[], isAsc: boolean, }) => {
    const { setSortCompleted, audioClickRef, audioTransRef, audioMarkRef } = useContext(MainContext)
    const { isCompleted, nextStep, values, makeSwap } = useInsertionSort(initValues, isAsc)

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

    const p1Index = values.findIndex(v => v.isMarkedForSwap)//p1 index
    const sondSlice = values.slice(p1Index + 1)
    const p2Index = sondSlice.findIndex(v => v.isMarkedForSwap) + p1Index + 1//p2 index
    let totalEleHeight = 0
    if (arrowRef.current.p1) {
        const eleStyle = window.getComputedStyle(arrowRef.current.p1)
        totalEleHeight += arrowRef.current.p1.offsetHeight
        totalEleHeight += parseFloat(eleStyle.marginTop)
    }
    console.log(p1Index, p2Index, sondSlice)

    console.log(totalEleHeight)
    return (
        <div className="pageRender  h-full p-2 px-10 text-white">
            <div className="content h-[75vh] overflow-auto relative ">{values.map((element, index) => {
                let props = { transform: "", };
                const { p1, p2 } = arrowRef.current;
                // let p2Index = -1;
                if (element.isMarkedForSwap && p1 && p2) {
                    let pv = p2.offsetTop - p1.offsetTop
                    console.log("p:", p1, p1.innerText, pv, "p2:", p2, p2.innerText)
                    // p2Index = index;
                    if (makeSwap) {
                        if (p1Index !== index) {//p2
                            // .getBoundingClientRect().y
                            props.transform = `translateY(${-pv}px)`
                            // else //p1
                        }
                    }
                }
                if (makeSwap && index >= p1Index && index < p2Index) {
                    props.transform = `translateY(${totalEleHeight}px)`
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

export default InsertionSort;