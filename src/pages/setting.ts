/* eslint-disable @typescript-eslint/lines-between-class-members */

import { customElement } from "lit/decorators.js";
import { html } from "lit";
import { localized, msg } from "@lit/localize";
import LitNoShadow from "@/components/lit-no-shadow";
import { appTemplate } from "@/components/layout/app-template";
import authService from "@/services/api/auth-service";

@customElement("setting-page")
@localized()
class SettingPage extends LitNoShadow {
  // eslint-disable-next-line consistent-return
  async onBeforeEnter(_location: any, commands: any) {
    if (!(await authService.isAuthenticated())) {
      return commands.redirect("/login");
    }
  }
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
