import BookingListItem from "./components/BookingListItem";
import React from "react";
import { SalonAvailability } from "src/app/contexts/Widget/useGetWidgetContextData";

interface BookingListProps {
  bookings: SalonAvailability[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <>
      {bookings?.length ? bookings?.map(({ date, discountedPrice, normalPrice }, index) => (
        <BookingListItem
          key={index}
          price={discountedPrice}
          date={date}
          originalPrice={normalPrice}
        />
      )) : <div className="no-data-container">No data for selected salon</div>}
    </>
  );
};

export default BookingList;
