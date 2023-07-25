import { customElement, property } from "lit/decorators.js";
import { html } from "lit";
import LitNoShadow from "./base/lit-no-shadow";

@customElement("bs-icon")
class BoostrapIcon extends LitNoShadow {
  @property({ type: String }) icon = "";

  @property({ type: String }) textColor = "";

  @property({ type: Number }) size = 24;

  protected render() {
    return html`<i
      class="${this.icon} ${this.textColor.length ? this.textColor : "text-secondary "}"
      style="font-size: ${this.size}px;"
    ></i>`;
  }
}

export default BoostrapIcon;
