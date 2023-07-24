/* eslint-disable no-underscore-dangle */
import { customElement, query } from "lit/decorators.js";
import { html } from "lit";
import { localized, msg } from "@lit/localize";
import LitNoShadow from "@/components/lit-no-shadow";
import storyService from "@/services/story-service";

@customElement("register-page")
@localized()
class RegisterPage extends LitNoShadow {
  @query("form") form: HTMLFormElement | undefined;

  private async _onSubmit(event: Event) {
    event.preventDefault();
    if (!this.form) return;
    const formData = new FormData(this.form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await storyService.register({ name, email, password });
    window.location.assign("/");
  }

  protected render() {
    return html`
      <main class="d-flex align-items-center justify-content-center container">
        <div class="container-sm">
          <h2 class="mb-4">${msg("Register")}</h2>
          <form @submit=${this._onSubmit}>
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input id="name" name="name" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input id="email" name="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input id="password" type="password" name="password" class="form-control" required minlength="8" />
            </div>
            <button class="btn btn-primary">Register</button>
          </form>
        </div>
      </main>
    `;
  }
}

export default RegisterPage;
