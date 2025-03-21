/**
 * Copyright 2025 Tushar
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `github-rpg-contributors`
 * 
 * @demo index.html
 * @element github-rpg-contributors
 */
export class GithubRpgContributors extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributors";
  }

  constructor() {
    super();
    this.organization = '';
    this.repo = '';
    this.limit = 10;
    this.contributors = [];
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/github-rpg-contributors.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      organization: { type: String },
      repo: { type: String },
      limit: { type: Number },
      contributors: { type: Array },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--github-rpg-contributors-label-font-size, var(--ddd-font-size-s));
      }
      .rpg-wrapper  {
        display: inline-flex;
      
      }
    `];
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("organization") || changedProperties.has("repo")) {
      this.fetchContributors();
    }
  }

  fetchContributors() {
    const url = `https://api.github.com/repos/${this.organization}/${this.repo}/contributors`;
  try {
    fetch(url).then(d => d.ok ? d.json(): {}).then(data => {
      if (data) {
        this.contributors = [];
        this.contributors = data;
      }});
  } catch (error) {
    console.error("error", error);
  }
  }   

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
<h3>GitHub Repo: <a href="https://github.com/${this.organization}/${this.repo}">${this.organization}/${this.repo}</a></h3>
</div>
<div class="rpg-wrapper">
${this.contributors.filter((item, index) => index < this.limit).map(item => html`
<div class="contributor">
  <rpg-character seed="${item.login}"></rpg-character>
  <div class="content">
    <a href=https://github.com/${item.login}>${item.login}</a>
    Contributor: ${item.contributions}
  
    </div>
</div>
  `)}
  
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(GithubRpgContributors.tag, GithubRpgContributors);