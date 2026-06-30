// features/edit-personal-data/ui/EditUserData.tsx
import { GetUserByIdResponse } from '@/entities/user';
import { UserDataForm } from './UserDataForm';
import { PhoneChangeBlock } from './PhoneChangeBlock';
import { EmailChangeBlock } from './EmailChangeBlock';

interface EditUserDataProps {
	user: GetUserByIdResponse;
}

export function EditPersonalData({ user }: EditUserDataProps) {
	return (
		<div className="flex flex-col gap-5">
			<section>
				<PhoneChangeBlock initialPhone={user.phoneNumber || ''} />
			</section>
			<section>
				<EmailChangeBlock initialEmail={user.email || ''} />
			</section>
			<section className='border-t-2 pt-5'>
				<UserDataForm user={user} />
			</section>
		</div>
	);
}