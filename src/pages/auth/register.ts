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

  // eslint-disable-next-line consistent-return
  onBeforeEnter(_location: any, commands: any) {
    if (storyService.isAuthenticated()) {
      return commands.redirect("/");
    }
  }

  private async _onSubmit(event: Event) {
    event.preventDefault();
    if (!this.form) return;
    const formData = new FormData(this.form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await storyService.register({ name, email, password });
    await storyService.login({ email, password });
    window.location.assign("/");
  }

  protected render() {
    return html`
      <main style="height:100vh;" class="d-flex align-items-center justify-content-center container">
        <div class="container-sm">
          <h2 class="mb-4">${msg("Register")}</h2>
          <form @submit=${this._onSubmit} novalidate class="mb-4">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input id="name" name="name" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input id="email" name="email" class="form-control" required />
            </div>
            <password-field></password-field>
            <button class="btn btn-primary container">Register</button>
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
