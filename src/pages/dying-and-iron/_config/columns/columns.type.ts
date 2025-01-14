// TODO: Replace with real data type of Table
export type IPaymentTableData = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};
