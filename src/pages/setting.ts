/* eslint-disable @typescript-eslint/lines-between-class-members */

import { customElement } from "lit/decorators.js";
import { html } from "lit";
import { localized, msg } from "@lit/localize";
import { appTemplate } from "@/components/layout/app-template";
import AppPage from "@/components/base/app-page";

@customElement("setting-page")
@localized()
class SettingPage extends AppPage {
  protected render() {
    return appTemplate(html`
      <h2 class="mb-4">${msg("Settings")}</h2>
      <div>
        <locale-picker></locale-picker>
      </div>
    `);
  }
}

export default SettingPage;
