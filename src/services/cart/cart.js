import axios from "axios";

const KEY_CART = 'cart';

export const getCart = () => {
    return JSON.parse(localStorage.getItem(KEY_CART)) || [];
}

export const setCart = (cart) => {
    localStorage.setItem(KEY_CART, JSON.stringify(cart));
}

export const addProductToCart = (productCart) => {
    const cart = getCart();
    
    const command = cart.filter( (x) => {
        console.log(x, productCart);
        return  x.product.id === productCart.product.id && x.size === productCart.size
    });

    if(command.length == 0) {
        cart.push(productCart);
        setCart(cart);
    }else {
        const article = command[0];
        article.quantity += parseInt(productCart.quantity);
        setCart(cart);
    }
}