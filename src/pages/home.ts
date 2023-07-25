import { customElement } from "lit/decorators.js";
import { html } from "lit";
import { range } from "lit/directives/range.js";
import { map } from "lit/directives/map.js";
import { Task } from "@lit-labs/task";
import LitNoShadow from "@/components/lit-no-shadow";
import storyService from "@/services/api/story-service";
import { Story } from "@/types";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { appTemplate } from "@/components/layout/app-template";
import authService from "@/services/api/auth-service";

@customElement("home-page")
class HomePage extends LitNoShadow {
  private _storyTask = new Task(
    this,
    async () => storyService.getAllStories(),
    () => [],
  );

  // eslint-disable-next-line consistent-return
  async onBeforeEnter(_location: any, commands: any) {
    if (!(await authService.isAuthenticated())) {
      return commands.redirect("/login");
    }
  }

  protected render() {
    return appTemplate(
      html`<user-story></user-story>
        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          ${this._storyTask.render({
            pending: () => map(range(9), this._renderPlaceholder),
            complete: ({ data }) => data.map(this._renderStoryCard),
          })}
        </div>`,
    );
  }

  _renderPlaceholder() {
    return html`<div class="col">
      <div class="card" aria-hidden="true">
        <img src="https://picsum.photos/600/350" class="card-img-top" alt="" />
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
        </div>
      </div>
    </div>`;
  }

  _renderStoryCard(story: Story) {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date(story.createdAt));

    return html`<div class="col">
      <div class="card rounded-2">
        <img data-src=${story.photoUrl} class="card-img-top lazyload" alt=${story.name} />
        <div class="card-body">
          <h2 class="card-title">${story.name}</h2>
          <div class="card-text">${formattedDate}</div>
          <p class="card-text">${story.description}</p>
        </div>
      </div>
    </div>`;
  }
}

export default HomePage;
