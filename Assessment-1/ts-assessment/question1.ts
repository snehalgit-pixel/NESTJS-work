// Binary Search on sorted array
import { sortedArrayOfNumbers } from "./dummy-data";

function binarySearch(sortedArray: number[] | string[], targetValue: number | string): number {
    let initial = 0;
    let final = sortedArray.length - 1;
    let midPoint = 0;
    let indexOfFoundElement = -1;
    while (initial <= final) {
        midPoint = Math.floor((initial + final)/2);
        if (sortedArray[midPoint] === targetValue) {
            indexOfFoundElement = midPoint + 1;
            break;
        }
        else if (sortedArray[midPoint] < targetValue) {
            initial = midPoint + 1;
        }
        else {
            final = midPoint - 1;
        }
    }
    return indexOfFoundElement;
}

const data: number[] = sortedArrayOfNumbers;
const index: number =  binarySearch(data, 4);
if (index != -1) {
    console.log("Element found in position = "+ index);
}
else {
    console.log("Element not found");
}