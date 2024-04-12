import React, { useEffect, useState } from 'react'
import { getAmenities } from '../../common/utils/common.utils'
import './Amenities.scss'

const Amenities = ({
  amenities
}) => {
  const [filteredAmenities, setFilteredAmenities] = useState([])
  useEffect(() => {
    setFilteredAmenities(getAmenities(amenities))
  }, [amenities])
  return (
    <div className="amenities customSection">
      <h1 className='mainHeadings'>Amenities</h1>
      <div className="amenitiesOptions ">
        {
          filteredAmenities.map((item, index) =>
            <span className='icons' key={index}>
              {item.comp}
              <p className='info-small'>{item.label}</p>
            </span>
          )
        }
      </div>
    </div>
  )
}

export default Amenities
