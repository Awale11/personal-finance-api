import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import { ArrowDownRight, ArrowUpRight, Icon, Pencil, ReceiptText, Trash2 } from 'lucide-react'
import { useTransaction } from '../Transaction/useTransaction'
import { useDeleteTransaction } from '../Transaction/useDeleteTransaction'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const RecentTransaction = ({ onEdit, limit = 5 }) => {

    const {
        data,
        isLoading,
        isError,
        error
    } = useTransaction();

    const deleteMutation = useDeleteTransaction();

    const transactions = Array.isArray(data) ? data : [];
    
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const formatAmount = (amount) => {
        return Number(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const displayedTransactions = limit === null ? transactions : transactions.slice(0, limit)

    return (

        <section className="mt-8">

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">
                        Recent Transactions
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Your latest financial activities
                    </p>
                </div>

            </div>

            <div className="w-full min-w-0 overflow-x-auto rounded-xl border bg-white">

                {isLoading ? (
                    <p className="p-6 text-sm text-slate-500">
                        Loading transactions...
                    </p>
                ) : isError ? (
                    <p className="p-6 text-sm text-red-600">
                        Transactions could not be loaded:{" "}
                        {error?.message || "An unknown error occurred."}
                    </p>
                ) : transactions.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 p-10 text-center">
                        <ReceiptText size={32} className="text-slate-400" />
                        <p className="font-medium text-slate-700">
                            No transactions yet
                        </p>
                        <p className="text-sm text-slate-500">
                            Your transactions will appear here.
                        </p>
                    </div>
                ) : (
                   <Table className="min-w-[700px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className='text-right'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {displayedTransactions.map((transaction) => {
                                const isIncome = transaction.type === "income";
                                const Icon = isIncome
                                    ? ArrowUpRight
                                    : ArrowDownRight;

                                return (
                                    <TableRow key={transaction._id || transaction.id}>
                                        <TableCell className="font-medium text-slate-900">
                                            {transaction.title}
                                        </TableCell>

                                        <TableCell className="text-slate-500">
                                            {transaction.category}
                                        </TableCell>

                                        <TableCell className="whitespace-nowrap text-slate-500">
                                            {formatDate(transaction.date)}
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    isIncome
                                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                        : "border-red-200 bg-red-50 text-red-700"
                                                }
                                            >
                                                <Icon size={14} className="mr-1" />
                                                {isIncome ? "Income" : "Expense"}
                                            </Badge>
                                        </TableCell>

                                        <TableCell
                                            className={`whitespace-nowrap text-right font-semibold ${isIncome
                                                ? "text-emerald-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {isIncome ? "+" : "-"}$
                                            {formatAmount(transaction.amount)}
                                        </TableCell>

                                        <TableCell className="text-right">

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit(transaction)}
                                                aria-label="Edit transaction"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label={`Delete ${transaction.title}`}
                                                        disabled={deleteMutation.isPending} >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete this transaction?
                                                        </AlertDialogTitle>

                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete "{transaction.title}"?
                                                            This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            className="bg-red-600 text-white hover:bg-red-700"
                                                            disabled={deleteMutation.isPending}
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                deleteMutation.mutate(
                                                                    transaction._id || transaction.id
                                                                );
                                                            }}
                                                        >
                                                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>
        </section>

    )
}

export default RecentTransaction