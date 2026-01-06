import { useWatch ,useForm, type SubmitHandler } from "react-hook-form"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { UploadIcon } from "../ui/upload"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"

const MAX_UPLOAD_SIZE = 10 * 1024; // 10 KB
const ACCEPTED_FILE_TYPES = ['text/csv'];

const fileUploadSchema = z.object({
    file: z.custom<FileList>()
        .refine((files) => files?.length === 1, { message: 'Please select a file.' })
        .refine((files) => files[0].size <= MAX_UPLOAD_SIZE, { message: 'File size must be less than 10 KB.' })
        .refine((files) => ACCEPTED_FILE_TYPES.includes(files[0].type), { message: 'Only CSV files are supported.' })
});

type FileUploadForm = z.infer<typeof fileUploadSchema>;

export const Distribution = () => {
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<FileUploadForm>({ resolver: zodResolver(fileUploadSchema) });

    const uploadedFile = useWatch({
        control,
        name: 'file'
    });

    const selectedFile = uploadedFile?.[0];

    const onSubmit: SubmitHandler<FileUploadForm> = async (data) => {
        console.log(data);
        toast.success('File has been uploaded successfully!');
        reset();
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

                                <p className="text-xs text-gray-400 mt-1">CSV only (max 10 KB)</p>

                                {selectedFile && (
                                    <p className="mt-2 text-xs text-gray-500">
                                        {(selectedFile.size / 1024).toFixed(1)} KB
                                    </p>
                                )}

                                <Input {...register("file")} id="dropzone-file" type="file" accept=".csv" className="absolute inset-0 opacity-0 cursor-pointer" />
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
        </>
    )
}