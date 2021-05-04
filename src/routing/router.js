import About from "../pages/about"
import Cart from "../pages/cart"
import Contact from "../pages/contact"
import Home from "../pages/home"
import Login from "../pages/login"
import Products from "../pages/products"
import ProductShow from "../pages/ProductShow"
import Register from "../pages/register"

const Rounting = [
     {
         url: '/about',
         component: About,
         secured: false
     },
     {
        url: '/contact',
        component: Contact,
        secured: false
     },
     {
        url: '/login',
        component: Login,
        secured: false
     },
     ,
     {
        url: '/register',
        component: Register,
        secured: false
     },
     {
        url: '/product/:id',
        component: ProductShow,
        secured: false
     },
     {
        url: '/products',
        component: Products,
        secured: false
     },
     {
      url: '/cart',
      component: Cart,
      secured: false
   },

 ]

 Rounting.push({
    url: '/',
    component: Home,
    secured: false  
 })

 export default Rounting