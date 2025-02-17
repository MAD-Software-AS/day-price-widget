import BookingList from "../../domains/Booking/components/BookingList/BookingList";
import Loading from "../../components/Loading";
import React from "react";
import SalonSelect from "../../domains/Salon/components/SalonSelect";
import useWidgetContext from "../../contexts/Widget/useWidgetContext";

const Widget: React.FC<{ isSection?: boolean }> = ({ isSection }) => {
  const { availabilities, selectedSalon, loading } = useWidgetContext();

  const onCloseClick = () => {
    document
      .querySelector("mad-widget")
      ?.shadowRoot?.getElementById("mad-widget-container")
      ?.remove();
  };

  const bookings = selectedSalon ? availabilities?.[selectedSalon] || [] : [];

  return (
    <>
      <div
        style={!isSection ? { padding: "0 12px" } : undefined}
        className="widget-header"
      >
        <div>
          <SalonSelect />
        </div>
        {!isSection ? (
          <button
            id="widget-close-button"
            className="widget-close-button"
            onClick={onCloseClick}
          >
            Close
          </button>
        ) : null}
      </div>
      <div className={isSection ? "section-content" : "widget-content"}>
        {loading ? (
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Loading />
          </div>
        ) : (
          <BookingList bookings={bookings} />
        )}
      </div>
    </>
  );
};

export default Widget;
