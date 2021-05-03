import About from "../pages/about"
import Contact from "../pages/contact"
import Home from "../pages/home"
import Login from "../pages/login"
import Products from "../pages/products"
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
        url: '/products',
        component: Products,
        secured: false
     }

 ]

 Rounting.push({
    url: '/',
    component: Home,
    secured: false  
 })

 export default Rounting