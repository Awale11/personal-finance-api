import React from 'react'
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from '../ui/card'
import { useTransaction } from '../Transaction/useTransaction'


const SummaryCards = () => {

    const { data, isLoading, isError } = useTransaction();

    const transactions = Array.isArray(data) ? data : [];

    const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const totalBalance = totalIncome - totalExpenses;

     const summaryCards = [
            {title: 'Total Balance',
             amount: totalBalance,
             description: 'Your current balance',
             icon: Wallet,
             color: 'bg-blue-100 text-blue-600'   
            },
            {title: 'Total Income',
             amount: totalIncome,
             description: 'Your total income',
             icon: TrendingUp,
             color: 'bg-emerald-100 text-emerald-600'   
            },
            {title: 'Total Expenses',
             amount: totalExpenses,
             description: 'Your total expenses',
             icon: TrendingDown,
             color: 'bg-red-100 text-red-600'   
            }
    
        ]

  return (

    <>
        {summaryCards.map((card) => {
         const Icon = card.icon;

        return (
        <Card
            key={card.title}
            className="rounded-2xl border-slate-200 shadow-sm transition-shadow hover:shadow-md">

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                <div>
                    <CardTitle className="text-sm font-medium text-slate-900">
                    {card.title}
                    </CardTitle>

                    <CardDescription className="mt-1">
                    {card.description}
                    </CardDescription>
                </div>

                <div className={`rounded-xl p-3 ${card.color}`}>
                    <Icon size={22} />
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-2xl font-bold tracking-tight text-slate-900">
                    ${Number(card.amount).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </p>
            </CardContent>
        </Card>
        );

        })}

       </>

  )
}

export default SummaryCards