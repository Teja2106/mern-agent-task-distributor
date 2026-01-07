import { useWatch, useForm, type SubmitHandler } from "react-hook-form"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { UploadIcon } from "../ui/upload"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"
import { api } from "@/lib/api"
import axios from "axios"
import { useState } from "react"

const MAX_UPLOAD_SIZE = 10 * 1024; // 10 KB
const ACCEPTED_FILE_TYPES = ['text/csv'];

type Task = {
    FirstName: string;
    Phone: string;
    Notes: string;
}

type AgentDistribution = {
    agentId: string;
    agentName: string;
    tasks: Task[];
}

const fileUploadSchema = z.object({
    file: z.custom<FileList>()
        .refine((files) => files?.length === 1, { message: 'Please select a file.' })
        .refine((files) => files[0].size <= MAX_UPLOAD_SIZE, { message: 'File size must be less than 10 KB.' })
        .refine((files) => ACCEPTED_FILE_TYPES.includes(files[0].type), { message: 'Only CSV files are supported.' })
});

type FileUploadForm = z.infer<typeof fileUploadSchema>;

export const Distribution = () => {
    const [distribution, setDistribution] = useState<AgentDistribution[]>([]);
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<FileUploadForm>({ resolver: zodResolver(fileUploadSchema) });

    const uploadedFile = useWatch({
        control,
        name: 'file'
    });

    const selectedFile = uploadedFile?.[0];

    const onSubmit: SubmitHandler<FileUploadForm> = async (data) => {
        try {
            const formData = new FormData();
            formData.append('file', data.file[0]);

            const res = await api.post('/distribution', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                console.log(res.data.message);
                toast.success('File has been uploaded successfully!', {
                    action: {
                        label: 'Close',
                        onClick: () => toast.dismiss()
                    }
                });
                setDistribution(res.data.data);
                reset();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 400) {
                    toast.error('Invalid file format.', {
                        description: <span className="text-gray-500">Please ensure the file has the correct format and required columns.</span>,

                        action: {
                            label: 'Close',
                            onClick: () => toast.dismiss()
                        }
                    })

                    return;
                }

                toast.error('File upload failed.', {
                    description: <span className="text-gray-500">Something went wrong. Please try again.</span>
                });
            } else {
                toast.error('Unexpected error.', {
                    description: <span className="text-gray-500">Please try again later.</span>
                });
            }
        }
    }

    return (
        <>
            <div className="mt-6">
                <p className="font-bold text-2xl">Upload & Distribute Lists</p>
                <p className="text-gray-400">Upload CSV files and distribute them equally among 5 agents</p>
            </div>

            <div className="mt-6 mr-24">
                <Card className="w-full max-w-full ">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UploadIcon size={18} /> Upload List
                        </CardTitle>
                        <CardDescription>
                            Supported formats: CSV, XLSX, XLS. Required columns: First Name, Phone, Note
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            {/* Dropzone */}
                            <Label
                                htmlFor="dropzone-file"
                                className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-gray-400 bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium transition-colors">
                                <UploadIcon size={32} className="mb-3 text-gray-500" />

                                <p className="text-sm font-medium">
                                    {selectedFile ? selectedFile.name : "Click to upload"}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">.csv, .xlsx & .xls only (max 10 KB)</p>

                                {selectedFile && (
                                    <p className="mt-2 text-xs text-gray-500">
                                        {(selectedFile.size / 1024).toFixed(1)} KB
                                    </p>
                                )}

                                <Input {...register("file")} id="dropzone-file" type="file" accept=".csv,.xlsx,.xls" className="absolute inset-0 opacity-0 cursor-pointer" />
                            </Label>

                            {/* Error */}
                            {errors.file && (
                                <p className="text-sm text-red-500 ml-1 mt-1">{errors.file.message}</p>
                            )}

                            {/* Submit */}
                            <Button type="submit" className="w-full disabled:bg-slate-900 mt-4" disabled={isSubmitting || !selectedFile}>
                                {isSubmitting ? <Spinner /> : "Distribute to Agents"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {distribution.length > 0 && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {distribution.map((agent) => (
                        <Card key={agent.agentId} className="h-105 flex flex-col mb-4">
                            <CardHeader>
                                <CardTitle>{agent.agentName}</CardTitle>
                                <CardDescription>
                                    Tasks assigned: {agent.tasks.length}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-3 flex-1 overflow-y-auto">
                                {agent.tasks.map((task, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-md p-3 text-sm bg-neutral-secondary-medium"
                                    >
                                        <p>
                                            <span className="font-medium">Name:</span>{" "}
                                            {task.FirstName}
                                        </p>
                                        <p>
                                            <span className="font-medium">Phone:</span>{" "}
                                            {task.Phone}
                                        </p>
                                        <p>
                                            <span className="font-medium">Notes:</span>{" "}
                                            {task.Notes}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </>
    )
}