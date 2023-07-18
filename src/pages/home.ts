import { customElement } from "lit/decorators.js";
import { html } from "lit";
import LitNoShadow from "@/components/lit-no-shadow";
import StoryService from "@/services/story-service";

@customElement("home-page")
class HomePage extends LitNoShadow {
  protected render() {
    return html`<div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
      ${StoryService.getAllStories().map(
        (story) =>
          html`<div class="col">
            <div class="card rounded-2">
              <img
                src=${story.photoUrl}
                class="card-img-top"
                alt=${story.name}
              />
              <div class="card-body">
                <h2 class="card-title">${story.name}</h2>
                <div class="card-text">
                  ${new Intl.DateTimeFormat("en-US", {
                    dateStyle: "long",
                  }).format(new Date(story.createdAt))}
                </div>
                <p class="card-text">${story.description}</p>
              </div>
            </div>
          </div>`
      )}
    </div>`;
  }
}

export default HomePage;
