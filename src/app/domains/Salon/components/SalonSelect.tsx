import React, { useState } from 'react'

import useWidgetContext from '../../../contexts/Widget/useWidgetContext'

const SalonSelect: React.FC = () => {
  const [isDropdownVisibile, setIsDropdownVisibile] = useState(false)
  const { salons, selectedSalon, setSelectedSalon } = useWidgetContext()

  const onDropdownButtonClick = () => setIsDropdownVisibile((prev) => !prev)

  const currentlySelected = selectedSalon ? (
    salons?.find(({ objectId }) => objectId === selectedSalon)?.name
  ) : (
    <span className="text-disabled">Ingen tilgjengelige salonger</span>
  )

  const onSalonSelect = (salonId: string) => () => {
    setSelectedSalon?.(salonId)
    setIsDropdownVisibile(false)
  }

  return (
    <div className="custom-select">
      <button className="select-trigger" onClick={onDropdownButtonClick}>
        <div className="selected-option">{currentlySelected}</div>
        <span className="arrow">&#9662;</span>
      </button>
      {isDropdownVisibile ? (
        <div className="select-options">
          {salons?.map(({ name, objectId }) => (
            <div
              className={`option${
                objectId === selectedSalon ? ' selected' : ''
              }`}
              onClick={onSalonSelect(objectId)}
            >
              {name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default SalonSelect
