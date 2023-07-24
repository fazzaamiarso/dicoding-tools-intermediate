import "./sass/main.scss";
import "toastify-js/src/toastify.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "bootstrap";
import { Router } from "@vaadin/router";
import "./pages";
import "./components";

const router = new Router(document.getElementById("outlet"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/new", component: "new-page" },
  { path: "/setting", component: "setting-page" },
  { path: "/register", component: "register-page" },
  { path: "/login", component: "login-page" },
]);
