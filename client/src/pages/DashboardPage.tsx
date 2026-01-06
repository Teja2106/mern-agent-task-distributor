import { Distribution } from "@/components/custom/Distribution"
import { ManageAgents } from "@/components/custom/ManageAgents"
import { Navbar } from "@/components/custom/Navbar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadIcon, type UploadIconHandle } from "@/components/ui/upload"
import { UsersIcon, type UsersIconHandle } from "@/components/ui/users"
import { useEffect, useRef } from "react"

export const Dashboard = () => {
    const userIconRef = useRef<UsersIconHandle>(null);
    const uploadIconRef = useRef<UploadIconHandle>(null);

    useEffect(() => {
        userIconRef.current?.stopAnimation();
        uploadIconRef.current?.stopAnimation();
    }, []);

    return (
        <>
            <Navbar />

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
                                <UsersIcon ref={userIconRef} />
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
                                <UploadIcon ref={uploadIconRef} />
                                Distribution
                            </TabsTrigger>
                        </TabsList>


                        <TabsContent value="manage_agents">
                            <ManageAgents />
                        </TabsContent>

                        <TabsContent value="distribution">
                            <Distribution />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </>
    )
}