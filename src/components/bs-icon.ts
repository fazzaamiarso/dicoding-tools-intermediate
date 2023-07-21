import { customElement, property } from "lit/decorators.js";
import { html } from "lit";
import LitNoShadow from "./lit-no-shadow";

@customElement("bs-icon")
class BoostrapIcon extends LitNoShadow {
  @property({ type: String }) icon = "";

  @property({ type: String }) textColor = "";

  protected render() {
    return html`<i
      class="${this.icon} ${this.textColor.length ? this.textColor : "text-secondary "}"
      style="font-size: 24px;"
    ></i>`;
  }
}

export default BoostrapIcon;
