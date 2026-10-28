import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "./TransactionService"



 export const useTransaction = ()=> {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions
    })
  }