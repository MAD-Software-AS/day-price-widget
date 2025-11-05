import React, { useState } from 'react'

import BookingListItem from './components/BookingListItem'
import { SalonAvailability } from 'src/app/contexts/Widget/useGetWidgetContextData'
import TermsAndConditionsModal from '../../../TermsAndConditions/TermsAndConditionsModal'

interface BookingListProps {
  bookings: SalonAvailability[]
  bookingName?: string
}

const BookingList: React.FC<BookingListProps> = ({ bookings, bookingName }) => {
  const [
    isTermsAndConditionsModalVisible,
    setIsTermsAndConditionsModalVisible
  ] = useState(false)

  const onModalOpen = () => setIsTermsAndConditionsModalVisible(true)
  const onModalClose = () => setIsTermsAndConditionsModalVisible(false)

  return (
    <>
      {bookings?.length ? (
        bookings?.map(({ date, discountedPrice, normalPrice }, index) => (
          <BookingListItem
            key={index}
            price={discountedPrice}
            date={date}
            bookingName={bookingName}
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
  )
}

export default BookingList
