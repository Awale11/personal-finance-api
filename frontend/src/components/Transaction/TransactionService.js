import api from "../../lib/api/apiClient";


export const getTransactions = async () => {
  const response = await api.get("/transaction");

  console.log("GET response:", response);
  console.log("GET response.data:", response.data);
  return response.data;
};

export const getMonthlySummary = async () => {
  const response = await api.get("/transaction/monthly-summary");
  return response.data;
};

export const createTransaction = async(transactionData) => {
    const response = await api.post('/transaction', transactionData);
    return response.data
};

export const deleteTransaction = async (id) => {
    const response = await api.delete(`/transaction/${id}`)
    return response.data
};

export const updateTransaction = async ({ id, transactionData }) => {
    const response = await api.put(`/transaction/${id}`, transactionData);
    return response.data;
}