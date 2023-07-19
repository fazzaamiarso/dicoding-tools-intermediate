import { customElement, property } from "lit/decorators.js";
import { html } from "lit";
import LitNoShadow from "./lit-no-shadow";

@customElement("bs-icon")
class BoostrapIcon extends LitNoShadow {
  @property({ type: String }) icon = "";

  protected render() {
    return html`<i class="${this.icon}" style="font-size: 24px;"></i>`;
  }
}

export default BoostrapIcon;
