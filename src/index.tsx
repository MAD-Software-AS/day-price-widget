import * as React from "react";

import App from "./app/App";
import ReactDOM from "react-dom/client";
import { createTemplate } from "./template";
import setupCSSVars from "./app/utils/setupCSSVars";

const WC_TAG_NAME = "mad-widget";

export default function createComponent(config: any) {
  const template = createTemplate(config?.targetId);

  class MADBookingSection extends HTMLElement {
    constructor() {
      super();

        const targetElement = document.getElementById(config.targetId);
        if (targetElement) {
          const container = document.createElement("div");
          container.classList.add("section");
          targetElement.appendChild(container);
          this.renderApp(container);
        } else {
          console.error(`Element with id '${config.targetId}' not found.`);
        }
    }

    renderApp(container: HTMLDivElement) {
      if (!container) return;

      const shadowDOM = this.attachShadow({ mode: "open" });
      // Render the template in the shadow dom
      shadowDOM.appendChild(template.content.cloneNode(true));
      shadowDOM.appendChild(container)

      const root = ReactDOM.createRoot(container);
      root.render(
        <React.StrictMode>
          <App chainId={config.chainId} env={config.env || "prod"} isSection />
        </React.StrictMode>
      );
    }
  }

  class MADBookingWidgetElement extends HTMLElement {
    constructor() {
      super();

      const shadowDOM = this.attachShadow({ mode: "open" });
      // Render the template in the shadow dom
      shadowDOM.appendChild(template.content.cloneNode(true));

      shadowDOM
        .querySelector("#widget-toggle-button")
        ?.addEventListener("click", () => {
          const Container = shadowDOM.getElementById("mad-widget-container");
          if (Container) {
            shadowDOM.getElementById("mad-widget-container")?.remove();
          } else {
            const newContainer = document.createElement("div");
            newContainer.classList.add("widget");
            newContainer.id = "mad-widget-container";

            shadowDOM?.appendChild(newContainer);
            const root = ReactDOM.createRoot(newContainer!);

            root.render(
              <React.StrictMode>
                <App chainId={config.chainId} env={config.env || "prod"} />
              </React.StrictMode>
            );
          }
        });
    }
  }

  if (!customElements.get(WC_TAG_NAME)) {
    customElements.define(WC_TAG_NAME, config.targetId ? MADBookingSection : MADBookingWidgetElement);
  }

  // create an instance of the component
  const componentInstance = document.createElement(WC_TAG_NAME, {
    is: WC_TAG_NAME,
  });

  setupCSSVars(componentInstance.shadowRoot!, config?.cssVars);

  // mount the component instance in the body element
  const container = config?.targetId ? document.getElementById(config.targetId) : document.body;
  container?.appendChild(componentInstance);

  return componentInstance;
}
