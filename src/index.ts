// Import our custom CSS
import "./sass/main.scss";

// Import javascript file as needed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "bootstrap";
import { Router } from "@vaadin/router";
import "./pages";
import "./components";

const router = new Router(document.getElementById("outlet"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/new", component: "new-page" },
]);