import pdfMake from 'pdfmake/build/pdfmake';

import { vfs } from './vfs_fonts';

pdfMake.vfs = vfs;

pdfMake.fonts = {
	Roboto: {
		normal: 'Roboto-Regular.ttf',
		bold: 'Roboto-Bold.ttf',
		italics: 'Roboto-Italic.ttf',
		bolditalics: 'Roboto-BoldItalic.ttf',
	},
	Bangla: {
		normal: 'TiroBangla-Regular.ttf',
		bold: 'NotoSansBengali_Condensed-Bold.ttf',
	},
};

export default pdfMake;
