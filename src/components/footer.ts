import { customElement } from "lit/decorators.js";
import { html } from "lit";
import LitNoShadow from "./lit-no-shadow";

@customElement("app-footer")
class Footer extends LitNoShadow {
  protected render() {
    return html`<footer class="container-sm">
      <p>Made by Fazza Razaq Amiarso - 2023</p>
    </footer>`;
  }
}

export default Footer;
