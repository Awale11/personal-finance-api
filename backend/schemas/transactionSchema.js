import { z } from 'zod';

export const transactionSchema = z.object({
    title: z.string().min(1),
    amount: z.number().positive(),
    type: z.enum(['income', 'expense']),
    category: z.string().min(1),
    date: z.string()
})