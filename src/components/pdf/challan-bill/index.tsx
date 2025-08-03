import { IChallanTableData } from '@/pages/delivery/_config/columns/columns.type';
import QRCode from 'qrcode';

import { DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { banglaRegex, DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';

import { getDateTime } from '@/utils';

import pdfMake from '..';
import { getPageFooter, getPageHeader } from './utils';

export default async function Index(data: IChallanTableData, user: any, baseURl: string) {
	const headerHeight = 150;
	const footerHeight = 20;
	let grand_total = 0;
	data?.challan_entries?.forEach((item) => {
		item.description = `${item.brand_name}, ${item.model_name} - SN: ${item.serial_no}`;
		item.unit = 'Pcs';
		grand_total += Number(item.bill_amount);
	});
	const GenerateQRCode = await QRCode.toString(`${baseURl}order/${data?.uuid}`);
	const node = [
		getTable('index', '#', 'center'),
		getTable('description', 'Product Name'),
		getTable('accessories_name', 'Accessories'),
		getTable('quantity', 'Qty', 'right'),
		getTable('unit', 'Unit'),
		getTable('bill_amount', 'Amount', 'right'),
	];
	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),
		info: {
			title: `Delivery Challan Pdf of ${data?.customer_name}-${data?.customer_phone}-RCV_Date: ${getDateTime()}`,
			author: 'Bismillash World Technology',
		},
		// * Page Header
		header: {
			table: getPageHeader(data, user, GenerateQRCode) as any,
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
											{
												text: data?.customer_name,
												fontSize: DEFAULT_FONT_SIZE - 2,
												font: `${banglaRegex.test(data?.customer_name) ? 'Bangla' : 'Roboto'}`,
											},
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
											{
												text: data?.location,
												fontSize: DEFAULT_FONT_SIZE - 2,
												font: `${banglaRegex.test(data?.location) ? 'Bangla' : 'Roboto'}`,
											},
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
					widths: [15, '*', 150, 50, 30, 40],
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
								text:
									nodeItem.field === 'index'
										? index + 1
										: nodeItem.field === 'accessories'
											? item.accessories_name.join(', ')
											: (item as any)[nodeItem.field],
								style: nodeItem.cellStyle,
								fontSize: DEFAULT_FONT_SIZE - 2,
								alignment: nodeItem.alignment,
							}))
						),
						[
							{
								text: 'Grand Total',
								style: 'tableHeader',
								fontSize: DEFAULT_FONT_SIZE - 2,
								alignment: 'right',
								bold: true,
								colSpan: 5,
							},
							{},
							{},
							{},
							{},
							{
								text: grand_total,
								style: 'tableCell',
								fontSize: DEFAULT_FONT_SIZE - 2,
								alignment: 'right',
							},
						],
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
