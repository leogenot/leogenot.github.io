// 1 -> 01
export const zeroPad = (x: number | string | undefined | null): string => {
    return (x ?? '0').toString().padStart(2, '0');
};
