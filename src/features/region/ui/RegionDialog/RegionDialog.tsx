// features/region/ui/RegionDialog/RegionDialog.tsx
'use client';

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, ScrollArea } from '@/shared/ui';
import { RegionDialogContent } from './RegionDialogContent';
import { City } from '@/entities/region';

interface RegionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	cities: City[];
	onSelect: (city: City) => void;
}

export const RegionDialog = ({ open, onOpenChange, cities, onSelect }: RegionDialogProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="grid-rows-[auto,1fr] border border-red-600 h-full"> {/* sm:max-w-[760px] p-6 gap-4 sm:h-auto h-screen sm:rounded-lg rounded-none */}
				<DialogHeader className='border border-emerald-600'>
					<DialogTitle>
						Выбор города
					</DialogTitle>
				</DialogHeader>
				<div className='border-2 border-blue-600 min-h-0'>
					<RegionDialogContent
						cities={cities}
						onSelect={onSelect}
						onClose={() => onOpenChange(false)}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};