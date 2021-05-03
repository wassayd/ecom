const KEY_CART = 'cart';

const getCart = () => {
    return JSON.parse(localStorage.getItem(KEY_CART)) || [];
}

const setCart = (cart) => {
    localStorage.setItem(KEY_CART, JSON.stringify(cart));
}

export const addProductToCart = (product) => {
    const cart = getCart();
    
    const command = cart.filter( (x) =>  x.id === product.id && x.size === product.size);


    if(command.length == 0) {
        cart.push(product);
        setCart(cart);
    }else {
        const article = command[0];
        article.quantity += parseInt(product.quantity);
        setCart(cart);
    }
}