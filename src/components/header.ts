import { customElement } from "lit/decorators.js";
import { html } from "lit";
import LitNoShadow from "./lit-no-shadow";

@customElement("app-header")
class Header extends LitNoShadow {
  protected render() {
    return html`
      <header class="container">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
        >
          <div class="col-md-3 mb-2 mb-md-0">
            <h1>Monogatari</h1>
          </div>

          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="/" class="nav-link px-2 link-secondary">
                <bs-icon icon="bi-house-door"></bs-icon>
              </a>
            </li>
            <li>
              <a href="/new" class="nav-link px-2"><bs-icon icon="bi-plus-square"></bs-icon></a>
            </li>
            <li class="position-relative">
              <a href="#" class="nav-link px-2">
                <bs-icon icon="bi-bell"></bs-icon>
              </a>
              <span class="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-danger">99+</span>
            </li>
          </ul>
        </div>
      </header>
    `;
  }
}

export default Header;
