import React from "react";
import useWidgetContext from "../../../../../contexts/Widget/useWidgetContext";

interface BookingListItemProps {
  date: string;
  price: number;
  originalPrice: number;
}

const BookingListItem: React.FC<BookingListItemProps> = ({
  date,
  originalPrice,
  price,
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
      <p>GJELDENE DAGPRIS AKKURAT NÅ:</p>
      <p className="price">{price},-</p>
      <p>
        ord.pris <del>{originalPrice},-</del>
      </p>
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
