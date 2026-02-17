import { Montserrat, Raleway, Roboto } from 'next/font/google';

export const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-montserrat',
	display: 'swap',
});

export const raleway = Raleway({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '800'],
	variable: '--font-raleway',
	display: 'swap',
});

export const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '700'],
	variable: '--font-roboto',
	display: 'swap',
});