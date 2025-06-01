'use client';

import { useState } from 'react';
import { Eye, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ChangePassword() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form className='space-y-6 px-4 py-2'>
			<div className='space-y-2'>
				<Label htmlFor='current-password' className='text-sm font-medium text-gray-600'>
					Current Password
				</Label>
				<div className='relative'>
					<Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
					<Input
						id='current-password'
						type='password'
						placeholder='Enter current password'
						className='pl-10'
					/>
				</div>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='new-password' className='text-sm font-medium text-gray-600'>
					Password
				</Label>
				<div className='relative'>
					<Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
					<Input
						id='new-password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Enter new password'
						className='pl-10 pr-10'
					/>
					<Button
						type='button'
						variant='ghost'
						size='sm'
						className='absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform p-0'
						onClick={() => setShowPassword(!showPassword)}
					>
						<Eye className='h-4 w-4 text-gray-400' />
					</Button>
				</div>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='confirm-password' className='text-sm font-medium text-gray-600'>
					Confirm Password
				</Label>
				<div className='relative'>
					<Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
					<Input id='confirm-password' type='password' placeholder='Confirm new password' className='pl-10' />
				</div>
			</div>

			<Button type='submit' className='bg-gray-400 text-white hover:bg-gray-500'>
				Submit
			</Button>
		</form>
	);
}
