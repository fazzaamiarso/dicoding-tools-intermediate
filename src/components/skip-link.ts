import { customElement } from "lit/decorators.js";
import { LitElement, css, html } from "lit";

@customElement("skip-link")
class SkipLink extends LitElement {
  static styles = css`
    a {
      font-weight: 500;
      background-color: white;
      display: inline-block;
      text-decoration: none;
      padding: 1rem;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      transform: translateX(-100%);
    }
    a:focus-visible {
      transform: translateX(0);
    }
  `;

  protected render() {
    return html`<a href="#outlet">Skip to content</a>`;
  }
}

export default SkipLink;
