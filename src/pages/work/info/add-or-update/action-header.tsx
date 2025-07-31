import DateTime from '@/components/ui/date-time';

const ActionHeader: React.FC<{ form: any; index: number }> = ({ form, index }) => {
	const home_delivery = form.watch(`order_entry.${index}.is_home_repair`);
	if (home_delivery) {
		return undefined;
	}
	return (
		<div className='flex items-center gap-4'>
			<span className='text-sm font-medium'>Entry # {index + 1}</span>
			{form.watch(`order_entry.${index}.uuid`) && (
				<span className='text-sm font-medium'>O/N # {form.watch(`order_entry.${index}.order_id`)}</span>
			)}
			{form.watch(`order_entry.${index}.reclaimed_order_uuid`) && (
				<span className='text-sm font-medium'>
					R.O/N # {form.watch(`order_entry.${index}.reclaimed_order_id`)}
				</span>
			)}
			<span className='font-medium'>
				{<DateTime date={form.watch(`order_entry.${index}.created_at`)} isTime={false} />}
			</span>
		</div>
	);
};

export default ActionHeader;
