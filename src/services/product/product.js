export const centsToEuro = price => {
    const dollars = price/100;
    return Math.floor(dollars * 0.83) === 0 ? 94 :  Math.floor(dollars * 0.83);
}