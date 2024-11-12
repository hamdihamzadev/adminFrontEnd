import Vue from "vue";
import VueRouter from "vue-router";
import LoginUser from '../views/LoginUser.vue'
import SignUp from '../views/SignUp.vue'
import CategoryViews from '../views/CategoryViews.vue'
import AllProducts from '../views/AllProduct.vue'
import CreateProduct from '../views/CreateProduct.vue'
import DashBord from '../views/DashBord.vue'
import AddCustomer from "../views/customers/CreateCustomer.vue"
import ListCustomers from '../views/customers/ListCustomers.vue'
import StockProduct from '../views/StockProduct.vue'
import BlogCategories from '../views/BlogCategories.vue'
import CreateBlog from "../views/blogs/CreateBlog.vue"
import AllBlogs from '../views/blogs/AllBlogs.vue'
// import NewOrders from '../views/NewOrders.vue'
// import ConfirmedOredrs from '../views/ConfirmedOrders.vue'
// import ShippedOrder from '../views/ShippedOrder.vue'
// import DeliVerd from '../views/DeliVerd.vue'
// import ReTurn from '../views/ReTurn.vue'
// import CancelledOrders from '../views/Cancelled.vue'
// import RegistrationConfirmation from "@/views/RegistrationConfirmation.vue";


// import TopStatistics from '../views/TopStatistics.vue'
// import TopCategory from '@/views/top/TopCategory.vue'
// import TopProduct from '@/views/top/TopProduct.vue'
// import TopCity from '@/views/top/TopCity.vue'



// import TopCustomer from '../views/customers/TopCustomer.vue'
// import ProfilUser from '../views/ProfilUser.vue'
// import ConversionRate from '../views/ConversionRate.vue'

// import NotFound from '../views/NotFound.vue'



Vue.use(VueRouter);

const routes = [
  
  { path: '/', component: SignUp },
  { path: '/Login', component: LoginUser},
  { path: '/Categories', component: CategoryViews},
  { path: '/allproducts', component: AllProducts},
  { path: '/createproduct/:id', component: CreateProduct},
  { path: '/DashBord', component: DashBord },
  { path: '/Customers/CreateCustomer', component: AddCustomer},
  { path: '/Customers/ListCustomers', component: ListCustomers},
  { path: '/Stock', component: StockProduct},
  { path: '/BlogCategories', component: BlogCategories},
  { path: '/createblog/:id', component: CreateBlog},
  { path: '/AllBlogs', component: AllBlogs},
  // { path: '/Orders/NewOrders', component: NewOrders },
  // { path: '/Orders/Confirmed', component: ConfirmedOredrs},
  // { path: '/Orders/Shipped', component: ShippedOrder},
  // { path: '/Orders/Deliverd', component: DeliVerd},
  // { path: '/Orders/Return', component: ReTurn},
  // { path: '/Orders/Cancelled', component: CancelledOrders},

  // { path: '/RegistrationConfirmation', component: RegistrationConfirmation},
  
  // {
  //   path: '/Statistics/top',
  //   component: TopStatistics,
  //   children: [
  //     {
  //       path: 'category',
  //       component: TopCategory
  //     },
  //     {
  //       path: 'product',
  //       component: TopProduct
  //     },
  //     {
  //       path: 'city',
  //       component: TopCity
  //     }
  //   ]
  // },  

  // { path: '/Customers/TopCustomer', component: TopCustomer},
  // { path: '/Profil', component: ProfilUser},
  // { path: '/conversion', component: ConversionRate},
  // { path: '*',name:'NotFound', component: NotFound}

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
