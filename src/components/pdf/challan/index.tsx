import { IChallanTableData } from '@/pages/delivery/_config/columns/columns.type';
import { format } from 'date-fns';
import useAuth from '@/hooks/useAuth';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import pdfMake from '..';
import { getPageFooter, getPageHeader } from './utils';

export default function Index(data: IChallanTableData, user: any) {
	const headerHeight = 180;
	const footerHeight = 20;
	data?.challan_entries?.forEach((item) => {
		item.description = `${item.brand_name}, ${item.model_name} - SN: ${item.serial_no}`;
		item.unit = 'Pcs';
	});

	const node = [
		getTable('index', '#', 'center'),
		getTable('description', 'Product Name'),
		getTable('quantity', 'Qty', 'right'),
		getTable('unit', 'Unit'),
	];
	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Header
		header: {
			table: getPageHeader(data, user) as any,
			layout: 'noBorders',
			margin: [xMargin, 30, xMargin, 0],
		},
		// * Page Footer
		footer: (currentPage: number, pageCount: number) => ({
			table: getPageFooter({ currentPage, pageCount, data, user }) as any,
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE,
		}),

		// * Main Table
		content: [
			{
				table: {
					widths: ['*'],
					body: [
						[
							{
								text: `Customer & Delivery Information`,
								bold: true,
								fontSize: DEFAULT_FONT_SIZE + 2,
								fillColor: '#dedede',
								alignment: 'center',
							},
						],
						[
							{
								table: {
									widths: [80, '*'],
									body: [
										[
											{ text: `Customer Name:`, fontSize: DEFAULT_FONT_SIZE - 2, bold: true },
											{ text: data?.customer_name, fontSize: DEFAULT_FONT_SIZE - 2 },
										],
										[
											{
												text: `Contact No: `,
												bold: true,
												fontSize: DEFAULT_FONT_SIZE - 2,
											},
											{ text: data?.customer_phone, fontSize: DEFAULT_FONT_SIZE - 2 },
										],
										[
											{
												text: `Address: `,
												bold: true,
												fontSize: DEFAULT_FONT_SIZE - 2,
											},
											{ text: data?.location, fontSize: DEFAULT_FONT_SIZE - 2 },
										],
										[
											{
												text: `Zone: `,
												bold: true,
												fontSize: DEFAULT_FONT_SIZE - 2,
											},
											{ text: data?.zone_name, fontSize: DEFAULT_FONT_SIZE - 2 },
										],
										[
											{
												text: `Sales Person: `,
												bold: true,
												fontSize: DEFAULT_FONT_SIZE - 2,
											},
											{ text: user?.name, fontSize: DEFAULT_FONT_SIZE - 2 },
										],
									],
								},
								layout: 'noBorders',
							},
						],
					],
				},
			},
			{ text: '\n' },
			{
				table: {
					headerRows: 1,
					widths: [15, '*', 50, 30],
					body: [
						node.map((col) => ({
							text: col.name,
							style: col.headerStyle,
							alignment: col.alignment,
							fontSize: DEFAULT_FONT_SIZE - 2,
							bold: true,
						})),
						...(data?.challan_entries || []).map((item, index) =>
							node.map((nodeItem) => ({
								text: nodeItem.field === 'index' ? index + 1 : (item as any)[nodeItem.field],
								style: nodeItem.cellStyle,
								fontSize: DEFAULT_FONT_SIZE - 2,
								alignment: nodeItem.alignment,
							}))
						),
					],
				},
			},
			{ text: '\n' },
			{ text: '\n' },
			{
				table: {
					widths: ['*', '*'],
					body: [
						[
							{ text: `\n\n\n\n`, fontSize: DEFAULT_FONT_SIZE - 2, bold: true },
							{ text: `\n\n\n\n`, fontSize: DEFAULT_FONT_SIZE - 2, bold: true },
						],
						[
							{ text: `Received By`, fontSize: DEFAULT_FONT_SIZE - 2, alignment: 'center' },
							{
								text: 'For Bismillah World Technology',
								fontSize: DEFAULT_FONT_SIZE - 2,
								alignment: 'center',
							},
						],
					],
				},
			},
		],
	});

	return pdfDocGenerator;
}
