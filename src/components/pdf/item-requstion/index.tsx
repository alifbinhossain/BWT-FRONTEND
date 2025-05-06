import { IChallanTableData } from '@/pages/delivery/_config/columns/columns.type';
import { format } from 'date-fns';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import pdfMake from '..';
import { getPageFooter } from './utils';

export default function Index(data: IChallanTableData) {
	const headerHeight = 20;
	const footerHeight = 50;
	data?.challan_entries?.forEach((item) => {
		item.description = `${item.brand_name}, ${item.model_name} - SN: ${item.serial_no}`;
	});

	const node = [
		getTable('index', 'Sl\n No', 'center'),
		getTable('description', 'Description'),
		getTable('quantity', 'Qty', 'right'),
		getTable('rate', 'Rate'),
		getTable('amount', 'Amount'),
	];
	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Header
		// * Page Footer
		footer: (currentPage: number, pageCount: number) => ({
			table: getPageFooter({ currentPage, pageCount }),
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE,
		}),

		// * Main Table
		content: [
			{
				table: {
					headerRows: 1,
					widths: [80, 10, '*'],
					body: [
						[
							// {
							// 	image: EUB_LOGO,
							// 	width: 50,
							// 	height: 40,
							// 	alignment: 'right',
							// },
							{},
							{},
							{
								text: 'Bismillah World Technology',
								fontSize: DEFAULT_FONT_SIZE + 14,
								bold: true,
								color: '#283791',
								style: 'header',
							},
						],
						[
							{
								text: '61 laboratory Road, New Elephant Rd, Dhaka 1205',
								bold: true,
								colSpan: 3,
								alignment: 'center',
							},
						],
					],
				},
				layout: customTable,
			},
			{ text: '\n' },
			{ text: '\n' },
			{
				text: `Challan: ${data?.challan_no}`,
				bold: true,
				decoration: 'underline',
				fontSize: DEFAULT_FONT_SIZE + 4,
				alignment: 'center',
			},
			{ text: '\n' },
			{
				text: `Date: ${format(data?.created_at, 'dd/MM/yyyy')}`,
				alignment: 'right',
			},
			{ text: '\n' },
			{
				table: {
					widths: [42, '*'],
					body: [
						[{ text: `Name:`, bold: true }, { text: data?.customer_name }],
						[
							{
								text: `Address: `,
								bold: true,
							},
							{ text: data?.location + ', Zone: ' + data?.zone_name },
						],
					],
				},
				layout: 'noBorders',
			},
			{ text: '\n' },
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: [15, 300, 50, 70, '*'],
					body: [
						node.map((col) => ({ text: col.name, style: col.headerStyle, alignment: col.alignment })),
						...(data?.challan_entries || []).map((item, index) =>
							node.map((nodeItem) => ({
								text: nodeItem.field === 'index' ? index + 1 : (item as any)[nodeItem.field],
								style: nodeItem.cellStyle,
								alignment: nodeItem.alignment,
							}))
						),
						[
							{ text: `Total(In Words):`, bold: true, colSpan: 3 },
							{},
							{},
							{ text: 'Total Taka:', bold: true },
							{},
						],
					],
				},
			},
		],
	});

	return pdfDocGenerator;
}
