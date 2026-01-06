import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Spinner } from '../components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import axios from 'axios';


const schema = z.object({
    email: z.email({ message: 'Invalid email ID.' }),
    password: z.string().min(8, { message: 'Password must be 8 characters long.' })
});

type FormFields = z.infer<typeof schema>;

export const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(schema) });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormFields> = async ({ email, password }) => {
        try {
            const res = await api.post('/login', { email, password });
            if (res.status === 200) {
                toast.success('Login successful!', {
                    description: <span className="text-gray-500">Welcome back!</span>,
                    action: {
                        label: 'Close',
                        onClick: () => toast.dismiss()
                    }
                });

                setTimeout(() => {
                    navigate('/dashboard')
                }, 800);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 401) {
                    toast.error('Invalid credentials.', {
                        description: <span className="text-gray-500">Please enter valid credentials and try again.</span>
                    });

                    return;
                }

                toast.error('Login failed.', {
                    description: <span className="text-gray-500">Something went wrong. Please try again.</span>
                });
            } else {
                toast.error('Unexpected error.', {
                    description: <span className="text-gray-500">Please try again later.</span>
                });
            }
        }
    };

    return (
        <>
            <div className='h-screen flex justify-center items-center'>
                <Card className='w-full max-w-lg shadow-lg'>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email and password to login.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col'>
                                <div>
                                    <Label className='ml-1 mb-3 font-bold'>Email <span className='text-red-500'>*</span></Label>
                                    <Input type='text' {...register('email')} className='border-2' placeholder='user@email.com' />
                                    {errors.email && (<p className='text-red-400 ml-1'>{errors.email.message}</p>)}
                                </div>

                                <div className='mt-4'>
                                    <Label className='ml-1 mb-3 font-bold'>Password <span className='text-red-500'>*</span></Label>
                                    <Input type='password' {...register('password')} className='border-2' placeholder='******' />
                                    {errors.password && (<p className='text-red-400 ml-1'>{errors.password.message}</p>)}
                                </div>

                                <div>
                                    <Button variant={`link`} className='flex justify-end w-full hover:cursor-pointer'>Forgot your password?</Button>
                                </div>

                                <div className='mt-6'>
                                    <Button className='w-full' type='submit' disabled={isSubmitting}>{isSubmitting ? <Spinner /> : 'Login'}</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}