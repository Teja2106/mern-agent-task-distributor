import { api } from "@/lib/api";
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        api.get('/dashboard')
        .then(() => setAuthorized(true))
        .catch(() => setAuthorized(false));
    }, []);

    if (authorized === null) return null;

    if (authorized) {
        return <Navigate to={'/dashboard'} replace />
    }

    return children;
}