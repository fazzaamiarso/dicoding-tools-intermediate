/* eslint-disable no-underscore-dangle */
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import { allLocales } from "../generated/locale-codes";
import { getLocale, localeNames, setLocaleFromUrl } from "@/services/localization-service";
import LitNoShadow from "./lit-no-shadow";

@customElement("locale-picker")
@localized()
class LocalePicker extends LitNoShadow {
  render() {
    return html`
      <div class="container">
        <label for="change-language" class="mb-2">${msg("Select preferred language:")}</label>
        <select id="change-language" @change=${this._localeChanged} class="form-select">
          ${allLocales.map(
            (locale) => html`
              <option value=${locale} ?selected=${locale === getLocale()}>${localeNames[locale]}</option>
            `,
          )}
        </select>
      </div>
    `;
  }

  _localeChanged(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;
    const newLocale = event.target.value as string;

    if (newLocale !== getLocale()) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", newLocale);

      window.history.pushState(null, "", url.toString());
      setLocaleFromUrl();
    }
  }
}

export default LocalePicker;
