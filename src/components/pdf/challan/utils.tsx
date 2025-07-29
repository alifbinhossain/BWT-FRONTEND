import { BWT_LOGO } from '@/assets/images/base64';
import { IChallanTableData } from '@/pages/delivery/_config/columns/columns.type';
import { format, formatDate } from 'date-fns';
import { D } from 'node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-Cn7cKi7o';

import { getDateTime } from '@/utils';

import { customTable, DEFAULT_FONT_SIZE } from '../ui';

export const getPageHeader = (data: IChallanTableData, user: any, GenerateQRCode: any) => {
	const delivery_information = [];
	if (data?.challan_type === 'employee_delivery') {
		delivery_information.push([
			{
				text: 'Delivery Employee:',
				bold: true,
				fontSize: DEFAULT_FONT_SIZE - 2,
			},
			{
				text: data?.employee_name,
				fontSize: DEFAULT_FONT_SIZE - 2,
			},
		]);
	} else if (data?.challan_type === 'vehicle_delivery') {
		delivery_information.push([
			{
				text: 'Delivery Employee:',
				bold: true,
				fontSize: DEFAULT_FONT_SIZE - 2,
			},
			{
				text: data?.employee_name,
				fontSize: DEFAULT_FONT_SIZE - 2,
			},
		]);
		delivery_information.push([
			{
				text: 'Delivery Vehicle:',
				bold: true,
				fontSize: DEFAULT_FONT_SIZE - 2,
			},
			{
				text: data?.vehicle_name,
				fontSize: DEFAULT_FONT_SIZE - 2,
			},
		]);
	} else if (data?.challan_type === 'courier_delivery') {
		delivery_information.push([
			{
				text: 'Courier:',
				bold: true,
				fontSize: DEFAULT_FONT_SIZE - 2,
			},
			{
				text: data?.courier_name + '-' + data?.courier_branch,
				fontSize: DEFAULT_FONT_SIZE - 2,
			},
		]);
	}
	return {
		heights: ['auto', 2, 'auto', 'auto'],
		widths: ['*'],
		body: [
			[
				{
					table: {
						headerRows: 1,
						widths: [50, '*', 200],
						body: [
							[
								{
									image: BWT_LOGO,
									width: 60,
									height: 50,
									alignment: 'right',
									border: [true, true, false, true],
								},
								{
									table: {
										widths: ['*', 40],
										body: [
											[
												{
													text: 'Bismillah World Technology',
													border: [false, false, false, false],
													fontSize: DEFAULT_FONT_SIZE + 8,
													bold: true,
													color: '#283791',
													style: 'header',
												},
												{
													svg: GenerateQRCode,
													width: 40,
													height: 50,
													alignment: 'left',
													border: [false, false, false, false],
													rowSpan: 3,
												},
											],
											[
												{
													text: 'Address: 519/A Dhanmondi-1, Dhanmondi - Dhaka-1205',
													border: [false, false, false, false],
													fontSize: DEFAULT_FONT_SIZE - 2,
													bold: true,

													style: 'header',
												},
												{},
											],
											[
												{
													text: 'Contact Number: 01956666777, website:bwt.com.bd',
													border: [false, false, false, false],
													fontSize: DEFAULT_FONT_SIZE - 2,
													bold: true,

													style: 'header',
												},
												{},
											],
										],
										layout: customTable,
									},
									border: [false, true, false, true],
								},
								{
									table: {
										widths: [80, '*'],
										body: [
											[
												{
													text: 'Challan',
													fontSize: DEFAULT_FONT_SIZE + 2,
													bold: true,
													style: 'header',
													alignment: 'center',
													fillColor: '#dedede',
													colSpan: 2,
												},
												{},
											],
											[
												{
													text: 'Challan No:',
													bold: true,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
												{
													text: data?.challan_no,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
											],
											[
												{
													text: 'Date:',
													bold: true,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
												{
													text: formatDate(data?.created_at, 'dd-MMM-yyyy'),
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
											],
											[
												{
													text: 'Challan Type:',
													bold: true,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
												{
													text: data?.challan_type.split('_').join(' ').toUpperCase(),
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
											],
											...delivery_information,
											[
												{
													text: 'Challan Branch:',
													bold: true,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
												{
													text: data?.branch_name,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
											],
											[
												{
													text: 'Approved By:',
													bold: true,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
												{
													text: user?.name,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
											],
											// [
											// 	{
											// 		text: 'Sales Mode:',
											// 		bold: true,
											// 		fontSize: DEFAULT_FONT_SIZE - 2,
											// 	},
											// 	{
											// 		text: data?.payment_method,
											// 		fontSize: DEFAULT_FONT_SIZE - 2,
											// 	},
											// ],
										],
									},
									layout: 'noBorders',
								},
							],
						],
					},
				},
			],
		],
	};
};

export const getPageFooter = ({
	currentPage,
	pageCount,
	data,
	user,
}: {
	currentPage: number;
	pageCount: number;
	data?: IChallanTableData;
	user?: any;
}) => {
	return {
		widths: ['*', '*', '*'],
		body: [
			[
				{
					text: `Print Date:${format(getDateTime(), 'dd-MMM-yyyy HH:mm:ss aaa')} By: ${user?.name}`,
					fontSize: DEFAULT_FONT_SIZE - 4,
					border: [false, true, false, false],
				},
				{
					text: `Bismillash World Technology`,
					fontSize: DEFAULT_FONT_SIZE - 4,
					alignment: 'center',
					border: [false, true, false, false],
				},
				{
					text: `${data?.challan_no} | Page: ${currentPage} of ${pageCount}`,
					fontSize: DEFAULT_FONT_SIZE - 4,
					alignment: 'right',
					border: [false, true, false, false],
				},
			],
		],
	};
};
