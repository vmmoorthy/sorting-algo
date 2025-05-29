import type { ElementType } from "~/types";

export const convertToElementType = (arr: number[]): ElementType[] => arr.map(num => ({ value: num, isMarkedForSwap: false, IsSorted: false, isMarkedForCompare: false }))
