import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import LitNoShadow from "./base/lit-no-shadow";

@customElement("password-field")
class PasswordField extends LitNoShadow {
  @state() private _shouldShow = false;

  private _toggleVisibility() {
    this._shouldShow = !this._shouldShow;
  }

  render() {
    return html`
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <div class="input-group">
          <input
            id="password"
            type=${this._shouldShow ? "text" : "password"}
            name="password"
            class="form-control"
            minlength="8"
            required
          />
          <span class="input-group-text" @click=${this._toggleVisibility}
            >${this._shouldShow
              ? html`<bs-icon icon="bi-eye-slash-fill" size=${20}></bs-icon>`
              : html`<bs-icon icon="bi-eye-fill" size=${20}></bs-icon>`}</span
          >
          <p class="invalid-feedback"></p>
        </div>
      </div>
    `;
  }
}

export default PasswordField;
