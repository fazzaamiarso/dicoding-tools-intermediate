/* eslint-disable no-param-reassign */
import { customElement, query, state } from "lit/decorators.js";
import { html } from "lit";
import { localized, msg } from "@lit/localize";
import { appTemplate } from "@/components/layout/app-template";
import storyService from "@/services/api/story-service";
import { dangerToast } from "@/components/ui/toast";
import AppPage from "@/components/base/app-page";

@customElement("new-page")
@localized()
class NewPage extends AppPage {
  @query("form") form!: HTMLFormElement;

  @state() private _isSubmitting = false;

  private async _onSubmit(e: Event) {
    e.preventDefault();
    this._isSubmitting = true;

    this._validateForm();
    if (!this._isFormValid()) {
      this._setValidationMessage();
      this._isSubmitting = false;
      return;
    }

    const formData = new FormData(this.form);
    const imageFile = formData.get("story-image") as File;
    const description = formData.get("story-description") as string;

    try {
      await storyService.addStory({ photo: imageFile, description });
      window.location.assign("/");
    } catch (error: any) {
      dangerToast(error.message).showToast();
    } finally {
      this._isSubmitting = false;
    }
  }

  private _setValidationMessage() {
    this.form.querySelectorAll("input").forEach((input) => {
      input.parentElement!.querySelector(".invalid-feedback")!.innerHTML = input.validationMessage;
    });
  }

  private _validateForm() {
    this.form.classList.add("was-validated");
  }

  private _isFormValid() {
    return this.form.checkValidity();
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
          ${this._isSubmitting
            ? html`<button class="btn btn-primary container" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>`
            : html`<button class="btn btn-primary container">${msg("Post Story")}</button>`}
        </form>
      </div>`,
    );
  }
}

export default NewPage;
