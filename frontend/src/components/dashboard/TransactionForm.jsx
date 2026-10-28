import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from "@/components/ui/toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCreateTransaction } from '../Transaction/useCreateTransaction';
import { useUpdateTransaction } from '../Transaction/useUpdateTransaction';

const TransactionForm = ({ editingTransaction, setEditingTransaction, onSuccess }) => {

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(
        new Date().toISOString().slice(0, 10));

    useEffect(() => {
        if (editingTransaction) {
            setTitle(editingTransaction.title);
            setAmount(String(editingTransaction.amount));
            setType(editingTransaction.type);
            setCategory(editingTransaction.category);
            setDate(
                editingTransaction.date ? new Date(editingTransaction.date).toISOString().split('T')[0] : ''
            )
        }
    }, [editingTransaction]);

    const createMutation = useCreateTransaction();
    const updateMutation = useUpdateTransaction();

    const handleSubmit = (e) => {
        e.preventDefault();

        const transaction = {
            title,
            amount: Number(amount),
            type,
            category,
            date,
        };

        if (editingTransaction) {
            updateMutation.mutate(
                { id: editingTransaction._id, transactionData: transaction },
                {
                    onSuccess: () => {
                        setEditingTransaction(null);
                        setTitle('');
                        setAmount('');
                        setType('');
                        setCategory('');
                        setDate(new Date().toISOString().slice(0, 10));

                        onSuccess?.();
                    },
                    onError: (error) => {
                        toast.add({
                            title: 'Error editing transaction',
                            description: error.message || 'Please try again.',
                            type: 'error',
                        });
                    }
                }
            )
        } else {
            createMutation.mutate(transaction, {
                onSuccess: () => {
                    toast.add({
                        title: 'Transaction created successfully!',
                        description: 'Your transaction has been created',
                        type: 'success'
                    });

                    setTitle('');
                    setAmount('');
                    setType('');
                    setCategory('');
                    setDate(new Date().toISOString().slice(0, 10));

                    onSuccess?.();
                },

                onError: (error) => {
                    toast.add({
                        title: 'Error creating transaction',
                        description: error.message || 'Please try again.',
                        type: 'error',
                    });
                }
            })
        }
    }
    return (

        <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-2'>
                <label>Transaction Title</label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder='e.g.Monthly Salary'
                />
            </div>

            <div className='space-y-2'>
                <label>Amount ($)</label>
                <Input
                    type='number'
                    min='0.01'
                    step='0.01'
                    placeholder='0.00'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            <div className='space-y-2'>
                <label>Transaction Type</label>
                <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select transaction type' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='income'>Income</SelectItem>
                        <SelectItem value='expense'>Expense</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='space-y-2'>
                <label>Category</label>
                <Input
                    type='text'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    placeholder='e.g. Salary, Food, Bills'
                />
            </div>
            <div className='space-y-2'>
                <label>Date</label>
                <Input
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>

            <Button
                type='submit' className='w-full'
                disabled={createMutation.isPending || updateMutation.isPending}
            >
                {editingTransaction ? updateMutation.isPending ? 'Updating Transaction...' : 'Update Transaction' :
                    createMutation.isPending ? 'Adding Transaction...' : 'Add Transaction'}
            </Button>
        </form>
    )
}

export default TransactionForm