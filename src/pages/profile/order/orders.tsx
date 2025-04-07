import React from 'react';
import { processColumns } from '@/pages/profile/config/columns';
import { IOrderTableData } from '@/pages/work/_config/columns/columns.type';

import StatusButton from '@/components/buttons/status';
import DataTableEntry from '@/components/core/data-table/entry';
import { LinkOnly } from '@/components/others/link';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';
import { Switch } from '@/components/ui/switch';

import { formatDateTable } from '@/utils/formatDate';

const Information: React.FC<{ data: IOrderTableData }> = ({ data }) => {
	const proceedToRepair = data?.is_diagnosis_need ? (data?.diagnosis?.is_proceed_to_repair ? true : false) : true;
	const renderGeneralItems = (): ITableListItems => {
		return [
			{
				label: 'ID',
				value: data.order_id,
			},
			{
				label: 'Problems',
				value: (
					<div className='flex flex-wrap gap-1'>
						{(data.problems_name as string[])?.map((item, index) => (
							<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
								{item.replace(/_/g, ' ')}
							</span>
						))}
					</div>
				),
			},
			{ label: 'Statement', value: data.problem_statement },
			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: formatDateTable(data.updated_at),
			},
			{ label: 'Remarks', value: data.remarks },
		];
	};
	const renderProductItems = (): ITableListItems => {
		return [
			{ label: 'Brand', value: data.brand_name },
			{ label: 'Model', value: data.model_name },
			{
				label: 'Size',
				value: data.size_name,
			},
			{
				label: 'Quantity',
				value: data.quantity,
			},
			{ label: 'Serial', value: data.serial_no },
			{
				label: 'Accessories',
				value: (
					<div className='flex flex-wrap gap-1'>
						{(data.accessories as string[])?.map((item, index) => (
							<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
								{item.replace(/_/g, ' ')}
							</span>
						))}
					</div>
				),
			},
		];
	};
	const renderStatusItems = (): ITableListItems => {
		return [
			{
				label: 'Diagnosis Need',
				value: <StatusButton value={data.is_diagnosis_need as boolean} />,
			},
			{
				label: 'Proceed to Repair',
				value: <StatusButton value={proceedToRepair as boolean} />,
			},
			{
				label: 'Transfer For QC',
				value: <StatusButton value={data.is_transferred_for_qc as boolean} />,
			},
			{
				label: 'Ready For Delivery',
				value: <StatusButton value={data.is_ready_for_delivery as boolean} />,
			},
			{
				label: 'Delivery Complete',
				value: <StatusButton value={data.is_delivery_complete as boolean} />,
			},
		];
	};
	const renderDiagnosisItems = (): ITableListItems => {
		return [
			{
				label: 'Diagnosis ID',
				value: data?.diagnosis?.diagnosis_id,
			},
			{
				label: 'Problem Statement',
				value: data.diagnosis?.customer_problem_statement,
			},
			{
				label: 'Proposed Cost',
				value: data.diagnosis?.proposed_cost,
			},
			{
				label: 'Customer FeedBack',
				value: data.diagnosis?.customer_remarks,
			},
			{
				label: 'Status Update Date',
				value: data.diagnosis?.status_update_date && formatDateTable(data.diagnosis?.status_update_date),
			},
		];
	};
	const renderProcessItems = (): ITableListItems => {
		if (!data.process) return [];
		const items: ITableListItems = [];
		data?.process.map((item) => {
			items.push({
				label: item.section_name,
				value: (
					<div>
						<StatusButton value={item.status as boolean} /> <br />
						{item.status_update_date && formatDateTable(item.status_update_date)}
					</div>
				),
			});
		});
		return items;
	};
	return (
		<SectionContainer className='flex-1' title={`Order Product Details : ${data.order_id}`}>
			<div className='flex-col gap-2'>
				<div className='flex gap-2'>
					<TableList title='General' className='flex-1' items={renderGeneralItems()} />
					<TableList title='Product' className='flex-1' items={renderProductItems()} />
					<TableList title='Status' className='flex-1' items={renderStatusItems()} />
				</div>
				<div className='flex gap-2'>
					{data?.is_diagnosis_need && (
						<TableList className='flex-1' title='Diagnosis' items={renderDiagnosisItems()} />
					)}
					<TableList title='Process Repair Status' className='flex-1' items={renderProcessItems()} />
				</div>
			</div>
		</SectionContainer>
	);
};

export default Information;
