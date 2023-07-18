import { customElement } from "lit/decorators.js";
import { html } from "lit";
import LitNoShadow from "@/components/lit-no-shadow";

@customElement("new-page")
class NewPage extends LitNoShadow {
  protected render() {
    return html`<div>
      <h2>New Story</h2>
    </div>`;
  }
}

export default NewPage;
