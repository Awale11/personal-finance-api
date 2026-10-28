import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import api from '../../lib/api/apiClient'
import { extractErrorMessages } from '../../util/errorUtils'
import { LoaderCircle } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import useAuthStore from '../../lib/store/authStore'

const LoginForm = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState();

    const { setAuth } = useAuthStore();

      const [formValues, setFormValues] = useState({
            email: '',
            password: ''
        })
    
        const [error, setError] = useState(null);
         const handleInputChange = (e)=> {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

       const loginMutation = useMutation({
        mutationFn: async (cridentials) => {
            const response = await api.post('/auth/login', cridentials);
            console.log('response data', response)
            return response.data
        },
        onSuccess: (data) => {
           if(data.token) {
            const user = data.user;
            const token = data.token;

            setAuth(user, token);

            navigate('/dashboard');
           }
            
        },
        onError: (error)=> {
            console.error('err', error)
            setError(extractErrorMessages(error))
          
        }
    })

     const handleSubmit = (e)=> {
        e.preventDefault();
        setError(null)

        if(!formValues.email || !formValues.password) {
            setError('All fields are required')
            return
        }
        loginMutation.mutate({
            email: formValues.email,
            password: formValues.password
        })
    }

  return (
    <Card className='w-full border-border'>
        <CardHeader className={'space-y-1 pb-4'}>
            <CardTitle className={'text-xl text-center'}>
                Sign In
            </CardTitle>
            <CardDescription className={'text-center'}>
                Enter your informations to access your account
            </CardDescription>
            <form onSubmit={handleSubmit}>
                <CardContent className={'space-y-4 pt-0'}>
                      {
                            error && (
                                <div className='p-3 bg-destructive/10 text-destructive text-sm rounded-md'>{error}</div>
                            )
                        }
                
                    <div className='sapce-y-2'>
                        <div className='text-sm font-medium text-left'>
                            Email
                        </div>
                        <Input
                        type={'email'}
                        name='email'
                        placeholder='example@gmail.com'
                        required
                        value={formValues.email}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className='sapce-y-2'>
                        <div className='text-sm font-medium text-left'>
                            Password
                        </div>
                        <Input
                        type={'password'}
                        name='password'
                        placeholder='********'
                        requiredx
                        value={formValues.password}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className='py-4'>
                        <Button type='submit' className={'w-full cursor-pointer'}>
                        {/* TODO */}
                        {isLoading ? (<span className='flex items-center gap-2'><LoaderCircle />Login Account...</span>) : ('Login  Account')}
                       </Button>
                     </div>
                </CardContent>
            
                <CardFooter className={'flex justify-center pt-1'}>
                    <div className='text-center text-sm'>
                        Don't have an account ? <a 
                        onClick={()=> navigate('/register')}
                        className='text-rose-600 hover:underline cursor-pointer'>Sign Up</a>
                    </div>
                </CardFooter>
            </form>
        </CardHeader>
    </Card>
   
  )
}

export default LoginForm