import { TemplateResult, html } from "lit";

// Have to opt out from component because <slot> can only work with Shadow DOM
// eslint-disable-next-line import/prefer-default-export
export const appTemplate = (children: TemplateResult) => html`
  <app-header></app-header>
  <skip-link></skip-link>
  <main id="main-content" class="container-sm pb-5">${children}</main>
  <scroll-top></scroll-top>
`;
