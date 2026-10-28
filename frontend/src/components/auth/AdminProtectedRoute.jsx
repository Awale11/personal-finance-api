import React, { useEffect } from 'react'
import useAuthStore from '../../lib/store/authStore'
import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router';
import api from '../../lib/api/apiClient';
import { LucideLoader } from 'lucide-react';

const AdminProtectedRoute = ({ children }) => {
      const { user, setAuth, clearAuth, token } = useAuthStore();

    const location = useLocation();

    const {data, error, isLoading, isError, isSuccess} = useQuery({
        queryKey:['currentUser'],
        queryFn: async()=> {
            const response  = await api.get('/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        },
        retry: 1
    })

    useEffect(() => {
        if(isError) {
            clearAuth();
        }
    },[isError, error, clearAuth]);

    useEffect(()=> {
        if(isSuccess && data){
            setAuth(data, token)
        }
    }, [isSuccess, data, setAuth, token]);

    if(isLoading){
        return (
            <div className='flex h-screen iems-center justify-center'>
                <LucideLoader className='animate-spin'/>
            </div>
        )
    }

    if(isError) {
        console.log('error here', error)
        return <Navigate to='/login' state={{ from: location }} replace/>
    }

    if(!user){
        console.log('user not found', user)
        return <Navigate to='/login' state={{ from: location }} replace/>
    }

    if(user.role != 'admin'){
            return <Navigate to='/dashboard' state={{ from: location }} replace/>
        //     return <h1>Nice Try, Only for admins</h1>
        }
  return children
}

export default AdminProtectedRoute