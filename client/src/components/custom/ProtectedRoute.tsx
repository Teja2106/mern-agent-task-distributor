import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        api.get('/dashboard')
        .then(() => setAuthorized(true))
        .catch(() => setAuthorized(false));
    }, []);

    if (authorized == null) return null;

    if (!authorized) return <Navigate to={`/login`} replace /> //change the path as needed

    return children;
};