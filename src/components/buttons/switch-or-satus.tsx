import { Switch } from '../ui/switch';
import StatusButton from './status';

export default function SwitchStatus({
	checked,
	onCheckedChange,
	disabled,
	isClickable = true,
}: {
	checked: boolean;
	onCheckedChange: () => void;
	disabled?: boolean;
	isClickable?: boolean;
}) {
	if (!isClickable) return <StatusButton value={checked} />;

	return (
		<div>
			<Switch checked={checked} onCheckedChange={() => onCheckedChange()} disabled={disabled} />
		</div>
	);
}
