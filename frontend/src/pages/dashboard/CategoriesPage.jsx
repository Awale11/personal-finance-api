import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../../lib/api/apiClient'
import Sidebar from '../../components/dashboard/Sidebar'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '../../components/ui/card';

const CategoriesPage = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await api.get('/categories');
            return response.data
        }
    })
    return (
        <div className='flex min-h-screen text-white'>
            <Sidebar />

            <main className='flex-1 p-8'>
                <h1 className='mb-6 text-3xl font-bold text-black'>Categories</h1>

                {isLoading && <p>Loading categories...</p>}

                {isError && (
                    <p> Categories could not be loaded</p>
                )}

                {data && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data.map((category) => (
                            <Card
                                key={category}
                                className="text-slate-900"
                            >
                                <CardHeader>
                                    <CardTitle className={'font-semibold'}>{category}</CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-sm text-slate-500">
                                        Transaction category
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                )}

            </main>
        </div>
    )
}

export default CategoriesPage