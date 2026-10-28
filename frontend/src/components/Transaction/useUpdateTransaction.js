import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "./TransactionService";
import { toast } from "@/components/ui/toast"

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      toast.add({
        title: "Transaction updated successfully",
        description: "Your transaction has been updated",
        type: "success",
      });
    },

    onError: (error) => {
      toast.add({
        title: "Error deleting transaction",
        description: error.message || "Please try again",
        type: "error",
      });
    },
  });
};
