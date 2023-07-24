/* eslint-disable no-underscore-dangle */
import { customElement, query, state } from "lit/decorators.js";
import { html } from "lit";
import Toastify from "toastify-js";
import { localized, msg } from "@lit/localize";
import LitNoShadow from "@/components/lit-no-shadow";
import storyService from "@/services/story-service";

@customElement("login-page")
@localized()
class LoginPage extends LitNoShadow {
  @query("form") form!: HTMLFormElement;

  @state() _isSubmitting = false;

  private async _onSubmit(event: Event) {
    event.preventDefault();
    if (!this.form) return;

    this._isSubmitting = true;

    this._validateForm();
    if (!this._isFormValid()) {
      this._isSubmitting = false;
      return;
    }

    const formData = new FormData(this.form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error, message } = await storyService.login({ email, password });
    if (error) {
      Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
      }).showToast();
      this._isSubmitting = false;
      return;
    }

    window.location.assign("/");
  }

  private _validateForm() {
    this.form.classList.add("was-validated");
  }

  private _resetForm() {
    this.form.classList.remove("was-validated");
  }

  private _isFormValid() {
    return this.form.checkValidity();
  }

  protected render() {
    return html`
      <main style="height:100vh;" class="d-flex align-items-center justify-content-center container">
        <div class="container-sm">
          <h2 class="mb-4">${msg("Login")}</h2>
          <form @submit=${this._onSubmit} @change=${this._resetForm} novalidate>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input id="email" name="email" class="form-control" required />
            </div>
            <password-field></password-field>
            ${this._isSubmitting
              ? html`<button class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>`
              : html`<button class="btn btn-primary">Login</button>`}
          </form>
        </div>
      </main>
    `;
  }
}

export default LoginPage;
