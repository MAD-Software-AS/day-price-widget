import React from "react";
import useWidgetContext from "../../../../contexts/Widget/useWidgetContext";

interface TermsAndConditionsModalProps {
  isTermsAndConditionsModalOpened: boolean;
  onTermsAndConditionsModalClose: () => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  isTermsAndConditionsModalOpened,
  onTermsAndConditionsModalClose,
}) => {
  const { termsAndConditions } = useWidgetContext();
console.log('termsAndConditions:', termsAndConditions)
  return isTermsAndConditionsModalOpened ? (
    <div id="modalBackdrop" className="modal-backdrop">
      <div className="terms-modal">
      <div className="terms-modal-header">Vilkår og betingelser</div>
        <div className="terms-modal-body">
          {termsAndConditions?.paragraphs?.map((paragraph, index) => (
            <p style={{marginTop:0}}>{`${index + 1}. ${paragraph?.value}`}</p>
          ))}
        </div>
        <div className="modal-actions">
          <button
            onClick={onTermsAndConditionsModalClose}
            className="widget-close-button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default TermsAndConditionsModal;
