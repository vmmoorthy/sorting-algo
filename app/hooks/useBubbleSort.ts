import { useEffect, useState } from "react"
import type { ElementType } from "~/types";



const useBubbleSort = (arr: number[], isAsc: boolean) => {
    const [flagI, setFlagI] = useState(0)
    const [flagJ, setFlagJ] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [values, setValues] = useState<ElementType[]>([])

    useEffect(() => {
        setValues(preValues => preValues.map((val, i) => ({ ...val, isMarkedForCompare: flagJ === i || flagJ + 1 === i })))
    }, [flagJ])

    useEffect(() => {
        // reset State
        setValues(() => arr.map(num => ({ value: num, isMarkedForSwap: false, IsSorted: false, isMarkedForCompare: false })))
        setFlagI(0)
        setFlagJ(0)
        setIsCompleted(false)
    }, [isAsc])

    const nextFunction = (values: ElementType[]) => {

        // flagI //i < arr.length - 1
        // flagJ //j < arr.length - i - 1
        // arr[j] > arr[j + 1]
        // swap in next call

        if (flagI < values.length - 1)
            if (flagJ < values.length - flagI - 1) {
                if (isAsc ? values[flagJ].value > values[flagJ + 1].value : values[flagJ].value < values[flagJ + 1].value) {
                    // check for swap flag
                    if (values[flagJ].isMarkedForSwap && values[flagJ + 1].isMarkedForSwap) {// if true then make swap
                        const temp = values[flagJ]
                        values[flagJ] = values[flagJ + 1]
                        values[flagJ + 1] = temp

                        // reset the swap flag
                        values[flagJ].isMarkedForSwap = false
                        values[flagJ + 1].isMarkedForSwap = false

                        // move next check
                        setFlagJ(j => j + 1)
                    } else {
                        values[flagJ].isMarkedForSwap = true
                        values[flagJ + 1].isMarkedForSwap = true
                    }
                }
                else {
                    // move next check
                    setFlagJ(j => j + 1)
                }
            } else {
                // if J completed then increase I, reset J and Mark the last element as Sorted
                setFlagI(i => i + 1)
                setFlagJ(0)
                setValues(preValues => {
                    preValues[preValues.length - flagI - 1].IsSorted = true
                    return [...preValues]
                })
            }
        else {
            setValues(preValues => {
                preValues[preValues.length - flagI - 1].IsSorted = true
                return [...preValues]
            })
            setIsCompleted(true)
        }
        return [...values]
    }
    return {
        isCompleted,
        values,
        flagI,
        flagJ,
        nextStep() {
            const updatedValues = nextFunction(values)
            setValues(updatedValues)
        }
    };
}

export default useBubbleSort;