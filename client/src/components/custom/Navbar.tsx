import { UsersIcon, type UsersIconHandle } from "../ui/users";
import { LogoutButton } from "./LogoutButton";
import { useEffect, useRef } from "react";

export const Navbar = () => {
    const userIconRef = useRef<UsersIconHandle>(null);

    useEffect(() => {
        userIconRef.current?.stopAnimation();
    });
    
    return (
        <>
            <nav className="h-20 flex items-center justify-around gap-x-212.5">
                <div className="font-bold text-2xl flex items-center gap-2">
                    <div>
                        <UsersIcon ref={ userIconRef } className="text-blue-600" size={24} />
                    </div>

                    <div>
                        <p>Admin Dashboard</p>
                    </div>
                </div>

                <div className="font-semibold text-lg flex items-center gap-2">
                    <LogoutButton />
                </div>
            </nav>
        </>
    )
}