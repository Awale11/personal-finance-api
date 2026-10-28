import React, { useState } from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import SummaryCards from '../../components/dashboard/SummaryCards'
import RecentTransaction from '../../components/dashboard/RecentTransaction'
import TransactionForm from '../../components/dashboard/TransactionForm'
import { Button } from '../../components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Plus } from 'lucide-react'



const DashboardPage = () => {

    const [editingTransaction, setEditingTransaction] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    return (

        <div className='flex min-h-screen bg-slate-100'>
            <Sidebar />

            <main className='flex-1 p-8'>
                <div className='mb-8 flex justify-between'>
                    <div className='space-y-2 flex flex-col items center'>
                        <h1 className='text-3xl font-bold text-slate-900'>
                            Dashboard
                        </h1>

                        <p className='text-slate-500'>
                            Welcome back! Here is your financial overview
                        </p>
                    </div>

                    <Button
                        onClick={() => {
                            setEditingTransaction(null);
                            setDialogOpen(true);
                        }}
                        className="rounded-xl shadow-sm"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Transaction
                    </Button>
                </div>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
                    <SummaryCards />

                </div>

                <Dialog
                    open={dialogOpen}
                    onOpenChange={(open) => {
                        setDialogOpen(open);

                        if (!open) {
                            setEditingTransaction(null)
                        }
                    }}
                >
                    <DialogContent className={'max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-[500px]'}>
                        <DialogHeader>
                            <DialogTitle className={'text-xl font-semibold'}>
                                {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
                            </DialogTitle>

                            <DialogDescription>
                                {editingTransaction ? 'Update the details of your transaction.' : 'Enter the details pf your new transaction.'}
                            </DialogDescription>
                        </DialogHeader>

                        <TransactionForm
                            editingTransaction={editingTransaction}
                            setEditingTransaction={setEditingTransaction}
                            onSuccess={() => setDialogOpen(false)}
                        />
                    </DialogContent>
                </Dialog>


                <RecentTransaction
                   onEdit={(transaction) => {
                    setEditingTransaction(transaction);
                    setDialogOpen(true);
                   }}
                />

            </main>
        </div>

    )
}

export default DashboardPage