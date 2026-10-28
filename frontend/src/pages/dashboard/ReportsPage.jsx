import React, { useMemo } from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import { useTransaction } from '../../components/Transaction/useTransaction'
import {
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
Legend,
} from 'recharts';


const ReportsPage = () => {

    const { data, isLoading, isError } = useTransaction();

   const monthlyData = useMemo(() => {
    const transactions = Array.isArray(data) ? data : [];
    const months = {};

    transactions.forEach((transaction) => {
        const date = new Date(transaction.date);

        if (Number.isNaN(date.getTime())) return;

        const monthKey = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, '0')}`;

        if (!months[monthKey]) {
            months[monthKey] = {
                month: monthKey,
                income: 0,
                expenses: 0
            };
        }

        const amount = Number(transaction.amount) || 0;

        if (transaction.type === 'income') {
            months[monthKey].income += amount;
        } else if (transaction.type === 'expense') {
            months[monthKey].expenses += amount;
        }
    });

    return Object.values(months).sort((a, b) =>
        a.month.localeCompare(b.month)
    );
}, [data]);

  return (
    <div className='flex min-h-screen'>
        <Sidebar />

        <main className='flex-1 p-8'>

            <h1 className='text-3xl font-bold'>Reports</h1>
            <p className='mt-2 text-muted-foreground'>Analyze your income and expenses</p>

            <div className='mt-8 rounded-xl border-p-6'>
                <h2 className='mb-6 text-xl font-semibold'>Income vs Expenses</h2>

                {isLoading && <p>Loading report...</p>}
                {isError && (
                    <p className='text-red-500'>Could not load transaction</p>
                )}

                {!isLoading && !isError  && (
                    <ResponsiveContainer width='100%' height={320}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey='name'/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey='amount' name='Amount' fill='#10b981' radius={[6, 6, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            <div className="mt-8 rounded-xl border p-6">
    <h2 className="mb-6 text-xl font-semibold">
        Monthly Income & Expenses
    </h2>

{!isLoading && !isError && (
    <ResponsiveContainer width="100%" height={350}>
        <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
                dataKey="income"
                name="Income"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
            />

            <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#f87171"
                radius={[4, 4, 0, 0]}
            />
        </BarChart>
    </ResponsiveContainer>
)}

{monthlyData.length === 0 && !isLoading && !isError && (
    <p className="text-sm text-muted-foreground">
        No transaction data available for the monthly report.
    </p>
)}


</div>

        </main>
    </div>
  )
}

export default ReportsPage