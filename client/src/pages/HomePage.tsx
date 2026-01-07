import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { AtSignIcon } from "../components/ui/at-sign";
import { UploadIcon } from "../components/ui/upload";
import { UsersIcon } from "../components/ui/users";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

export const HomePage = () => {
    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-5xl px-6 py-14">
                <section>
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-medium text-muted-foreground">Task Distribution System</p>

                        <h1 className="text-4xl font-bold tracking-tight">
                            Distribute uploaded work lists across agents — fast, validated, and traceable.
                        </h1>

                        <p className="max-w-2xl text-base text-muted-foreground">
                            This app helps an admin create agent accounts and upload lead/task lists
                            (CSV/Excel). The backend validates the data, evenly assigns each row to a
                            pool of agents, and stores the assignments in MongoDB.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <Button asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link to="/dashboard">Open Dashboard</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <Separator className="my-10" />

                <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UsersIcon size={18} /> Agent Management
                            </CardTitle>
                            <CardDescription>
                                Create, list, and delete agent accounts from a single admin dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Form validation with React Hook Form + Zod</li>
                                <li>Deletion confirmation dialog for safer admin actions</li>
                                <li>Agent list synced from the API (Axios + cookies)</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UploadIcon size={18} /> Upload & Distribution
                            </CardTitle>
                            <CardDescription>
                                Upload a list and distribute it evenly across up to 5 agents.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Backend accepts CSV / XLSX / XLS and validates required columns</li>
                                <li>Bucket-based distribution ensures balanced workloads (1-5 agents)</li>
                                <li>Assignments are persisted as tasks in MongoDB</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AtSignIcon size={18} /> Auth & Routing
                            </CardTitle>
                            <CardDescription>
                                Cookie-based auth with protected routes for the admin dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>JWT stored as an HTTP-only cookie</li>
                                <li>ProtectedRoute checks server authorization before rendering</li>
                                <li>Clean routing with React Router</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tech Stack</CardTitle>
                            <CardDescription>
                                A MERN-style stack with modern UI + strong validation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Client: React + TypeScript, Vite, Tailwind, Radix UI</li>
                                <li>Server: Bun + Express, Multer (uploads), csv-parser, xlsx</li>
                                <li>Database: MongoDB via Mongoose</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <footer className="mt-12">
                    <Separator className="my-8" />

                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Sai Teja</p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <a
                                    href="https://www.linkedin.com/in/teja21"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn"
                                    title="LinkedIn"
                                >
                                    <Linkedin className="size-5" />
                                </a>
                            </Button>

                            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <a
                                    href="https://github.com/Teja2106"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub"
                                    title="GitHub"
                                >
                                    <Github className="size-5" />
                                </a>
                            </Button>

                            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <a
                                    href="mailto:saitejavkp@gmail.com"
                                    aria-label="Email"
                                    title="Email"
                                >
                                    <Mail className="size-5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
};