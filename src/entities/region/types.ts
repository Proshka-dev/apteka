import { z } from 'zod'

export const CitySchema = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string().optional(),
})

export type City = z.infer<typeof CitySchema>

export interface RegionStore {
	cities: City[];
	selectedCity: City | null;
	isLoading: boolean;
	error: string | null;
	setSelectedCity: (city: City) => void;
	loadCities: () => Promise<void>; // для будущего API
}