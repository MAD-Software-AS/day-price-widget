import { useCallback, useEffect, useMemo, useState } from 'react'

import { Salon } from '../../domains/Salon/Salon.model'
import getApiUrl from '../../utils/getApiUrl'

export type ChainDayPrice = {
  objectId: string
  name: string
  normalPrice: number
  numberOfDays: number
  includeWeekends: boolean
  startTime: string
  endTime: string
  discountThreshold: number
  discountStrength: {
    [key: string]: number
  }
}

export type SalonAvailability = {
  date: string
  discountPercent: number
  discountedPrice: number
  normalPrice: number
}

type ChainSalonsState = {
  salons: Salon[]
  chainDayPrice: ChainDayPrice | null
  availabilities: {
    [key: string]: SalonAvailability[]
  }
  termsAndConditions: ChainTermsAndConditions | null
  loading: boolean
  error: Error | null
}

export type ChainTermsAndConditions = {
  objectId: string
  paragraphs: {
    id: number
    value: string
  }[]
}

const INITIAL_STATE: ChainSalonsState = {
  salons: [],
  chainDayPrice: null,
  availabilities: {},
  termsAndConditions: null,
  loading: true,
  error: null
}

const useGetWidgetContextData = (
  chainId: string,
  setSelectedSalon: React.Dispatch<React.SetStateAction<string | null>>,
  env: string
) => {
  const [state, setState] = useState(INITIAL_STATE)

  const loadSalons = useCallback(async () => {
    try {
      const response = await fetch(
        `${getApiUrl(env)}/chains/availabilities/${chainId}`,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const responseData = await response.json()

      setState({
        salons: responseData.salons,
        chainDayPrice: responseData.chainDayPrice,
        availabilities: responseData.availabilities,
        termsAndConditions: responseData.termsAndConditions,
        error: null,
        loading: false
      })
      setSelectedSalon((responseData.salons as Salon[])?.[0]?.objectId)
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error as Error }))
    }
  }, [chainId])

  useEffect(() => {
    loadSalons()
  }, [loadSalons])

  return useMemo(() => ({ ...state }), [state])
}

export default useGetWidgetContextData
