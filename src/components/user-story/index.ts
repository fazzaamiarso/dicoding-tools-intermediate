import { customElement } from "lit/decorators.js";
import { html } from "lit";
import { range } from "lit/directives/range.js";
import { map } from "lit/directives/map.js";
import LitNoShadow from "../lit-no-shadow";
import "./style.scss";

@customElement("user-story")
class UserStory extends LitNoShadow {
  protected render() {
    return html`<div class="container mb-4">
      <ul class="story story__container ">
        ${map(
          range(10),
          () => html` <li class="story__item"><img src="https://picsum.photos/100" alt="" class="story__img" /></li> `,
        )}
      </ul>
    </div> `;
  }
}

export default UserStory;
