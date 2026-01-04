import z from "zod";
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PlusIcon, type PlusIconHandle } from "../ui/plus"
import { useEffect, useRef, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "../ui/spinner";
import { api } from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";
import { AtSignIcon, type AtSignIconHandle } from "../ui/at-sign";

const schema = z.object({
    fullname: z.string().min(1, { message: 'Full name is required' }),
    email: z.email({ message: 'Invalid email address' }),
    phone: z.string().min(10, { message: 'Invalid phone number' }).max(10, { message: 'Invalid phone number' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});

type FormFields = z.infer<typeof schema>;

type Agent = {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

export const ManageAgents = () => {
    const plusIconRef = useRef<PlusIconHandle>(null);
    const atIconRef = useRef<AtSignIconHandle>(null);

    const [showForm, setShowForm] = useState(false);

    // Fetching agents from the backend
    const [agents, setAgents] = useState<Agent[]>([]);

    const loadAgents = async () => {
        try {
            const res = await api.get('/agents');
            setAgents(res.data);
        } catch {
            toast.error('Failed to fetch agents.');
        }
    }

    useEffect(() => {
        plusIconRef.current?.stopAnimation();
        atIconRef.current?.stopAnimation();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadAgents();
    }, []);

    const handleAddAgentClick = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        reset();
        setShowForm(false);
    }

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<FormFields> = async ({ fullname, email, phone, password }) => {
        try {
            const res = await api.post('/add-agents', { fullname, email, phone, password });
            if (res.status === 201) {
                toast.success('Agent added successfully!', {
                    duration: 2500,
                });

                reset();
                setShowForm(false);

                await loadAgents();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 409) {
                    toast.error('Agent already exists.')
                    return;
                }

                toast.error('Failed to add agent.', {
                    description: 'Something went wrong. Please try again.'
                });
            } else {
                toast.error('Unexpected error.', {
                    description: 'Please try again later.'
                });
            }
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="mt-6">
                    <p className="font-bold text-2xl">Manage Agents</p>
                    <p className="text-gray-400">Add and manage your agent accounts</p>
                </div>

                <div className="mr-24.5">
                    <Button onClick={handleAddAgentClick} variant={"secondary"} className="hover:cursor-pointer"><PlusIcon ref={plusIconRef} /> Add Agent</Button>
                </div>
            </div>

            { /* Form Card */}
            {showForm && (
                <div className="mt-6 mr-24">
                    <Card className="w-full max-w-full">
                        <CardHeader>
                            <CardTitle>Create New Agent</CardTitle>
                            <CardDescription>Enter the agent details below</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex justify-between gap-2.5">
                                    <div className="w-full">
                                        <Label className="ml-1.5 mb-1.5">Full Name</Label>
                                        <Input type="text" className="w-full" {...register('fullname')} />
                                        {errors.fullname && (<p className="text-red-400 ml-1.5">{errors.fullname.message}</p>)}
                                    </div>

                                    <div className="w-full">
                                        <Label className="ml-1.5 mb-1.5">Email</Label>
                                        <Input type="text" className="w-full" {...register('email')} />
                                        {errors.email && (<p className="text-red-400 ml-1.5">{errors.email.message}</p>)}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between gap-2.5">
                                    <div className="w-full">
                                        <Label className="ml-1.5 mb-1.5">Phone No.</Label>
                                        <Input type="tel" className="w-full" {...register('phone')} />
                                        {errors.phone && (<p className="text-red-400 ml-1.5">{errors.phone.message}</p>)}
                                    </div>

                                    <div className="w-full">
                                        <Label className="ml-1.5 mb-1.5">Password</Label>
                                        <Input type="password" className="w-full" {...register('password')} />
                                        {errors.password && (<p className="text-red-400 ml-1.5">{errors.password.message}</p>)}
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3.5">
                                    <Button disabled={isSubmitting}>{isSubmitting ? <Spinner /> : 'Save Agent'}</Button>
                                    <Button variant={"outline"} onClick={handleCloseForm}>Cancel</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="flex justify-center mt-6 mr-24">
                {agents.length === 0 ? (
                    <Card className="w-full max-w-full">
                        <CardContent className="flex justify-center">
                            No Agents Added
                        </CardContent>
                    </Card>
                ) : (
                    <div className="w-full">
                        {agents.map((agent) => (
                            <Card key={agent._id} className="w-full max-w-full mb-2.5">
                                <CardContent>
                                    <div className="mb-4">
                                        <p className="ml-1.5 font-semibold">{agent.name}</p>
                                    </div>
                                    <div className="flex gap-10 items-center">
                                        <div className="flex gap-2 items-center">
                                            <AtSignIcon ref={atIconRef} size={16} />
                                            <p>{agent.email}</p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                            </svg>
                                            <p>{agent.phone}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}