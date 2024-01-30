export function sliceArray(arr: any[], startIndex: number, sliceLength: number) {
    const length = arr.length;
    const endIndex = (startIndex + sliceLength) % length;

    if (startIndex < endIndex) {
        return arr.slice(startIndex, endIndex);
    } else {
        return arr.slice(startIndex, length);
    }
}
  
export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
