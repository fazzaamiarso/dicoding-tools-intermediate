import { customElement } from "lit/decorators.js";
import { LitElement, html } from "lit";

@customElement("app-footer")
class Footer extends LitElement {
  protected render() {
    return html`<footer>
      <p>Made by Fazza Razaq Amiarso - 2023</p>
    </footer>`;
  }
}

export default Footer;
