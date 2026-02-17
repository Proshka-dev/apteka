import Link from 'next/link';
import { Icon } from '@/shared/ui';

export const Logo = () => {
	return (
		<Link href="/" className="flex items-center gap-5">
			<Icon name='logo' className="w-12.5 h-12.5" />

			<div className="flex flex-col">
				<div className="text-[#011D71] font-[raleway] text-[22px]">
					<span className="font-extrabold">
						Аптека
					</span>
					<span className="font-normal">
						.онлайн
					</span>

				</div>
				<span className="text-[#7894A4] font-[roboto] text-[14px]">
					Ваша онлайн аптека
				</span>
			</div>
		</Link>
	);
};