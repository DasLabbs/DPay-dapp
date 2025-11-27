import { AxiosInstance } from 'axios';

export type TransactionPayload = {
  chainId: number;
  txHash: string;
  qrPayload: string;
};

export type TransactionResponse = {
  _id: string;
  hash: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: string;
  updatedAt: string;
  amount: string;
  from: string;
  gasUsed: number;
  gasPrice: number;
  formattedAmount: number;
  totalFee: number;
  to: string;
};

export const submitTransaction = async (
  axios: AxiosInstance,
  payload: TransactionPayload
): Promise<TransactionResponse> => {
  const response = await axios.post('/api/v1/transactions/submit', payload);
  return response.data?.data;
};

type GetTransactionsHistoryParams = {
  page?: number;
  limit?: number;
};

type GetTransactionsHistoryResponse = {
  totalPage: number;
  currentPage: number;
  limit: number;
  items: TransactionResponse[];
};

export const getTransactionsHistory = async (
  axios: AxiosInstance,
  params: GetTransactionsHistoryParams
): Promise<GetTransactionsHistoryResponse> => {
  const response = await axios.get('/api/v1/transactions', { params });
  return response.data?.data;
};
