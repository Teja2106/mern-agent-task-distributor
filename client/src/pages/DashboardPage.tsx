import { LogoutButton } from "@/components/custom/LogoutButton"
import { Button } from "@/components/ui/button"
import { PlusIcon, type PlusIconHandle } from "@/components/ui/plus"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadIcon } from "@/components/ui/upload"
import { UsersIcon, type UsersIconHandle } from "@/components/ui/users"
import { useEffect, useRef } from "react"

export const Dashboard = () => {
    const plusIconRef = useRef<PlusIconHandle>(null);
    const userIconRef = useRef<UsersIconHandle>(null);

    useEffect(() => {
        plusIconRef.current?.stopAnimation();
        userIconRef.current?.stopAnimation();
    }, []);

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

            <Separator />

            <main className="mt-6">
                <div className="ml-20">
                    <Tabs defaultValue="manage_agents" className="bg-transparent">
                        <TabsList className="relative bg-transparent gap-10">
                            <TabsTrigger value="manage_agents" className="
                            relative rounded-none px-1 py-6 text-muted-foreground
                            transition-colors duration-300
                            data-[state=active]:text-foreground data-[state=active]:shadow-none

                            after:absolute after:left-0 after:bottom-px
                            after:h-0.5 after:w-full after:bg-primary
                            after:origin-left after:scale-x-0
                            after:transition-transform after:duration-300

                            data-[state=active]:after:scale-x-100
                            ">
                                <UsersIcon ref={ userIconRef } />
                                <div className="pl-1.5">
                                    Manage Agents
                                </div>
                            </TabsTrigger>
                            <TabsTrigger value="distribution" className="
                            relative rounded-none px-1 py-6 text-muted-foreground
                            transition-colors duration-300
                            data-[state=active]:text-foreground data-[state=active]:shadow-none

                            after:absolute after:left-0 after:bottom-px
                            after:h-0.5 after:w-full after:bg-primary
                            after:origin-left after:scale-x-0
                            after:transition-transform after:duration-300

                            data-[state=active]:after:scale-x-100
                            ">
                                <UploadIcon />
                                Distribution
                            </TabsTrigger>
                        </TabsList>

                
                        <TabsContent value="manage_agents">
                            <div className="flex items-center justify-between">
                                <div className="mt-6">
                                    <p className="font-bold text-2xl">Manage Agents</p>
                                    <p className="text-gray-400">Add and manage your agent accounts</p>
                                </div>

                                <div className="mr-24.5">
                                    <Button><PlusIcon ref={ plusIconRef } /> Add Agent</Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </>
    )
}