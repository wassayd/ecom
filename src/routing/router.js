import About from "../pages/about";
import InformationDelivery from "../pages/cart/informationDelivery.step2";
import Stepper from "../pages/cart/stepper";
import Contact from "../pages/contact";
import Home from "../pages/home";
import Login from "../pages/login";
import Products from "../pages/products";
import ProductShow from "../pages/ProductShow";
import Profil from "../pages/profi";
import Register from "../pages/register";

const Rounting = [
  {
    url: "/about",
    component: About,
    secured: false,
  },
  {
    url: "/contact",
    component: Contact,
    secured: false,
  },
  {
    url: "/login",
    component: Login,
    secured: false,
  },
  ,
  {
    url: "/register",
    component: Register,
    secured: false,
  },
  {
    url: "/product/:id",
    component: ProductShow,
    secured: false,
  },
  {
    url: "/products",
    component: Products,
    secured: false,
  },
  {
    url: "/cart",
    component: Stepper,
    secured: false,
  },
  {
    url: "/profil",
    component: Profil,
    secured: false,
  }
];

Rounting.push({
  url: "/",
  component: Home,
  secured: false,
});

export default Rounting;
