import { customElement, state } from "lit/decorators.js";
import { LitElement, css, html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { debounce } from "@/utils/debounce";

const SCROLL_SHOW_VISIBLE = 750;

@customElement("scroll-top")
class ScrollTop extends LitElement {
  @state() _shouldShow = false;

  static styles = css`
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border-radius: 1000px;
      border: none;
      position: fixed;
      padding: 0.25rem;
      z-index: 100;
      bottom: 0;
      right: 0;
      transform: translate(-20%, -20%);
      transition: all 500ms;
    }
  `;

  _onClick() {
    this._shouldShow = false;
    window.scrollTo({ behavior: "instant", top: 0 });
  }

  firstUpdated(): void {
    const scrollCb = debounce(() => {
      const { scrollY } = window;
      this._shouldShow = scrollY > SCROLL_SHOW_VISIBLE;
    }, 1000);
    window.addEventListener("scroll", scrollCb);
  }

  protected render() {
    const styles = { opacity: this._shouldShow ? 1 : 0 };
    return html`<button type="button" @click=${this._onClick} style=${styleMap(styles)}>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-arrow-up-circle-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
        />
      </svg>
    </button> `;
  }
}

export default ScrollTop;
