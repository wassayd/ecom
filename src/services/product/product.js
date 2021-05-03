export const centsToEuro = price => {
    const dollars = price/100;
    return Math.floor(dollars * 0.83) === 0 ? 94 :  Math.floor(dollars * 0.83);
}

export const convertSizeToEuSize = size => {
    return Math.floor(1.27 * (size + 23))
} 

export const convertAllSize = sizeArr => {
    const res = [];

    sizeArr.forEach(element => {
        res.push(convertSizeToEuSize(element))
    });

    return res;
}

//const commande = panier.filter(x => x.id === obj.id && (testcolor || testTaille))