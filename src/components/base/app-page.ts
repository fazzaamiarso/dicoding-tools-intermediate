/* eslint-disable consistent-return */
import type { BeforeEnterObserver } from "@vaadin/router";
import { customElement } from "lit/decorators.js";
import LitNoShadow from "@/components/base/lit-no-shadow";
import authService from "@/services/api/auth-service";

type OnBeforeEnterParams = Parameters<BeforeEnterObserver["onBeforeEnter"]>;

@customElement("app-page")
class AppPage extends LitNoShadow {
  async onBeforeEnter(_location: OnBeforeEnterParams[0], commands: OnBeforeEnterParams[1]) {
    if (!(await authService.isAuthenticated())) {
      return commands.redirect("/login");
    }
  }
}

export default AppPage;
