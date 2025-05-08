import { table } from 'console';
import { BWT_LOGO } from '@/assets/images/base64';
import { IChallanTableData } from '@/pages/delivery/_config/columns/columns.type';
import { format, formatDate } from 'date-fns';

import { getDateTime } from '@/utils';
import { formatDateTable } from '@/utils/formatDate';

import { DEFAULT_FONT_SIZE } from '../ui';

export const getPageHeader = (data: IChallanTableData, user: any) => {
	return {
		heights: ['auto', 2, 'auto', 'auto'],
		widths: ['*'], // 4 columns
		body: [
			[
				{
					table: {
						headerRows: 1,
						widths: [50, '*', 200],
						body: [
							[
								// {
								// 	image: EUB_LOGO,
								// 	width: 50,
								// 	height: 40,
								// 	alignment: 'right',
								// },
								{
									image: BWT_LOGO,
									width: 50,
									height: 40,
									alignment: 'right',
									border: [true, true, false, true],
								},
								{
									text: 'Bismillah World Technology',
									border: [false, true, false, true],
									fontSize: DEFAULT_FONT_SIZE + 8,
									bold: true,
									color: '#283791',
									style: 'header',
								},
								{
									table: {
										widths: [60, '*'],
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
													text: 'Status:',
													bold: true,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
												{
													text: '',
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
											[
												{
													text: 'Sales Mode:',
													bold: true,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
												{
													text: '',
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
											],
											[
												{
													text: 'Entry By:',
													bold: true,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
												{
													text: data?.order_created_by_name,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
											],
											[
												{
													text: 'Reference No:',
													bold: true,
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
												{
													text: '',
													fontSize: DEFAULT_FONT_SIZE - 2,
												},
											],
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

// const EMPTY_COLUMN: string[] = getEmptyColumn(4);

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
