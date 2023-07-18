/* eslint-disable no-underscore-dangle */
import { customElement } from "lit/decorators.js";
import { html } from "lit";
import LitNoShadow from "@/components/lit-no-shadow";

@customElement("new-page")
class NewPage extends LitNoShadow {
  private _onSubmit(e: Event) {
    e.preventDefault();
    if (!(e.currentTarget instanceof HTMLFormElement)) return;
    this._validateForm(e.currentTarget);
    if (!this._isFormValid(e.currentTarget)) return;

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("story-image");
    const description = formData.get("story-description");
    console.log({ imageFile, description });

    window.location.assign("/");
  }

  private _validateForm(form: HTMLFormElement) {
    form.classList.add("was-validated");
  }

  private _isFormValid(form: HTMLFormElement) {
    return form.checkValidity();
  }

  protected render() {
    return html` <div>
      <h2>New Story</h2>
      <form @submit=${this._onSubmit} novalidate>
        <div class="mb-3">
          <label for="story-image" class="form-label">Upload image</label>
          <input class="form-control" name="story-image" type="file" id="story-image" accept="image/*" required />
          <p class="valid-feedback">Look's good!</p>
          <p class="invalid-feedback">Please upload an image</p>
          <!-- <p id="story-image-error" class=""></p> -->
        </div>
        <div class="mb-3">
          <label for="story-description" class="form-label">Description</label>
          <textarea class="form-control" name="story-description" id="story-description" required></textarea>
          <p class="valid-feedback">Look's good!</p>
          <p class="invalid-feedback">Please provide a valid description</p>
          <!-- <p id="story-description-error" class=""></p> -->
        </div>
        <button class="btn btn-primary">Post Story</button>
      </form>
    </div>`;
  }
}

export default NewPage;
