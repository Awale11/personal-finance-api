import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from "@/components/ui/button"

async function createTransaction(newTransaction) {
  const response = await fetch('http://localhost:5000/api/transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTransaction),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Transaction didnot created.');
  }

  return data;
}

const Transaction = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction'] });

      setTitle('');
      setAmount('');
      setType('expense');
      setCategory('Food');
      setDate(new Date().toISOString().split('T')[0]);
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0 || !date || !category) {
      alert('Please fill in all fields correctly..');
      return;
    }

    mutation.mutate({
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    });
  };

  return (
    <div>
      <h2>Add Transaction</h2>

      <form onSubmit={handleAdd}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Grocery shopping"
            required
          />
        </div>

        <div>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 25"
            required
          />
        </div>

        <div>
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Salary">Salary</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Add Transaction'}
        </Button>

        {mutation.isSuccess && (
          <p>Transaction created successfully!</p>
        )}

        {mutation.isError && (
          <p>{mutation.error.message}</p>
        )}
      </form>
    </div>
  );
};

export default Transaction;

