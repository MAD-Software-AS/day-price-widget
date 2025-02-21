import React, { useState } from "react";

import BookingListItem from "./components/BookingListItem";
import { SalonAvailability } from "src/app/contexts/Widget/useGetWidgetContextData";
import TermsAndConditionsModal from "../../../TermsAndCondtions/components/TermsAndConditionsModal/TermsAndConditionsModal";

interface BookingListProps {
  bookings: SalonAvailability[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const [
    isTermsAndConditionsModalVisible,
    setIsTermsAndConditionsModalVisible,
  ] = useState(false);

  const onModalOpen = () => setIsTermsAndConditionsModalVisible(true);
  const onModalClose = () => setIsTermsAndConditionsModalVisible(false);

  return (
    <>
      {bookings?.length ? (
        bookings?.map(({ date, discountedPrice, normalPrice }, index) => (
          <BookingListItem
            key={index}
            price={discountedPrice}
            date={date}
            openTermsModal={onModalOpen}
            originalPrice={normalPrice}
          />
        ))
      ) : (
        <div className="no-data-container">Ingen data for valgt salong</div>
      )}
      <TermsAndConditionsModal
        isTermsAndConditionsModalOpened={isTermsAndConditionsModalVisible}
        onTermsAndConditionsModalClose={onModalClose}
      />
    </>
  );
};

export default BookingList;
