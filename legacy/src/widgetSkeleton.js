import { generateStyles } from "./generateStyles";

export const getWidgetSkeletonShadowNode = () => {
  const widgetContainer = document.createElement("div");
  document.body.appendChild(widgetContainer);

  const shadowRoot = widgetContainer.attachShadow({ mode: "open" });

  const computedStyles = generateStyles(window.dayPriceWidgetTheme)

  shadowRoot.innerHTML = `
        <style>${computedStyles}</style>
        
        <div id='mad-widget' class="widget">
            <div class="widget-header">
                <div class="custom-select">
                <button class="select-trigger">
                    <div class="selected-option">Chain Admin</div>
                    <span class="arrow">&#9662;</span>
                </button>
                <ul class="select-options">
                    <li class="option">Chain Admin</li>
                    <li class="option">Chain Level</li>
                    <li class="option">Manager</li>
                    <li class="option">Employee</li>
                </ul>
                </div>
                <button id="widget-close-button" class="widget-close-button">Close</button>
            </div>
            <div class="widget-content"></div>
            </div>
            <div id="modalBackdrop" class="modal-backdrop" style="display: none">
            <div class="modal">
                <div class="modal-header">
                <div>
                    <div>
                    <span>Dato: </span>
                    <span id="modal-date"></span>
                    </div>
                    <div>
                    <span>Siste oppstart: kl. 14.00</span>
                    </div>
                </div>

                <div>
                    <span>Dagpris: </span>
                    <span id="modal-price"></span>
                </div>
                </div>

                <div class="modal-description">
                Din Dagpris blir nå reservert, men du er først garantert ledig time når
                timen er bestilt (neste steg).
                </div>

                <div class="modal-body">
                <div>
                    <div class="input-label">Name:</div>
                    <input type="text" class="input" placeholder="Enter your name" />
                </div>

                <div>
                    <div class="input-label">Phone:</div>
                    <input
                    type="tel"
                    class="input"
                    placeholder="Enter phone number in format +47XXXXXXXX"
                    pattern="\+47[0-9]{8}"
                    />
                </div>
                <p class="modal-additional-text">
                    Du vil nå motta en sms med videre instrukser.
                </p>
                </div>
                <div class="modal-actions">
                <button id="cancelButton" class="widget-close-button">Cancel</button>
                <button id="saveButton" class="save-button">OK</button>
                </div>
            </div>
        </div>
        <button id="widget-toggle-button" class="widget-toggle-button">Open</button>`;

  const modalBackdrop = shadowRoot.querySelector("#modalBackdrop");
  const cancelButton = shadowRoot.querySelector("#cancelButton");
  const toggleButton = shadowRoot.querySelector("#widget-toggle-button");
  const closeButton = shadowRoot.querySelector("#widget-close-button");
    const widget = shadowRoot.querySelector('.widget');

  // Open/close widget actions
  toggleButton.addEventListener("click", () => {
    widget.style.display = "block";
  });
  closeButton.addEventListener("click", () => {
    widget.style.display = "none";
  });

  // Close modal actions
  cancelButton.addEventListener("click", () => {
    modalBackdrop.style.display = "none";
  });
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.style.display = "none";
    }
  });

  return shadowRoot;
};
