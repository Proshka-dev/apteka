import React from 'react';

import { BabyBoyIcon } from './icons/BabyBoyIcon';
import { ChevronDuoDownIcon } from './icons/ChevronDuoDownIcon';
import { DogIcon } from './icons/DogIcon';
import { EyeIcon } from './icons/EyeIcon';
import { FavoriteBorderIcon } from './icons/FavoriteBorderIcon';
import { FirstAidKitIcon } from './icons/FirstAidKitIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LogoIcon } from './icons/LogoIcon';
import { MenuIcon } from './icons/MenuIcon';
import { MessageOpenIcon } from './icons/MessageOpenIcon';
import { NearMeIcon } from './icons/NearMeIcon';
import { PersonIcon } from './icons/PersonIcon';
import { PhoneIcon } from './icons/PhoneIcon ';
import { PillsIcon } from './icons/PillsIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { SkinCareIcon } from './icons/SkinCareIcon';
import { SmartwatchIcon } from './icons/SmartwatchIcon';
import { VitaminsIcon } from './icons/VitaminsIcon';
import { VkIcon } from './icons/VkIcon';
import { WashingHandsIcon } from './icons/WashingHandsIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { KeyboardArrowDownIcon } from './icons/KeyboardArrowDownIcon';

const icons = {
	babyBoy: BabyBoyIcon,
	chevronDuoDownIcon: ChevronDuoDownIcon,
	dogIcon: DogIcon,
	eyeIcon: EyeIcon,
	favoriteBorder: FavoriteBorderIcon,
	firstAidKit: FirstAidKitIcon,
	instagram: InstagramIcon,
	logo: LogoIcon,
	menu: MenuIcon,
	messageOpen: MessageOpenIcon,
	nearMe: NearMeIcon,
	person: PersonIcon,
	phone: PhoneIcon,
	pills: PillsIcon,
	search: SearchIcon,
	shoppingCart: ShoppingCartIcon,
	skinCare: SkinCareIcon,
	smartwatch: SmartwatchIcon,
	vitamins: VitaminsIcon,
	vk: VkIcon,
	washingHands: WashingHandsIcon,
	youtube: YoutubeIcon,
	keyboardArrowDown: KeyboardArrowDownIcon,
};

export type IconName = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
	name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
	const Component = icons[name];

	return <Component {...props} />;
};