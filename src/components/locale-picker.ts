/* eslint-disable no-underscore-dangle */
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { allLocales } from "../generated/locale-codes";
import { getLocale, localeNames, setLocaleFromUrl } from "@/services/localization-service";

@customElement("locale-picker")
class LocalePicker extends LitElement {
  render() {
    return html`
      <label for="change-language">Select preferred language:</label>
      <select id="change-language" @change=${this._localeChanged}>
        ${allLocales.map(
          (locale) => html`
            <option value=${locale} ?selected=${locale === getLocale()}>${localeNames[locale]}</option>
          `,
        )}
      </select>
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
