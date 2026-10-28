
import React from 'react'

import { Navigate, Route, Routes } from 'react-router';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import Admin from './pages/dashboard/Admin';
import TransactionsPage from './pages/dashboard/TransactionPage';
import CategoriesPage from './pages/dashboard/CategoriesPage';
import ReportsPage from './pages/dashboard/ReportsPage';


const App = () => {


  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        {/* TODO: add protected route */}
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
        <Route path='/transactions' element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>}/>
        <Route path='/categories' element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>}/>
        <Route path='/reports' element={<ProtectedRoute><ReportsPage /></ProtectedRoute>}/>
        <Route path='/admin' element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>}/>
        <Route path='/' element={<Navigate to='/login' replace/>}/>
      </Routes>
    </>
  )
}

export default App
