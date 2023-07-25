import { customElement, query, state } from "lit/decorators.js";
import { html } from "lit";
import { localized, msg } from "@lit/localize";
import authService from "@/services/api/auth-service";
import { dangerToast } from "@/components/ui/toast";
import AuthPage from "@/components/base/auth-page";

@customElement("register-page")
@localized()
class RegisterPage extends AuthPage {
  @query("form") form!: HTMLFormElement;

  @state() private _isSubmitting = false;

  private async _onSubmit(event: Event) {
    event.preventDefault();

    this._isSubmitting = true;

    this._validateForm();
    if (!this._isFormValid()) {
      this._setValidationMessage();
      this._isSubmitting = false;
      return;
    }

    const formData = new FormData(this.form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await authService.register({ name, email, password });
      await authService.login({ email, password });
      window.location.assign("/");
    } catch (error: any) {
      dangerToast(error.message).showToast();
    } finally {
      this._isSubmitting = false;
    }
  }

  private _setValidationMessage() {
    this.form.querySelectorAll("input").forEach((input) => {
      const parentElement = input.id === "password" ? input.parentElement?.parentElement : input.parentElement;
      parentElement!.querySelector(".invalid-feedback")!.innerHTML = input.validationMessage;
    });
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
          <form @submit=${this._onSubmit} @change=${this._resetForm} novalidate class="mb-4">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input id="name" name="name" type="text" class="form-control" required />
              <p class="invalid-feedback"></p>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input id="email" name="email" type="email" class="form-control" required />
              <p class="invalid-feedback"></p>
            </div>
            <password-field></password-field>
            ${this._isSubmitting
              ? html`<button class="btn btn-primary container" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>`
              : html`<button class="btn btn-primary container">Login</button>`}
          </form>
          <p>
            Already a member?
            <a
              href="/login"
              class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >Login here</a
            >
          </p>
        </div>
      </main>
    `;
  }
}

export default RegisterPage;
