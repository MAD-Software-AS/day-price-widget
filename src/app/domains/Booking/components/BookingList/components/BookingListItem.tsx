import React from "react";
import useWidgetContext from "../../../../../contexts/Widget/useWidgetContext";

interface BookingListItemProps {
  date: string;
  price: number;
  originalPrice: number;
  bookingName?: string
  openTermsModal: () => void
}

const BookingListItem: React.FC<BookingListItemProps> = ({
  date,
  originalPrice,
  price,
  bookingName,
  openTermsModal
}) => {
  const { setIsBookingModalOpened, setBookingModalContext, chainDayPrice } =
    useWidgetContext();

  const onReserveClick = () => {
    setBookingModalContext?.({
      date,
      price,
      startTime: chainDayPrice!.startTime,
      endTime: chainDayPrice!.endTime,
    });
    setIsBookingModalOpened?.(true);
  };

  return (
    <div className="card">
      <p className="widget-card-date">
        <strong>{date}</strong>
      </p>
      <p>Flexipris akkurat nå:</p>
      <p className="price">{price},-</p>
      {bookingName ? <div>{bookingName}</div> : null}
      <p>
        ord.pris <del>{originalPrice},-</del>
      </p>
      <div className="terms-link" onClick={openTermsModal}>Vilkår og betingelser</div>
      <button
        className="reserve-btn"
        data-date={date}
        onClick={onReserveClick}
        data-price={price}
      >
        Reserver Pris
      </button>
    </div>
  );
};

export default BookingListItem;
