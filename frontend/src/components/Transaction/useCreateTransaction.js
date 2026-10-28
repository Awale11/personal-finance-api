import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "./TransactionService";


export const useCreateTransaction = () => {
const queryClient = useQueryClient();

return useMutation({
mutationFn: createTransaction,

onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["transactions"],
  });

  console.log('Transaction created successfully')
},

onError: (error) => {
    console.error('Failed to create transaction:'. error.response?.date?.message || error.message)
}


});
};
