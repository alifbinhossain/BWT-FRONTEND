import { DEFAULT_FONT_SIZE } from '../ui';
import { getEmptyColumn } from '../utils';

const PAGE_HEADER_EMPTY_ROW: string[] = ['', '', '', ''];

export const getPageHeader = () => {
	return {
		heights: ['auto', 2, 'auto', 'auto'],
		widths: [70, '*', 70, '*'],
		body: [
			[
				// {
				// 	image: EUB_LOGO,
				// 	width: 70,
				// 	height: 40,
				// 	alignment: 'left',
				// },
				{
					text: [`\n`, `\n`],
					alignment: 'left',
				},
				{
					colSpan: 2,
					text: [
						{
							text: 'Thread Order Sheet\n',
							fontSize: DEFAULT_FONT_SIZE + 4,
							bold: true,
						},
						`O/N:\n`,
						`Date:\n`,
						`PI Number:\n`,
					],
					alignment: 'right',
				},
				'',
			],
			PAGE_HEADER_EMPTY_ROW,

			// * Start of table
		],
	};
};

const EMPTY_COLUMN: string[] = getEmptyColumn(4);

export const getPageFooter = ({ currentPage, pageCount }: { currentPage: number; pageCount: number }) => {
	return {
		widths: ['*', 10, '*', 10, '*'],
		body: [
			[
				{ text: 'Prepared By', alignment: 'center', border: [false, true, false, false] },
				{ text: '', alignment: 'center', border: [false, false, false, false] },
				{ text: 'Received By', alignment: 'center', border: [false, true, false, false] },
				{ text: '', alignment: 'center', border: [false, false, false, false] },
				{ text: 'Authorized Signature', alignment: 'center', border: [false, true, false, false] },
			],
		],
	};
};
