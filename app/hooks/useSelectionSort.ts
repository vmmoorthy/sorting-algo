import { useEffect, useState } from "react"
import { convertToElementType } from "~/helpers";
import type { ElementType } from "~/types";

let FirstRender = true;

const useSelectionSort = (arr: number[], isAsc: boolean) => {
    const [flagI, setFlagI] = useState(0)
    const [flagJ, setFlagJ] = useState(0);
    const [smallIdx, setSmallIdx] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [makeSwap, setMakeSwap] = useState(false);
    const [values, setValues] = useState<ElementType[]>(() => convertToElementType(arr))

    useEffect(() => {
        // reset State
        setValues(convertToElementType(arr))
        setFlagI(0)
        setFlagJ(0)
        setSmallIdx(0)
        // flagJ will be reset by useEffect
        setIsCompleted(false)
    }, [isAsc, arr])

    useEffect(() => {
        setValues(preValues => preValues.map((val, i) => ({ ...val, IsSorted: flagI > i })))
    }, [flagI])

    useEffect(() => {
        setValues(preValues => preValues.map((val, i) => ({ ...val, isMarkedForCompare: flagJ === i || smallIdx === i })))
    }, [flagJ, smallIdx])

    useEffect(() => {
        if (FirstRender)
            FirstRender = false
        else {
            setSmallIdx(flagI)
            setFlagJ(flagI + 1)
        }
    }, [flagI])


    const nextFunction = (values: ElementType[]) => {
        if (flagI >= values.length - 1) {
            setFlagI(pre => pre + 1)
            setIsCompleted(true)
            return [...values]
        }

        // Step 1: Compare and update smallIdx
        if (flagJ < values.length) {
            if (isAsc ? values[flagJ].value < values[smallIdx].value : values[flagJ].value > values[smallIdx].value) {
                setSmallIdx(flagJ)
            }
            setFlagJ(j => j + 1)
            return [...values]
        }

        // Step 2: End of inner loop, check if swap needed
        if (flagJ === values.length) {
            if (values[flagI].isMarkedForSwap && values[smallIdx].isMarkedForSwap) {
                if (makeSwap) {
                    // Do swap
                    values[flagI].isMarkedForSwap = false
                    values[smallIdx].isMarkedForSwap = false

                    const [removed] = values.splice(smallIdx, 1)
                    values.splice(flagI, 0, removed)
                    // Reset flags
                    setMakeSwap(false)
                    setFlagI(i => i + 1)
                    setFlagJ(flagI + 1)
                    setSmallIdx(flagI)
                } else {
                    // Mark for swap

                    setMakeSwap(true)
                }
            }
            else if (smallIdx !== flagI) {

                values[flagI].isMarkedForSwap = true
                values[smallIdx].isMarkedForSwap = true

            } else {
                // No swap needed, move to next
                setFlagI(i => i + 1)
                setFlagJ(flagI + 1)
                setSmallIdx(flagI)
            }

        }

        return [...values]
    }

    return {
        isCompleted,
        values,
        flagI,
        flagJ,
        smallIdx,
        makeSwap,
        nextStep() {
            const updatedValues = nextFunction(values)
            setValues(updatedValues)
        }
    };
}

export default useSelectionSort;