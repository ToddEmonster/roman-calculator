export enum DigitColumn {
    "UNITS" = 1,
    "TENS" = 10,
    "HUNDREDS" = 100,
    "THOUSANDS" = 1000
}

export const digitColumnsValues: number[] = 
    Object.keys(DigitColumn)
        .map(k => DigitColumn[k])
        .filter(value => typeof value === 'number');