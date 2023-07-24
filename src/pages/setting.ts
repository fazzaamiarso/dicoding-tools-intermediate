/* eslint-disable no-underscore-dangle */
import { customElement } from "lit/decorators.js";
import { html } from "lit";
import { localized, msg } from "@lit/localize";
import LitNoShadow from "@/components/lit-no-shadow";
import { appTemplate } from "@/components/layout/app-template";

@customElement("setting-page")
@localized()
class SettingPage extends LitNoShadow {
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
