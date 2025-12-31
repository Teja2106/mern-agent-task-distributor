import { useEffect, useRef } from "react"
import { Button } from "../ui/button"
import { LogoutIcon, type LogoutIconHandle } from "../ui/logout"
import { api } from "@/lib/api"
import { useNavigate } from "react-router-dom"


export const LogoutButton = () => {
    const navigate = useNavigate();
    const logoutIconRef = useRef<LogoutIconHandle>(null);

    useEffect(() => {
        logoutIconRef.current?.stopAnimation();
    });

    const handleLogout = async () => {
        await api.post('logout');
        navigate('/');
    }

    return (
        <>
            <Button variant={"ghost"} className="hover:bg-black hover:text-white hover:cursor-pointer" onClick={ handleLogout }>
                <LogoutIcon ref={logoutIconRef} size={15} />
                Logout
            </Button>
        </>
    )
}