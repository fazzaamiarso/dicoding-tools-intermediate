/* eslint-disable no-underscore-dangle */
import { customElement } from "lit/decorators.js";
import { html } from "lit";
import { localized, msg } from "@lit/localize";
import LitNoShadow from "@/components/lit-no-shadow";
import { appTemplate } from "@/components/layout/app-template";
import storyService from "@/services/story-service";

@customElement("new-page")
@localized()
class NewPage extends LitNoShadow {
  private async _onSubmit(e: Event) {
    e.preventDefault();
    if (!(e.currentTarget instanceof HTMLFormElement)) return;

    this._validateForm(e.currentTarget);
    if (!this._isFormValid(e.currentTarget)) return;

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("story-image") as File;
    const description = formData.get("story-description") as string;

    await storyService.addStory({ photo: imageFile, description });

    window.location.assign("/");
  }

  // eslint-disable-next-line consistent-return
  onBeforeEnter(_location: any, commands: any) {
    if (!storyService.isAuthenticated()) {
      return commands.redirect("/login");
    }
  }

  private _validateForm(form: HTMLFormElement) {
    form.classList.add("was-validated");
  }

  private _isFormValid(form: HTMLFormElement) {
    return form.checkValidity();
  }

  protected render() {
    return appTemplate(
      html` <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">New</li>
          </ol>
        </nav>
        <h2>${msg("New Story")}</h2>
        <form @submit=${this._onSubmit} novalidate>
          <div class="mb-3">
            <label for="story-image" class="form-label">${msg("Upload image")}</label>
            <input class="form-control" name="story-image" type="file" id="story-image" accept="image/*" required />
            <p class="valid-feedback">${msg("Look's good!")}</p>
            <p class="invalid-feedback">${msg("Please provide a valid description")}</p>
          </div>
          <div class="mb-3">
            <label for="story-description" class="form-label">${msg("Description")} </label>
            <textarea class="form-control" name="story-description" id="story-description" required></textarea>
            <p class="valid-feedback">${msg("Look's good!")}</p>
            <p class="invalid-feedback">${msg("Please provide a valid description")}</p>
          </div>
          <button class="btn btn-primary">${msg("Post Story")}</button>
        </form>
      </div>`,
    );
  }
}

export default NewPage;
