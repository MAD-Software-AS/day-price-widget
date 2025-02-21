import React, { ChangeEvent, useRef, useState } from "react";

import Loading from "../../../../components/Loading";
import getApiUrl from "../../../../utils/getApiUrl";
import useWidgetContext from "../../../../contexts/Widget/useWidgetContext";

const BookingModal: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [nameInputValidation, setNameInputValidation] = useState({
    isDirty: true,
  });
  const [emailInputValidation, setEmailInputValidation] = useState({
    isDirty: true,
    isValid: true,
  });

  const {
    env,
    chainDayPrice,
    selectedSalon,
    salons,
    isBookingModalOpened,
    setIsBookingModalOpened,
    bookingModalContext,
    setBookingModalContext,
  } = useWidgetContext();

  const onCancelClick = () => {
    setBookingModalContext?.(null);
    setIsBookingModalOpened?.(false);
    nameInputRef.current!.value = ''
    emailInputRef.current!.value = ''
  };

  const onOkClick = async () => {
    if (!nameInputRef.current?.value) {
      setNameInputValidation({ isDirty: false });
      return setEmailInputValidation({
        isDirty: !!emailInputRef.current?.value,
        isValid: emailInputRef.current?.value
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInputRef.current?.value)
          : false,
      });
    }
    if (
      !emailInputRef.current?.value ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInputRef.current?.value)
    )
      return setEmailInputValidation({
        isDirty: !!emailInputRef.current?.value,
        isValid: emailInputRef.current?.value
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInputRef.current?.value)
          : false,
      });
    try {
      setLoading(true);
      const salon =
        salons?.find(({ objectId }) => objectId === selectedSalon)
      await fetch(`${getApiUrl(env)}/chains/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInputRef.current?.value,
          name: nameInputRef.current?.value,
          date: bookingModalContext?.date,
          price: bookingModalContext?.price,
          treatmentName: chainDayPrice?.name,
          salonId: salon?.objectId || selectedSalon,
          chainId: chainDayPrice?.objectId,
          salonName: salon?.name || selectedSalon,
          workingHours:`${bookingModalContext?.startTime} - ${bookingModalContext?.endTime}`
        }),
      });
      alert(`Email with booking info has been sent to ${emailInputRef.current?.value}`)
      onCancelClick()
    } catch (error) {
      alert(`Error occurred during sending email: ${(error as Error).message}`);
      console.log("Error:", error);
    } finally {
        setLoading(false);
    }
  };

  const onNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value && nameInputValidation.isDirty)
      return setNameInputValidation({ isDirty: false });
    if (e.target.value && !nameInputValidation.isDirty)
      return setNameInputValidation({ isDirty: true });
  };

  const onEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value && emailInputValidation.isDirty)
      return setEmailInputValidation((prev) => ({ ...prev, isDirty: false }));
    if (e.target.value && !emailInputValidation.isDirty)
      return setEmailInputValidation({
        isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value),
        isDirty: true,
      });
    return setEmailInputValidation((prev) => ({
      ...prev,
      isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value),
    }));
  };

  return isBookingModalOpened ? (
    <div id="modalBackdrop" className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div>
            <div>
              <span>Dato: </span>
              <span id="modal-date">{bookingModalContext?.date}</span>
            </div>
            <div>
              <span>{`Siste oppstart: ${bookingModalContext?.startTime} - ${bookingModalContext?.endTime}`}</span>
            </div>
          </div>

          <div>
            <span>Dagpris: </span>
            <span id="modal-price">{bookingModalContext?.price}</span>
          </div>
        </div>

        <div className="modal-description">
          Din Dagpris blir nå reservert, men du er først garantert ledig time
          når timen er bestilt (neste steg).
        </div>

        <div className="modal-body">
          <div>
            <div className="input-label">Navn:</div>
            <input
              ref={nameInputRef}
              onChange={onNameInputChange}
              type="text"
              className={`input${
                !nameInputValidation.isDirty ? " input-error" : ""
              }`}
              placeholder="Skriv inn navnet ditt"
            />
            {!nameInputValidation.isDirty ? (
              <div className="text-error">Vennligst skriv inn navn for bestilling</div>
            ) : null}
          </div>

          <div>
            <div className="input-label">E-post:</div>
            <input
              ref={emailInputRef}
              onChange={onEmailInputChange}
              type="email"
              className={`input${
                !nameInputValidation.isDirty || !emailInputValidation.isValid
                  ? " input-error"
                  : ""
              }`}
              placeholder="Skriv inn e-postadressen din"
            />
            {!emailInputValidation.isDirty || !emailInputValidation.isValid ? (
              <div className="text-error">
                {!emailInputValidation.isDirty
                  ? "Vennligst skriv inn navn for bestilling"
                  : "E-posten er ugyldig"}
              </div>
            ) : null}
          </div>
          <p className="modal-additional-text">
            Du vil nå motta en e-post med videre instrukser.
          </p>
        </div>
        <div className="modal-actions">
          <button
            disabled={loading}
            id="cancelButton"
            onClick={onCancelClick}
            className="widget-close-button"
          >
            Kansellere
          </button>
          <button
            disabled={loading}
            id="saveButton"
            onClick={onOkClick}
            className="save-button"
          >
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              {loading ? (
                <Loading
                  spinnerColor="var(--bg-default)"
                  backgroundColor="transparent"
                  containerHeight={20}
                  spinnerSize={10}
                />
              ) : null}
              <div>Bestill tid</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default BookingModal;
