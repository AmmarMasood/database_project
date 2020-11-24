/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Face from "@material-ui/icons/Face";
import TableList from "views/TableList/TableList.js";
import Employees from "./views/Dashboard/Employees";
import Customers from "./views/Dashboard/Customers";
import Supplier from "./views/Dashboard/Supplier";
import Products from "./views/Dashboard/Products";
import AllEmployees from "./views/Dashboard/AllEmployees";
import PointOfSale from "./views/Dashboard/PointOfSale";
import CreateOrders from "./views/Dashboard/CreateOrders";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Remove from "./views/Dashboard/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const adminRoutes = [
  {
    path: "/dashboard",
    name: "Create Employee",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Employees,
    layout: "/admin",
  },
  {
    path: "/all-employees",
    name: "All Employees",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AllEmployees,
    layout: "/admin",
  },
  {
    path: "/remove-stuff",
    name: "Remove",
    rtlName: "الرموز",
    icon: DeleteForeverIcon,
    component: Remove,
    layout: "/admin",
  },
];

const employeeRoles = [
  {
    path: "/dashboard",
    name: "Point Of Sale",
    rtlName: "لوحة القيادة",
    icon: AddShoppingCartIcon,
    component: PointOfSale,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Customers",
    rtlName: "طباعة",
    icon: AccountCircleIcon,
    component: Customers,
    layout: "/admin",
  },
  {
    path: "/supplier",
    name: "Supplier",
    rtlName: "الرموز",
    icon: Face,
    component: Supplier,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Products,
    layout: "/admin",
  },
  {
    path: "/create-orders",
    name: "Create Orders",
    rtlName: "الرموز",
    icon: AddBoxIcon,
    component: CreateOrders,
    layout: "/admin",
  },
];
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Point Of Sale",
    rtlName: "لوحة القيادة",
    icon: AddShoppingCartIcon,
    component: PointOfSale,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Reports",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Employees",
    icon: Person,
    component: Employees,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Customers",
    rtlName: "طباعة",
    icon: AccountCircleIcon,
    component: Customers,
    layout: "/admin",
  },
  {
    path: "/supplier",
    name: "Supplier",
    rtlName: "الرموز",
    icon: Face,
    component: Supplier,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Products,
    layout: "/admin",
  },
  {
    path: "/create-orders",
    name: "Create Orders",
    rtlName: "الرموز",
    icon: AddBoxIcon,
    component: CreateOrders,
    layout: "/admin",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // },
];

export default localStorage.getItem("ROLE") === "admin"
  ? adminRoutes
  : localStorage.getItem("ROLE") === "employee"
  ? employeeRoles
  : dashboardRoutes;
