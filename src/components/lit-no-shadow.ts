import { LitElement } from "lit";

class LitNoShadow extends LitElement {
  createRenderRoot() {
    return this;
  }
}

export default LitNoShadow;
