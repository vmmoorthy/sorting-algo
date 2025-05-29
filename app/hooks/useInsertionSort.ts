import { useEffect, useState } from "react"
import { convertToElementType } from "~/helpers";
import type { ElementType } from "~/types";



const useInsertionSort = (arr: number[], isAsc: boolean) => {
    const [flagI, setFlagI] = useState(1)
    const [flagJ, setFlagJ] = useState(() => flagI - 1);
    const [isCompleted, setIsCompleted] = useState(false);
    const [makeSwap, setMakeSwap] = useState(false);
    const [values, setValues] = useState<ElementType[]>(() => convertToElementType(arr))

    useEffect(() => {
        setValues(preValues => preValues.map((val, i) => ({ ...val, isMarkedForCompare: values.length - 1 == i ? false : flagJ === i || flagI === i })))
    }, [flagJ])

    useEffect(() => {
        // reset State
        setValues(convertToElementType(arr))
        setFlagI(1)
        // flagJ will be reset by useEffect
        setIsCompleted(false)
    }, [isAsc, arr])

    useEffect(() => {
        setFlagJ(flagI - 1)
        setValues(preValues => preValues.map((ele, i) => ({ ...ele, IsSorted: i < flagI })))
    }, [flagI]);

    const nextFunction = (values: ElementType[]) => {

        if (flagI < values.length)
            // set j value
            if (flagJ >= 0 && isAsc ? values[flagI].value < values[flagJ].value : values[flagI].value > values[flagJ].value) {

                // check for swap flag
                if (values[flagJ].isMarkedForSwap && values[flagI].isMarkedForSwap) {// if true then make swap
                    if (makeSwap) {
                        const [removedElement] = values.splice(flagI, 1);
                        values.splice(flagJ, 0, removedElement);

                        // reset the swap flag
                        values[flagJ].isMarkedForSwap = false
                        values[flagJ + 1].isMarkedForSwap = false

                        // move next check
                        setMakeSwap(false)
                        setFlagI(i => i + 1)
                    } else {
                        setMakeSwap(true)
                    }
                }
                else if (flagJ == 0) {
                    // mark for swap
                    values[flagI].isMarkedForSwap = true
                    values[flagJ].isMarkedForSwap = true
                } else if (isAsc ? values[flagJ - 1].value < values[flagI].value : values[flagJ - 1].value > values[flagI].value) {
                    values[flagI].isMarkedForSwap = true
                    values[flagJ].isMarkedForSwap = true
                }
                else {
                    // move next check
                    setFlagJ(j => j - 1)
                }
            } else {
                // if J completed then increase I, reset J and Mark the last element as Sorted
                setFlagI(i => i + 1)
                // flag J handled by useEffect
            }
        else {
            setIsCompleted(true)
        }
        return [...values]
    }
    return {
        isCompleted,
        values,
        flagI,
        flagJ,
        makeSwap,
        nextStep() {
            const updatedValues = nextFunction(values)
            setValues(updatedValues)
        }
    };
}

export default useInsertionSort;