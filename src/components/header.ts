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
            <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none"> Monogatari </a>
          </div>

          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" class="nav-link px-2 link-secondary">Home</a></li>
            <li><a href="#" class="nav-link px-2">Features</a></li>
            <li><a href="#" class="nav-link px-2">Pricing</a></li>
            <li><a href="#" class="nav-link px-2">FAQs</a></li>
            <li><a href="#" class="nav-link px-2">About</a></li>
          </ul>

          <div class="col-md-3 text-end">
            <a class="btn btn-primary" aria-current="page" href="/new">Create New</a>
          </div>
        </div>
      </header>
    `;
    // return html`<header class="container-sm">
    //   <nav class="navbar navbar-expand-lg bg-body-tertiary">
    //     <div class="container-fluid">
    //       <a class="navbar-brand" href="/">Monogatari</a>
    //       <button
    //         class="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="offcanvas"
    //         data-bs-target="#navbarSupportedContent"
    //         aria-controls="navbarSupportedContent"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span class="navbar-toggler-icon"></span>
    //       </button>
    //       <div class="offcanvas offcanvas-end" id="navbarSupportedContent">
    //         <div class="offcanvas-header">
    //           <h2>Navigation</h2>
    //           <button
    //             type="button"
    //             class="btn-close"
    //             data-bs-dismiss="offcanvas"
    //             aria-label="Close"
    //           ></button>
    //         </div>
    //         <div class="offcanvas-body">
    //           <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    //             <li class="nav-item">
    //               <a class="btn btn-primary" aria-current="page" href="/new"
    //                 >Create New</a
    //               >
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    // </header>`;
  }
}

export default Header;
