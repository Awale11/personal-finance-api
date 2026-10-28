import { Plus } from "lucide-react";
import Sidebar from "../../components/dashboard/Sidebar";
import { Button } from "../../components/ui/button";
import RecentTransaction from "../../components/dashboard/RecentTransaction";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import TransactionForm from "../../components/dashboard/TransactionForm";
import { useState } from "react";


const TransactionsPage = () => {
    
const [editingTransaction, setEditingTransaction] = useState(null);
const [dialogOpen, setDialogOpen] = useState(false)

return (
    <div className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <main className="flex-1 p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Transactions
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage all your income and expenses.
                    </p>
                </div>

                <Button
                    onClick={() => {
                        setEditingTransaction(null)
                        setDialogOpen(true)
                    }}
                    className="rounded-xl shadow-sm"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transaction
                </Button>
            </div>

            <RecentTransaction
                limit={null}
                onEdit={(transaction) => {
                    setEditingTransaction(transaction)
                    setDialogOpen(true)
                }}
            />

            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open)

                    if (!open) {
                        setEditingTransaction(null)
                    }
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            {editingTransaction
                                ? 'Edit Transaction'
                                : 'Add Transaction'}
                        </DialogTitle>

                        <DialogDescription>
                            {editingTransaction
                                ? 'Update the details of your transaction.'
                                : 'Enter the details of your new transaction.'}
                        </DialogDescription>
                    </DialogHeader>

                    <TransactionForm
                        editingTransaction={editingTransaction}
                        setEditingTransaction={setEditingTransaction}
                        onSuccess={() => setDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </main>
    </div>
)

}

export default TransactionsPage
