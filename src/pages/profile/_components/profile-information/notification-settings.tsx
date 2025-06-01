'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function NotificationSettings() {
	const [selectedGroup, setSelectedGroup] = useState('Office Time Reminder');
	const [isEnabled, setIsEnabled] = useState(false);

	return (
		<div className='space-y-6 px-4 py-4'>
			<div className='space-y-2'>
				<Label className='text-sm font-medium text-gray-600'>Select Notification Group</Label>
				<div className='flex items-center gap-4'>
					<Select value={selectedGroup} onValueChange={setSelectedGroup}>
						<SelectTrigger className='flex-1'>
							<SelectValue placeholder='Select notification group' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='Office Time Reminder'>Office Time Reminder</SelectItem>
							<SelectItem value='Leave Notifications'>Leave Notifications</SelectItem>
							<SelectItem value='Attendance Alerts'>Attendance Alerts</SelectItem>
							<SelectItem value='System Updates'>System Updates</SelectItem>
						</SelectContent>
					</Select>
					<div className='flex items-center gap-2'>
						<Switch id='notification-toggle' checked={isEnabled} onCheckedChange={setIsEnabled} />
						<Label htmlFor='notification-toggle' className='text-sm font-medium'>
							{isEnabled ? 'On' : 'Off'}
						</Label>
					</div>
				</div>
			</div>

			<div className='rounded-md border bg-gray-50 p-4'>
				<p className='text-sm italic text-gray-600'>
					Notification settings not found for this Group. <span className='font-medium'>Click</span> the
					button to On Notification for this user
				</p>
			</div>
		</div>
	);
}
