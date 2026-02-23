import { create } from 'zustand'
import { City } from '../types'

interface RegionStore {
	selectedCity: City | null
	setSelectedCity: (city: City) => void
}

export const useRegionStore = create<RegionStore>((set) => ({
	selectedCity: null,
	setSelectedCity: (city) => set({ selectedCity: city }),
}))