import { IInfoTableData } from '@/pages/work/_config/columns/columns.type';
import QRCode from 'qrcode';



import { DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE, getTable } from '@/components/pdf/utils';



import pdfMake from '..';
import { getPageFooter, getPageHeader } from './utils';


export default async function Index(data: IInfoTableData, user: any, baseURl: string) {
	const headerHeight = 140;
	const footerHeight = 20;

	const GenerateQRCode = await QRCode.toString(`${baseURl}order/${data?.uuid}`);

	data?.order_entry?.forEach((item) => {
		item.product = `${item.brand_name}, ${item.model_name} - SN: ${item.serial_no}`;
		item.accessoriesString = item.accessories_name?.join(', ');
		item.unit = 'Pcs';
	});
	const node = [
		getTable('index', '#', 'center'),
		getTable('order_id', 'O/N'),
		getTable('product', 'Product'),
		getTable('accessoriesString', 'Accessories'),
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
								text: `Customer Information`,
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
											{ text: data?.user_name, fontSize: DEFAULT_FONT_SIZE - 2 },
										],
										[
											{
												text: `Contact No: `,
												bold: true,
												fontSize: DEFAULT_FONT_SIZE - 2,
											},
											{ text: data?.user_phone, fontSize: DEFAULT_FONT_SIZE - 2 },
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
					widths: [15, 50, '*', '*', 30, 30],
					body: [
						node.map((col) => ({
							text: col.name,
							style: col.headerStyle,
							alignment: col.alignment,
							fontSize: DEFAULT_FONT_SIZE - 2,
							bold: true,
						})),
						...(data?.order_entry || []).map((item, index) =>
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
					widths: ['*', 10, '*'],
					body: [
						[
							{
								text: `\n\n\n\n`,
								fontSize: DEFAULT_FONT_SIZE - 2,
								bold: true,
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								fontSize: DEFAULT_FONT_SIZE - 2,
								bold: true,
								border: [false, false, false, false],
							},
							{
								text: `\n\n\n\n`,
								fontSize: DEFAULT_FONT_SIZE - 2,
								bold: true,
								border: [false, false, false, false],
							},
						],
						[
							{
								text: `Customer Signature`,
								fontSize: DEFAULT_FONT_SIZE - 2,
								alignment: 'center',
								border: [false, true, false, false],
							},
							{
								text: ``,
								fontSize: DEFAULT_FONT_SIZE - 2,
								bold: true,
								border: [false, false, false, false],
							},
							{
								text: 'Sales/Receiver Person Signature',
								fontSize: DEFAULT_FONT_SIZE - 2,
								alignment: 'center',
								border: [false, true, false, false],
							},
						],
					],
				},
			},
		],
	});

	return pdfDocGenerator;
}