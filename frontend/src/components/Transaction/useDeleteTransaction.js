import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTransaction } from "./TransactionService";
import { toast } from "@/components/ui/toast" 



export const useDeleteTransaction = () => {
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['transactions'],
            });

            toast.add({
                title: 'Transaction deleted successfully',
                description: 'Your transaction has been deleted',
                type: 'success'
            })
        },

        onError: (error) => {
            toast.add({
                title: 'Error deleting transaction',
                description: error.message || 'Please try again',
                type: 'error'
            })
        }
    })
}